// Спільні форматери: українські множини, числа, час і тривалість.

const pluralRules = new Intl.PluralRules("uk-UA");
const numberFormat = new Intl.NumberFormat("uk-UA");

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const PLAYERS = { one: "гравець", few: "гравці", many: "гравців", other: "гравця" };
export const TOOLS = { one: "інструмент", few: "інструменти", many: "інструментів", other: "інструмента" };
export const EVENTS = { one: "подія", few: "події", many: "подій", other: "події" };

// 1 гравець, 3 гравці, 1 289 гравців: форма залежить від останніх цифр.
export function plural(count, forms) {
  return forms[pluralRules.select(count)] ?? forms.many;
}

export function formatNumber(value) {
  return numberFormat.format(value);
}

export const timeFormat = new Intl.DateTimeFormat("uk-UA", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export const weekdayShort = new Intl.DateTimeFormat("uk-UA", { weekday: "short" });

export const dayLabel = new Intl.DateTimeFormat("uk-UA", {
  weekday: "short",
  day: "numeric",
  month: "long",
});

export const updatedFormat = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// «56 хв», «1 год 56 хв». Округлюємо вгору, щоб «через 0 хв» не траплялося.
export function formatDuration(ms) {
  const totalMinutes = Math.max(1, Math.ceil(ms / MINUTE));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} хв`;
  if (minutes === 0) return `${hours} год`;
  return `${hours} год ${minutes} хв`;
}

export function isSameLocalDay(a, b) {
  const first = new Date(a);
  const second = new Date(b);
  return first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();
}

export async function fetchJson(url) {
  const separator = url.includes("?") ? "&" : "?";
  const response = await fetch(`${url}${separator}t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// Налаштування на кшталт вибраного сервера: зручність, без якої сторінка теж працює.
export function readPreference(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writePreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Приватний режим або заблоковане сховище: просто не запам'ятовуємо.
  }
}
