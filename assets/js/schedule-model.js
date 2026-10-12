// Спільна модель розкладу для головної та сторінки розкладу.
// Джерела — ті самі schedule.json, що їх оновлює fetch_online.py для старих сторінок.
// Назви подій модель віддає вже мовою сайту: українською з клієнта або офіційною англійською.
import { DAY, HOUR, fetchJson } from "./format.js";
import { isEnglish, tr } from "./i18n.js";

export const CATEGORY_LABELS = Object.freeze(tr({
  pvp: "PvP",
  arenas: "Арена",
  siege: "Облога",
  rifts: "Розлом",
  tournaments: "Турнір",
}, {
  pvp: "PvP",
  arenas: "Arena",
  siege: "Siege",
  rifts: "Rift",
  tournaments: "Tournament",
}));

export const CATEGORY_TITLES = Object.freeze(tr({
  pvp: "PvP-інстанси",
  arenas: "Арени",
  siege: "Облоги",
  rifts: "Розломи",
  tournaments: "Турніри",
}, {
  pvp: "PvP instances",
  arenas: "Arenas",
  siege: "Sieges",
  rifts: "Rifts",
  tournaments: "Tournaments",
}));

// Порядок сортування назв: за абеткою мови сайту.
export const COLLATION = tr("uk", "en");

export const CATEGORY_ORDER = Object.freeze(["pvp", "arenas", "siege", "rifts", "tournaments"]);

