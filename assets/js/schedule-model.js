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

// Один словник назв для всіх трьох серверів: версія гри та сама, тож і назви мають збігатися.
// Джерело — український клієнт: кожну назву звірено з англійським клієнтом за ID рядка
// (чат паків, 07.10.2026). Ключ — повна англійська назва. destiny_schedule.py тримає копію
// для schedule.json, а tests/test_place_names.py стежить, щоб вони не розійшлися.
export const PLACE_NAMES = Object.freeze({
  // Фортеці
  "Sulfur Fortress": "Фортеця сірного дерева",
  "Asteria Fortress": "Фортеця Астерія",
  "Roah Fortress": "Фортеця древнього міста Ру",
  "Siel's Eastern Fortress": "Східна фортеця Сіелі",
  "Siel's Western Fortress": "Західна фортеця Сіелі",
  "Vorgaltem Citadel": "Запечатана вежа",
  "Temple of Scales": "Храм давнього дракона",
  "Altar of Avarice": "Вівтар жадоби",
  "Crimson Temple": "Храм червоної землі",
  "Sillus Fortress": "Фортеця Сіллус",
  "Silona Fortress": "Фортеця Базен",
  "Pradeth Fortress": "Фортеця Парадес",
  "Kysis Fortress": "Фортеця Ткісас",
  "Miren Fortress": "Фортеця Ра-Мірен",
  // EuroAion пише Fortress, Destiny — Refuge; у клієнті обидва — «Фортеця Кротан».
  "Krotan Fortress": "Фортеця Кротан",
  "Krotan Refuge": "Фортеця Кротан",
  "Divine Fortress": "Фортеця святості",

  // Регіони
  "Heiron": "Інтердика",
  "Eltnen": "Елтенен",
  "Morheim": "Морхейм",
  "Beluslan": "Белуслан",
  "Inggison": "Інгісон",
  "Gelkmaros": "Келькмарос",
  "Tiamaranta": "Тіамаранта",

  // Інстанси й поля бою
  "Dredgion": "Дерадикон",
  "Dredgions": "Дерадикони",
  "Terath Dredgion": "Дерадикон Садх",
  "Kamar Battlefield": "Поле битви Камара",
  // Не плутати зі звичайним Ophidan Bridge — то «Міст Йормунганда», інша зона.
  "Engulfed Ophidan Bridge": "Тунель Йормунганда",
  "Iron Wall Warfront": "Неприступна твердиня",

  // Арени
  "Arena of Chaos": "Бойова арена хаосу",
  "Arena of Discipline": "Бойова арена доблесті",
  "Arena of Harmony": "Арена покровительства",
  "Arena of Glory": "Арена слави",
  // Зона Origin між аренами. «Зарядний пристрій» у клієнті — обʼєкт у Повітряній фортеці, не зона.
  "Recharger": "Підзарядник",

  // У клієнті 4.6 цих зон немає — назви наші, доки не зʼявляться в паку.
  "Runatorium": "Рунаторіум",
  "Tiamaranta's Hearts": "Серця Тіамаранти",
});

// Групи, які джерело віддає одним рядком, — складено з назв вище.
const COMBINED_NAMES = Object.freeze({
  "Fortresses: Sulfur, Asteria, Roah": "Фортеці сірного дерева, Астерія, древнього міста Ру",
  "Fortresses: Siel's Eastern, Siel's Western": "Східна й Західна фортеці Сіелі",
  "Fortresses: Vorgaltem Citadel, Temple of Scales": "Запечатана вежа, Храм давнього дракона",
  "Fortresses: Altar of Avarice, Crimson Temple": "Вівтар жадоби, Храм червоної землі",
  "Fortresses: Sillus, Silona, Pradeth": "Фортеці Сіллус, Базен, Парадес",
  "Fortresses: Kysis, Miren, Krotan": "Фортеці Ткісас, Ра-Мірен, Кротан",
  "Arenas: Chaos, Discipline, Harmony": "Бойові арени хаосу й доблесті, Арена покровительства",
  "Miren/Krotan/Kysis": "Ра-Мірен / Кротан / Ткісас",
});

// Origin підписує фортеці коротко («Sulfur») — зводимо до повних ключів словника.
const SHORT_NAMES = Object.freeze({
  "Sulfur": "Sulfur Fortress",
  "Asteria": "Asteria Fortress",
  "Roah": "Roah Fortress",
  "Siel's Western": "Siel's Western Fortress",
  "Siel's Eastern": "Siel's Eastern Fortress",
  "Sillus": "Sillus Fortress",
  "Silona": "Silona Fortress",
  "Pradeth": "Pradeth Fortress",
  "Divine": "Divine Fortress",
});

/** Українська назва з клієнта або null, якщо такої в словнику немає. */
export function placeName(englishName) {
  const name = String(englishName ?? "");
  return COMBINED_NAMES[name] || PLACE_NAMES[SHORT_NAMES[name] || name] || null;
}

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
    name: event.names.map((name) => placeName(name) || name).join(" / "),
    originalName: event.names.join(" / "),
    category: euroCategory(event.cat),
    days: event.days,
    slots: event.times,
  }));
}

function normalizeOrigin(data) {
  return data.events.filter((event) => validEvent(event) && Array.isArray(event.names)).map((event) => ({
    name: event.names.map((name) => placeName(name) || name).join(" / "),
    originalName: event.names.join(" / "),
    category: CATEGORY_TITLES[event.cat] ? event.cat : "pvp",
    days: event.days,
    slots: event.times,
  }));
}

// AionDestiny віддає готові українські назви, але місця все одно беремо зі спільного словника
// за англійською назвою — так усі три сервери показують однакове. Турніри («Кожен за себе»)
// у словнику не місця, для них лишається назва з JSON. Записи без часу — примітки, не події.
function normalizeDestiny(data) {
  return data.events
    .filter((event) => validEvent(event) && event.name && CATEGORY_TITLES[event.cat])
    .map((event) => ({
      name: placeName(event.originalName) || event.name,
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
    url: "euroaion/schedule.json",
    officialUrl: "https://euroaion.com/en-US/Tools/Schedule",
    defaultOffset: 2,
    normalize: normalizeEuro,
  },
  origin: {
    name: "Origin Aion",
    url: "originaion/schedule.json",
    officialUrl: "https://originaion.com/schedule",
    defaultOffset: 2,
    normalize: normalizeOrigin,
  },
  destiny: {
    name: "AionDestiny",
    url: "aiondestiny/schedule.json",
    officialUrl: "https://db.aiondestiny.net/schedule/",
    defaultOffset: 3,
    normalize: normalizeDestiny,
  },
});

export function isServerId(value) {
  return Object.prototype.hasOwnProperty.call(SERVERS, value);
}

const cache = new Map();

// base — шлях до кореня сайту відносно сторінки: "" для головної, "../" для вкладених.
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
