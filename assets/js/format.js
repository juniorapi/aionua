// Спільні форматери: множини, числа, час і тривалість — мовою сайту (див. i18n.js).
import { locale, tr } from "./i18n.js";

const pluralRules = new Intl.PluralRules(locale);
const numberFormat = new Intl.NumberFormat(locale);

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

// Форми множини для Intl.PluralRules: українській треба one/few/many/other, англійській — one/other.
export const PLAYERS = tr(
  { one: "гравець", few: "гравці", many: "гравців", other: "гравця" },
  { one: "player", other: "players" },
);
export const TOOLS = tr(
  { one: "інструмент", few: "інструменти", many: "інструментів", other: "інструмента" },
  { one: "tool", other: "tools" },
);
export const EVENTS = tr(
  { one: "подія", few: "події", many: "подій", other: "події" },
  { one: "event", other: "events" },
);

// 1 гравець, 3 гравці, 1 289 гравців: форма залежить від останніх цифр.
export function plural(count, forms) {
  return forms[pluralRules.select(count)] ?? forms.many ?? forms.other;
}

export function formatNumber(value) {
  return numberFormat.format(value);
}

export const timeFormat = new Intl.DateTimeFormat(locale, {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: "short" });

export const dayLabel = new Intl.DateTimeFormat(locale, {
  weekday: "short",
  day: "numeric",
  month: "long",
});

export const updatedFormat = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// «56 хв», «1 год 56 хв» («56 min», «1 h 56 min»). Округлюємо вгору, щоб «через 0 хв» не траплялося.
export function formatDuration(ms) {
  const totalMinutes = Math.max(1, Math.ceil(ms / MINUTE));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const h = tr("год", "h");
  const min = tr("хв", "min");
  if (hours === 0) return `${minutes} ${min}`;
  if (minutes === 0) return `${hours} ${h}`;
  return `${hours} ${h} ${minutes} ${min}`;
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