// Один словник назв для всіх трьох серверів: версія гри та сама, тож і назви мають збігатися.
// Джерело — український клієнт: кожну назву звірено з англійським клієнтом за ID рядка
// (чат паків, 07.10 і 12.10.2026 — паки Origin, Riftshade і Destiny однакові). Siel пишемо
// «Сієль, Сієлі» за правописом (як клієнт, Сієна) — паки переходять на те саме. Ключ — повна англійська назва. destiny_schedule.py тримає копію
// для schedule.json, а tests/test_place_names.py стежить, щоб вони не розійшлися.
export const PLACE_NAMES = Object.freeze({
  // Фортеці
  "Sulfur Fortress": "Фортеця сірчаного дерева",
  "Asteria Fortress": "Фортеця Астерія",
  "Roah Fortress": "Фортеця древнього міста Ру",
  "Siel's Eastern Fortress": "Східна фортеця Сієлі",
  "Siel's Western Fortress": "Західна фортеця Сієлі",
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
  "Baranath Dredgion": "Дерадикон",
  "Chantra Dredgion": "Дерадикон Джантри",
  "Terath Dredgion": "Дерадикон Садх",
  "Kamar Battlefield": "Поле битви Камара",
  // Engulfed Ophidan Bridge і звичайний Ophidan Bridge — різні зони.
  "Engulfed Ophidan Bridge": "Тунель Йормунганда",
  "Ophidan Bridge": "Міст Йормунганда",
  "Iron Wall Warfront": "Неприступна твердиня",
  "Runatorium": "Рунаторіум",

  // Арени
  "Arena of Chaos": "Бойова арена хаосу",
  "Arena of Discipline": "Бойова арена доблесті",
  "Arena of Harmony": "Арена покровительства",
  "Arena of Glory": "Арена слави",
  // Зона Origin між аренами, є лише в паку Origin. «Зарядний пристрій» у клієнті — обʼєкт
  // у Повітряній фортеці, не зона.
  "Recharger": "Підзарядник",

  // У жодному паку цієї назви немає — переклад сайту.
  "Tiamaranta's Hearts": "Серця Тіамаранти",
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
  return PLACE_NAMES[SHORT_NAMES[name] || name] || null;
}

// Англійська версія показує назви з джерела, лише виправляючи ті, що звучать не як у клієнті.
const ENGLISH_NAMES = Object.freeze({
  // Клієнтська назва, як у Destiny, а не мітка EuroAion.
  "Krotan Fortress": "Krotan Refuge",
});

// Групи, які джерело віддає одним рядком: EuroAion — «Arenas: Chaos, Discipline, Harmony» і
// «Fortresses: Sulfur, Asteria, Roah», Origin — «Miren/Krotan/Kysis». У розкладі кожна арена й
// фортеця — окремий рядок, як у Destiny, тож і порядок рядків на всіх серверах той самий.
// Невідому групу лишаємо одним рядком, а не вгадуємо назви.
function splitGroup(name) {
  const arenas = /^Arenas:\s*(.+)$/.exec(name);
  const fortresses = /^Fortresses:\s*(.+)$/.exec(name);
  let parts = null;
  if (arenas) parts = arenas[1].split(",").map((part) => `Arena of ${part.trim()}`);
  else if (fortresses) parts = fortresses[1].split(",").map((part) => part.trim());
  else if (name.includes("/")) parts = name.split("/").map((part) => part.trim());
  if (!parts) return [name];
  const full = parts.map((part) => (PLACE_NAMES[part] ? part : `${part} Fortress`));
  return full.every((part) => PLACE_NAMES[part]) ? full : [name];
}

// Турніри Destiny підписані службово («Event 2x2 (Round)»). Ключ — як у destiny_schedule.py:
// лише малі літери й цифри, бо сайт то пише «FFA(2x2)», то «2x2 (Round)».
const TOURNAMENT_NAMES = Object.freeze({
  event1x1: "1v1 tournament",
  event2x2round: "2v2 tournament (rounds)",
  event2x2killcount: "2v2 tournament (kill count)",
  event3x3round: "3v3 tournament (rounds)",
  event3x3killcount: "3v3 tournament (kill count)",
  eventffa: "Free-for-all",
  eventffa2x2: "Free-for-all 2v2",
  eventffa3x3: "Free-for-all 3v3",
});

// У розкладі кожен Дерадикон — просто «Дерадикон»: EuroAion пише «Dredgions», Origin — «Terath
// Dredgion», Destiny — «Dredgion», а гравцеві однаково важливо одне — що йде Дерадикон. Назви
// окремих кораблів із клієнта («Дерадикон Садх» тощо) лишаються в PLACE_NAMES.
const DREDGIONS = new Set(["Dredgion", "Dredgions", "Baranath Dredgion", "Chantra Dredgion", "Terath Dredgion"]);

function nameKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Назва для показу мовою сайту. Українською — назва з клієнта (як placeName), а без неї
 * fallback; англійською — офіційна англійська: повна назва фортеці замість «Sulfur»,
 * зрозуміла назва турніру, решта — як у джерелі.
 */
export function displayName(sourceName, fallback = sourceName) {
  const name = String(sourceName ?? "");
  if (DREDGIONS.has(name)) return tr("Дерадикон", "Dredgions");
  if (!isEnglish) return placeName(sourceName) || fallback;
  if (!name) return fallback;
  return ENGLISH_NAMES[name] || SHORT_NAMES[name] || TOURNAMENT_NAMES[nameKey(name)] || name;
}

function euroCategory(source) {
  if (source === "arena") return "arenas";
  if (source === "siege" || source === "fortress") return "siege";
  return "pvp";
}

function validEvent(event) {
  return event && Array.isArray(event.days) && Array.isArray(event.times);
}

// Кожне місце з запису — окрема подія з тим самим часом.
function eachPlace(event, category) {
  return event.names.flatMap(splitGroup).map((name) => ({
    name: displayName(name),
    originalName: name,
    category,
    days: event.days,
    slots: event.times,
  }));
}

function normalizeEuro(data) {
  return data.events
    .filter((event) => validEvent(event) && Array.isArray(event.names))
    .flatMap((event) => eachPlace(event, euroCategory(event.cat)));
}

function normalizeOrigin(data) {
  return data.events
    .filter((event) => validEvent(event) && Array.isArray(event.names))
    .flatMap((event) => eachPlace(event, CATEGORY_TITLES[event.cat] ? event.cat : "pvp"));
}

// AionDestiny віддає готові українські назви, але місця все одно беремо зі спільного словника
// за англійською назвою — так усі три сервери показують однакове. Турніри («Кожен за себе»)
// у словнику не місця, для них лишається назва з JSON. Записи без часу — примітки, не події.
// Англійська версія бере англійську назву з originalName, а примітку — з noteEn, якщо вона є.
function normalizeDestiny(data) {
  return data.events
    .filter((event) => validEvent(event) && event.name && CATEGORY_TITLES[event.cat])
    .map((event) => ({
      name: displayName(event.originalName, event.name),
      originalName: event.originalName || event.name,
      category: event.cat,
      days: event.days,
      slots: event.times,
      note: tr(event.note || "", event.noteEn || event.note || ""),
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
        throw new Error(`${server.name}: ${tr("порожній розклад", "empty schedule")}`);
      }
      const offset = Number(data.serverOffset);
      const events = server.normalize(data);
      if (events.length === 0) throw new Error(`${server.name}: ${tr("немає придатних подій", "no usable events")}`);
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

  return result.sort((a, b) => a.start - b.start || CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.name.localeCompare(b.name, COLLATION));
}
