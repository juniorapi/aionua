// Калькулятори стигм. Сам калькулятор оригінальний (stigma/calculator/ для 4.6, stigmas/<клас>/
// для 4.8) і відкривається в рамці без власного фону й підвалу (див. embed.js у тих папках).
// Збірка живе в адресі цієї сторінки: для 4.6 це #код, для 4.8 — #клас/код.

import { initHeader } from "../header.js";
import { lang as siteLang, tr } from "../i18n.js";

initHeader();

const root = document.querySelector("[data-stigma-embed]");
const viewport = root.querySelector("[data-viewport]");
const version = root.dataset.version;
const classLinks = [...root.querySelectorAll("[data-class]")];
const classes = classLinks.map((link) => link.dataset.class);
const langButtons = [...root.querySelectorAll("[data-lang-switch] button")];
// Ті самі ключі, що в оригінальних калькуляторах: мова спільна для обох версій сторінки.
const langKey = version === "4.6" ? "stigma_lang" : "stigmas_lang";
// Сам калькулятор записує langKey при кожному відкритті, тож вибір кнопкою позначаємо окремо:
// інакше старий запис «uk» з минулих візитів перебивав би англійську мову сайту.
const choiceKey = `aionua:${langKey}-chosen`;
const baseTitle = document.title;

// Від цієї ширини калькулятор стоїть як в оригіналі. Вужча рамка 4.8 ставить панелі одна під одною
// (не вужче за data-narrow), а 4.6 просто зменшується цілком, як оригінал на телефоні.
const wide = Number(root.dataset.width);
const narrow = Number(root.dataset.narrow || 0);

const storedLang = readStoredLang();
// Обрану кнопкою мову калькулятор пам'ятає, а без вибору говорить мовою сайту.
let langChosen = storedLang !== null;
let lang = storedLang ?? siteLang;
let state = readHash(hashText());
let frame = null;
// Висота калькулятора без масштабу: до завантаження — з розмітки, далі — заміряна в рамці.
let height = 0;

function readStoredLang() {
  try {
    if (localStorage.getItem(choiceKey) !== "1") return null;
    const stored = localStorage.getItem(langKey);
    if (stored === "uk" || stored === "en") return stored;
  } catch {
    // Сховище недоступне: діє мова сайту.
  }
  return null;
}

// Калькулятор у рамці записує в сховище мову, з якою його відкрили. Поки відвідувач її не обрав,
// запис прибираємо: інакше мова сайту, з якою калькулятор відкрився вперше, лишилася б назавжди.
function forgetDefaultLang() {
  if (langChosen) return;
  try {
    localStorage.removeItem(langKey);
  } catch {
    // Сховище недоступне: нічого не записано.
  }
}

