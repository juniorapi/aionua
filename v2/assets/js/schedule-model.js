// Спільна модель розкладу для головної та сторінки розкладу.
// Джерела — ті самі schedule.json, що їх оновлює fetch_online.py для старих сторінок.
import { DAY, HOUR, fetchJson } from "./format.js";

export const CATEGORY_LABELS = Object.freeze({
  pvp: "PvP",
  arenas: "Арена",
  siege: "Облога",
  rifts: "Розлом",
  tournaments: "Турнір",
});

export const CATEGORY_TITLES = Object.freeze({
  pvp: "PvP-інстанси",
  arenas: "Арени",
  siege: "Облоги",
  rifts: "Розломи",
  tournaments: "Турніри",
});

export const CATEGORY_ORDER = Object.freeze(["pvp", "arenas", "siege", "rifts", "tournaments"]);

// Назви EuroAion. Складені назви джерело віддає одним рядком — перекладаємо їх цілими.
const EURO_NAMES = Object.freeze({
  "Tiamaranta's Hearts": "Серця Тіамаранти",
  "Fortresses: Sulfur, Asteria, Roah": "Фортеці Сірчана, Астерія, Роа",
  "Fortresses: Siel's Eastern, Siel's Western": "Східна й Західна фортеці Сіеля",
  "Fortresses: Vorgaltem Citadel, Temple of Scales": "Цитадель Ворґальтема, Храм Терезів",
  "Fortresses: Altar of Avarice, Crimson Temple": "Вівтар Жадібності, Багряний храм",
  "Fortresses: Sillus, Silona, Pradeth": "Фортеці Сіллус, Сілона, Прадет",
  "Fortresses: Kysis, Miren, Krotan": "Фортеці Кісіс, Мірен, Кротан",
  "Arenas: Chaos, Discipline, Harmony": "Арени Хаосу, Дисципліни, Гармонії",
  "Sulfur Fortress": "Сірчана фортеця",
  "Asteria Fortress": "Фортеця Астерія",
  "Roah Fortress": "Фортеця Роа",
  "Siel's Eastern Fortress": "Східна фортеця Сіеля",
  "Siel's Western Fortress": "Західна фортеця Сіеля",
  "Vorgaltem Citadel": "Цитадель Ворґальтема",
  "Temple of Scales": "Храм Терезів",
  "Altar of Avarice": "Вівтар Жадібності",
  "Crimson Temple": "Багряний храм",
  "Sillus Fortress": "Фортеця Сіллус",
  "Silona Fortress": "Фортеця Сілона",
  "Pradeth Fortress": "Фортеця Прадет",
  "Kysis Fortress": "Фортеця Кісіс",
  "Miren Fortress": "Фортеця Мірен",
  "Krotan Fortress": "Фортеця Кротан",
  "Divine Fortress": "Божественна фортеця",
  "Dredgions": "Дерадикони",
  "Engulfed Ophidan Bridge": "Затоплений міст Офідана",
  "Runatorium": "Рунаторіум",
  "Kamar Battlefield": "Поле битви Камара",
  "Iron Wall Warfront": "Передова Залізної стіни",
  "Arena of Chaos": "Арена Хаосу",
  "Arena of Discipline": "Арена Дисципліни",
  "Arena of Harmony": "Арена Гармонії",
  "Arena of Glory": "Арена Слави",
});

// Origin Aion має власну локалізацію назв — ті самі, що на сторінці originaion/.
const ORIGIN_NAMES = Object.freeze({
  "Terath Dredgion": "Дерадикон Терат",
  "Kamar Battlefield": "Поле битви Камара",
  "Engulfed Ophidan Bridge": "Міст Йормунґанда",
  "Iron Wall Warfront": "Неприступна твердиня",
  "Arena of Chaos": "Арена Хаосу",
  "Arena of Discipline": "Арена Доблесті",
  "Arena of Harmony": "Арена Злагоди",
  "Arena of Glory": "Арена Слави",
  "Recharger": "Відновлювач",
  "Divine": "Фортеця Святості",
  "Roah": "Ру",
  "Sulfur": "Сірчане дерево",
  "Asteria": "Астерія",
  "Siel's Western": "Західна Сіель",
  "Siel's Eastern": "Східна Сіель",
  "Temple of Scales": "Храм стародавнього дракона",
  "Vorgaltem Citadel": "Запечатана вежа",
  "Altar of Avarice": "Вівтар жадібності",
  "Crimson Temple": "Храм червоної землі",
  "Tiamaranta": "Тіамаранта",
  "Sillus": "Сіллус",
  "Silona": "Базен",
  "Pradeth": "Парадес",
  "Miren/Krotan/Kysis": "Ра-Мірен / Кротан / Ткісас",
  "Heiron": "Інтердіка",
  "Beluslan": "Белуслан",
  "Inggison": "Інгісон",
  "Gelkmaros": "Келькмарос",
  "Eltnen": "Ельтенен",
  "Morheim": "Моргейм",
});

function euroCategory(source) {
  if (source === "arena") return "arenas";
  if (source === "siege" || source === "fortress") return "siege";
  return "pvp";
}

function validEvent(event) {
  return event && Array.isArray(event.days) && Array.isArray(event.times);
}

