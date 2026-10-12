// Мова сайту: українська за замовчуванням, англійська — за перемикачем у шапці.
// Вибір живе в ?lang= (посиланням можна поділитися) і в localStorage (решта сторінок
// відкриваються тією ж мовою). Статичний текст перекладають атрибути data-en* у HTML,
// текст, який будує JS, — функція tr("українською", "in English").

export const LANGUAGES = Object.freeze(["uk", "en"]);
const STORAGE_KEY = "aionua:lang";

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Приватне вікно: мова діятиме лише на сторінках із ?lang=.
  }
}

function detectLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (LANGUAGES.includes(fromUrl)) {
    store(fromUrl);
    return fromUrl;
  }
  const stored = readStored();
  return LANGUAGES.includes(stored) ? stored : "uk";
}

export const lang = detectLanguage();
export const isEnglish = lang === "en";
// en-GB: 24-годинний час і день перед місяцем — звично для європейських серверів.
export const locale = isEnglish ? "en-GB" : "uk-UA";

/** Рядок потрібною мовою: tr("Розклад", "Schedule"). Працює й для об'єктів (форми множини). */
export function tr(uk, en) {
  return isEnglish ? en : uk;
}

// Атрибути, які можна перекласти: data-en-aria-label="…", data-en-placeholder="…" тощо.
const ATTRIBUTES = ["aria-label", "title", "placeholder", "alt", "content"];

/**
 * Перекладає статичну розмітку: data-en (текст), data-en-html (розмітка з тегами)
 * і data-en-<атрибут>. Українська лишається в самому HTML — її нічого не перекладає.
 */
export function localizePage(root = document) {
  document.documentElement.lang = lang;
  if (isEnglish) {
    root.querySelectorAll("[data-en]").forEach((node) => {
      node.textContent = node.dataset.en;
    });
    root.querySelectorAll("[data-en-html]").forEach((node) => {
      node.innerHTML = node.dataset.enHtml;
    });
    ATTRIBUTES.forEach((attribute) => {
      root.querySelectorAll(`[data-en-${attribute}]`).forEach((node) => {
        node.setAttribute(attribute, node.getAttribute(`data-en-${attribute}`));
      });
    });
  }
  document.documentElement.classList.remove("i18n-pending");
}

/** Адреса цієї ж сторінки іншою мовою: решта параметрів і #якір зберігаються. */
export function languageUrl(target) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", target);
  return `${url.pathname}${url.search}${url.hash}`;
}

/** Перемикач UA/EN у шапці: посилання з ?lang=, щоб працювали й без JS. */
export function initLanguageSwitch(root = document) {
  root.querySelectorAll("[data-lang-link]").forEach((link) => {
    const target = link.dataset.langLink;
    link.href = languageUrl(target);
    // Сторінка могла змінити адресу після завантаження (збірка стигм, вибраний сервер), тож
    // перед переходом беремо поточну: інша мова відкриває те саме, що зараз на екрані.
    link.addEventListener("click", () => {
      link.href = languageUrl(target);
    });
    if (target === lang) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}