function hashText() {
  const raw = location.hash.slice(1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

// Якір на елемент сторінки (наприклад, «До основного вмісту») — не збірка.
function isAnchor(text) {
  return text !== "" && document.getElementById(text) !== null;
}

function readHash(text) {
  const hash = isAnchor(text) ? "" : text;
  if (version === "4.6") return { cls: "", code: hash };
  const [cls, code = ""] = hash.split("/");
  return classes.includes(cls) ? { cls, code } : { cls: classes[0], code: "" };
}

function hashOf({ cls, code }) {
  if (version === "4.6") return code ? `#${code}` : "";
  if (code) return `#${cls}/${code}`;
  return cls === classes[0] ? "" : `#${cls}`;
}

function writeAddress() {
  const url = location.pathname + location.search + hashOf(state);
  if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, "", url);
  return new URL(url, location.href).href;
}

// Калькулятор у рамці кличе це щоразу, як змінюється збірка, і показує повернуте посилання.
window.stigmaShareLink = (code) => {
  state = { ...state, code: String(code || "") };
  return writeAddress();
};

function frameSrc() {
  const path = version === "4.6" ? "calculator/" : `${state.cls}/`;
  return `${path}?lang=${lang}${state.code ? `#${state.code}` : ""}`;
}

// Щоразу нова рамка: так у ній немає чужої історії, а 4.8, який не стежить за адресою, читає збірку заново.
function load() {
  const next = document.createElement("iframe");
  next.title = tr(`Калькулятор стигм ${version}`, `Stigma calculator ${version}`);
  next.setAttribute("scrolling", "no");
  next.addEventListener("load", () => ready(next));
  next.src = frameSrc();
  viewport.dataset.state = "loading";
  if (frame) frame.replaceWith(next);
  else viewport.append(next);
  frame = next;
  layout();
}

function ready(target) {
  if (target !== frame) return;
  const win = frame.contentWindow;
  const wrapper = frame.contentDocument?.getElementById("wrapper");
  viewport.dataset.state = "ready";
  forgetDefaultLang();
  measure();
  if (wrapper && win.ResizeObserver) new win.ResizeObserver(measure).observe(wrapper);
  // «Назад» і «Вперед» міняють код у рамці. 4.6 сам перечитує збірку, а 4.8 — ні, тож відкриваємо її заново.
  if (version === "4.8") {
    win.addEventListener("hashchange", () => {
      const code = win.location.hash.slice(1);
      if (code === state.code) return;
      state = { ...state, code };
      writeAddress();
      load();
    });
  }
}

// Низ калькулятора — разом із візерунчастою рамкою 4.6 і кнопками під диском 4.8, що виступають за край.
function measure() {
  const wrapper = frame?.contentDocument?.getElementById("wrapper");
  if (!wrapper) return;
  let bottom = 0;
  for (const element of [wrapper, ...wrapper.querySelectorAll("*")]) {
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) bottom = Math.max(bottom, rect.bottom);
  }
  bottom = Math.ceil(bottom);
  if (!bottom || bottom === height) return;
  height = bottom;
  layout();
}

function frameWidth(available) {
  if (available >= wide) return available;
  return narrow ? Math.max(available, narrow) : wide;
}

function layout() {
  const available = viewport.clientWidth;
  if (!available) return;
  const width = frameWidth(available);
  const scale = Math.min(1, available / width);
  // До першого заміру — висота з розмітки для свого розкладу, щоб сторінка не стрибала.
  const frameHeight = height || Number((width < wide && root.dataset.narrowHeight) || root.dataset.height);
  viewport.style.height = `${Math.ceil(frameHeight * scale)}px`;
  if (!frame) return;
  frame.style.width = `${width}px`;
  frame.style.height = `${frameHeight}px`;
  frame.style.transform = scale < 1 ? `scale(${scale})` : "";
}

function markLang() {
  for (const button of langButtons) button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
}

function markClass() {
  let name = "";
  for (const link of classLinks) {
    if (link.dataset.class === state.cls) {
      link.setAttribute("aria-current", "page");
      name = link.textContent.trim();
    } else {
      link.removeAttribute("aria-current");
    }
  }
  document.title = name ? `${name} · ${baseTitle}` : baseTitle;
}

function revealClass() {
  const link = classLinks.find((item) => item.dataset.class === state.cls);
  if (!link) return;
  const row = link.parentElement;
  if (row.scrollWidth > row.clientWidth) row.scrollLeft = link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
}

for (const button of langButtons) {
  button.addEventListener("click", () => {
    if (button.dataset.lang === lang) return;
    lang = button.dataset.lang;
    langChosen = true;
    try {
      localStorage.setItem(langKey, lang);
      localStorage.setItem(choiceKey, "1");
    } catch {
      // Без сховища мова діє до перезавантаження сторінки.
    }
    markLang();
    load();
  });
}

for (const link of classLinks) {
  link.addEventListener("click", (event) => {
    // Повторний клік по своєму класу не скидає збірку.
    if (link.dataset.class === state.cls) event.preventDefault();
  });
}

addEventListener("hashchange", () => {
  const text = hashText();
  if (isAnchor(text)) return;
  const next = readHash(text);
  if (next.cls === state.cls && next.code === state.code) return;
  state = next;
  writeAddress();
  markClass();
  load();
});

markLang();
markClass();
writeAddress();
revealClass();
new ResizeObserver(layout).observe(viewport);
load();