function normalizeEuro(data) {
  return data.events.filter((event) => validEvent(event) && Array.isArray(event.names)).map((event) => ({
    name: event.names.map((name) => EURO_NAMES[name] || name).join(" / "),
    originalName: event.names.join(" / "),
    category: euroCategory(event.cat),
    days: event.days,
    slots: event.times,
  }));
}

function normalizeOrigin(data) {
  return data.events.filter((event) => validEvent(event) && Array.isArray(event.names)).map((event) => ({
    name: event.names.map((name) => ORIGIN_NAMES[name] || name).join(" / "),
    originalName: event.names.join(" / "),
    category: CATEGORY_TITLES[event.cat] ? event.cat : "pvp",
    days: event.days,
    slots: event.times,
  }));
}

// AionDestiny вже віддає українські назви. Записи без часу («2 входи») — примітки, не події.
function normalizeDestiny(data) {
  return data.events
    .filter((event) => validEvent(event) && event.name && CATEGORY_TITLES[event.cat])
    .map((event) => ({
      name: event.name,
      originalName: event.originalName || event.name,
      category: event.cat,
      days: event.days,
      slots: event.times,
      note: event.note || "",
    }));
}

export const SERVERS = Object.freeze({
  euro: {
    name: "EuroAion",
    url: "../euroaion/schedule.json",
    legacyPage: "../euroaion/",
    officialUrl: "https://euroaion.com/en-US/Tools/Schedule",
    defaultOffset: 2,
    normalize: normalizeEuro,
  },
  origin: {
    name: "Origin Aion",
    url: "../originaion/schedule.json",
    legacyPage: "../originaion/",
    officialUrl: "https://originaion.com/schedule",
    defaultOffset: 2,
    normalize: normalizeOrigin,
  },
  destiny: {
    name: "AionDestiny",
    url: "../aiondestiny/schedule.json",
    legacyPage: "../aiondestiny/",
    officialUrl: null,
    defaultOffset: 3,
    normalize: normalizeDestiny,
  },
});

export function isServerId(value) {
  return Object.prototype.hasOwnProperty.call(SERVERS, value);
}

const cache = new Map();

// base — шлях до кореня v2 відносно сторінки: "" для головної, "../" для вкладених.
export function loadSchedule(serverId, base = "") {
  const server = SERVERS[serverId];
  const key = `${base}${serverId}`;
  if (!cache.has(key)) {
    const request = fetchJson(base + server.url).then((data) => {
      if (!data || !Array.isArray(data.events) || data.events.length === 0) {
        throw new Error(`${server.name}: порожній розклад`);
      }
      const offset = Number(data.serverOffset);
      const events = server.normalize(data);
      if (events.length === 0) throw new Error(`${server.name}: немає придатних подій`);
      const fetched = data.fetchedAt ? new Date(data.fetchedAt) : null;
      return {
        id: serverId,
        offset: Number.isFinite(offset) && offset >= -12 && offset <= 14 ? offset : server.defaultOffset,
        events,
        fetchedAt: fetched && !Number.isNaN(fetched.getTime()) ? fetched : null,
        eventCount: Number(data.eventCount) || null,
      };
    });
    request.catch(() => cache.delete(key));
    cache.set(key, request);
  }
  return cache.get(key);
}

// Понеділок 00:00 за часом сервера для тижня, що містить момент `at`, у мс UTC.
export function serverWeekStart(at, offsetHours) {
  const serverNow = new Date(at + offsetHours * HOUR);
  const daysSinceMonday = (serverNow.getUTCDay() + 6) % 7;
  const serverMidnight = Date.UTC(serverNow.getUTCFullYear(), serverNow.getUTCMonth(), serverNow.getUTCDate());
  return serverMidnight - daysSinceMonday * DAY - offsetHours * HOUR;
}

// Усі проведення подій, що перетинають вікно [from, to). Кінець раніше за початок
// означає перехід через північ. Слот {at} — подія без тривалості (турніри Destiny).
export function occurrences(events, offsetHours, from, to) {
  const weekStart = serverWeekStart(from, offsetHours);
  const weeks = Math.ceil((to - weekStart) / (7 * DAY)) + 1;
  const seen = new Set();
  const result = [];

  for (let week = -1; week < weeks; week += 1) {
    const base = weekStart + week * 7 * DAY;
    for (const event of events) {
      for (const day of event.days) {
        const dayStart = base + Number(day) * DAY;
        if (!Number.isFinite(dayStart)) continue;
        for (const slot of event.slots) {
          const isPoint = slot.at !== undefined;
          const startHour = Number(isPoint ? slot.at : slot.s);
          if (!Number.isFinite(startHour)) continue;
          let endHour = isPoint ? startHour : Number(slot.e);
          if (!Number.isFinite(endHour)) continue;
          if (!isPoint && endHour <= startHour) endHour += 24;

          const start = dayStart + startHour * HOUR;
          const end = dayStart + endHour * HOUR;
          const inside = isPoint ? start >= from && start < to : end > from && start < to;
          if (!inside) continue;

          const key = `${event.category}|${event.name}|${start}|${end}`;
          if (seen.has(key)) continue;
          seen.add(key);
          result.push({ name: event.name, originalName: event.originalName, category: event.category, start, end, point: isPoint });
        }
      }
    }
  }

  return result.sort((a, b) => a.start - b.start || CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.name.localeCompare(b.name, "uk"));
}
