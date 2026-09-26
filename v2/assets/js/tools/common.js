// Спільне для сторінок інструментів: дані, іконки, лічильники, копіювання.

export { formatNumber } from "../format.js";

// Дані інструментів змінюються разом із сайтом, тож кешу браузера досить.
export async function loadData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// Шляхи до іконок у data.json ведуть від кореня сайту (crystal_crafting/images/…):
// картинки лежать у старих сторінках, копій у v2 немає.
export function assetUrl(path) {
  const base = document.querySelector("[data-asset-base]")?.dataset.assetBase ?? "../../";
  return `${base}${path}`;
}

export function clampInt(value, min, max) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, number));
}

export function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function icon(path, className = "item-icon", size = 36) {
  const image = element("img", className);
  image.src = assetUrl(path);
  image.alt = "";
  image.width = size;
  image.height = size;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

// Лічильник «− число +»: кнопки не дають вийти за межі, поле приймає лише цілі.
export function createStepper({ id, label, min, max, value, onChange }) {
  const root = element("div", "stepper");
  const minus = element("button", "", "−");
  const plus = element("button", "", "+");
  const input = element("input");
  minus.type = "button";
  plus.type = "button";
  minus.setAttribute("aria-label", `${label}: менше`);
  plus.setAttribute("aria-label", `${label}: більше`);
  Object.assign(input, { id, type: "number", inputMode: "numeric", min, max, step: 1, value });
  root.append(minus, input, plus);

  function sync(next, notify = true) {
    const clamped = clampInt(next, min, max);
    input.value = String(clamped);
    minus.disabled = clamped <= min;
    plus.disabled = clamped >= max;
    if (notify) onChange(clamped);
  }

  minus.addEventListener("click", () => sync(clampInt(input.value, min, max) - 1));
  plus.addEventListener("click", () => sync(clampInt(input.value, min, max) + 1));
  input.addEventListener("input", () => {
    // Порожнє поле посеред набору не перетворюємо на мінімум, поки людина не піде з нього.
    if (input.value === "") return;
    const clamped = clampInt(input.value, min, max);
    if (String(clamped) !== input.value) input.value = String(clamped);
    minus.disabled = clamped <= min;
    plus.disabled = clamped >= max;
    onChange(clamped);
  });
  input.addEventListener("blur", () => sync(input.value));
  input.addEventListener("focus", () => input.select());

  sync(value, false);
  return {
    root,
    input,
    get value() {
      return clampInt(input.value, min, max);
    },
    set(next) {
      sync(next);
    },
  };
}

// Буфер обміну працює лише на https чи localhost; інакше — старий спосіб через виділення.
export async function copyText(text, textarea) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Браузер відмовив (немає дозволу): пробуємо старий спосіб нижче.
    }
  }
  if (!textarea) return false;
  textarea.focus();
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  }
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function showLoadError(container, message = "Не вдалося завантажити дані. Оновіть сторінку.") {
  const note = element("p", "empty-note", message);
  note.setAttribute("role", "alert");
  container.replaceChildren(note);
}
