// Лічильники для стріму: спільні налаштування, збереження числа й підписи мовами оверлею.

// Ключі сховища ті самі, що в старих сторінках: число переходить разом зі стрімером.
export const COUNTERS = {
  solution: { storageKey: "waterCount", icon: "tempering-solution-counter/images/solution.png" },
  hammer: { storageKey: "hammerCount", icon: "ice-hammer-counter/images/hammer.png" },
};

export const MAX_COUNT = 999999;

// Підпис над числом бачать глядачі, тож він мовою стріму, а не сайту.
export const LANGUAGES = {
  uk: { name: "Українська", short: "УКР", label: "Лічильник луту", locale: "uk-UA" },
  en: { name: "English", short: "ENG", label: "Loot Counter", locale: "en-GB" },
  de: { name: "Deutsch", short: "DEU", label: "Beutezähler", locale: "de-DE" },
  es: { name: "Español", short: "ESP", label: "Contador de botín", locale: "es-ES" },
};

export const BACKGROUNDS = {
  transparent: "Прозорий",
  green: "Зелений",
  dark: "Темний",
};

export const DEFAULT_LANGUAGE = "uk";
export const DEFAULT_BACKGROUND = "transparent";

export function clampCount(value) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return 0;
  return Math.min(MAX_COUNT, Math.max(0, number));
}

// Без доступу до сховища (приватне вікно) лічильник живе, доки відкрита сторінка.
let memoryCount = 0;

export function readCount(counter) {
  try {
    return clampCount(window.localStorage.getItem(counter.storageKey));
  } catch {
    return memoryCount;
  }
}

export function writeCount(counter, value) {
  const count = clampCount(value);
  memoryCount = count;
  try {
    window.localStorage.setItem(counter.storageKey, String(count));
  } catch {
    // Лишаємо число в пам'яті.
  }
  return count;
}

// Подія storage приходить в інші сторінки того самого браузера: так прев'ю
// на сторінці налаштувань бачить натискання кнопок під ним.
export function onCountChange(counter, listener) {
  window.addEventListener("storage", (event) => {
    if (event.key === counter.storageKey || event.key === null) listener(readCount(counter));
  });
}

export function overlaySettings(params) {
  const lang = Object.hasOwn(LANGUAGES, params.get("lang") ?? "") ? params.get("lang") : DEFAULT_LANGUAGE;
  const bg = Object.hasOwn(BACKGROUNDS, params.get("bg") ?? "") ? params.get("bg") : DEFAULT_BACKGROUND;
  const label = (params.get("label") ?? "").trim().slice(0, 40);
  return { lang, bg, label };
}
