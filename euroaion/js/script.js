document.addEventListener("DOMContentLoaded", () => {
  const SERVER_OFFSET_HOURS = 2;
  const HOUR_MS = 60 * 60 * 1000;
  const DAY_MS = 24 * HOUR_MS;
  const tbody = document.getElementById("schedule-body");
  const status = document.getElementById("schedule-status");

  const translations = Object.freeze({
    "Источники Тиамаранты": "Джерела Тіамаранти",
    "Крепости: Серного дерева, Астерия, Ру": "Фортеці: Сірка, Астерія, Ру",
    "Крепости: Восточная Сиэли, Западная Сиэли": "Фортеці: Східна Сіель, Західна Сіель",
    "Крепости: Запечатанная башня, Храм древнего дракона": "Фортеці: Запечатана вежа, Храм стародавнього дракона",
    "Крепости: Алтарь алчности, Храм красной земли": "Фортеці: Вівтар жадібності, Храм червоної землі",
    "Крепости: Силлус, Базен, Парадес": "Фортеці: Сіллус, Базен, Парадес",
    "Крепости: Ткисас, Ра-Мирэн, Кротан": "Фортеці: Ткісас, Ра-Мірен, Кротан",
    "Крепость святости": "Фортеця Святості",
    "Дерадиконы": "Дерадикони",
    "Тоннель Йормунганда": "Тунель Йормунґанда",
    "Рунаториум": "Рунаторіум",
    "Поле битвы Камара": "Поле битви Камара",
    "Неприступная твердыня": "Неприступна твердиня",
    "Арены: Хаоса, Доблести, Покровительства": "Арени: Хаосу, Доблесті, Покровительства",
    "Арена славы": "Арена Слави",
    "Tiamaranta's Hearts": "Джерела Тіамаранти",
    "Fortresses: Sulfur, Asteria, Roah": "Фортеці: Сірка, Астерія, Ру",
    "Fortresses: Siel's Eastern, Siel's Western": "Фортеці: Східна Сіель, Західна Сіель",
    "Fortresses: Vorgaltem Citadel, Temple of Scales": "Фортеці: Запечатана вежа, Храм стародавнього дракона",
    "Fortresses: Altar of Avarice, Crimson Temple": "Фортеці: Вівтар жадібності, Храм червоної землі",
    "Fortresses: Sillus, Silona, Pradeth": "Фортеці: Сіллус, Базен, Парадес",
    "Fortresses: Kysis, Miren, Krotan": "Фортеці: Ткісас, Ра-Мірен, Кротан",
    "Divine Fortress": "Фортеця Святості",
    "Dredgions": "Дерадикони",
    "Engulfed Ophidan Bridge": "Тунель Йормунґанда",
    "Runatorium": "Рунаторіум",
    "Kamar Battlefield": "Поле битви Камара",
    "Iron Wall Warfront": "Неприступна твердиня",
    "Arenas: Chaos, Discipline, Harmony": "Арени: Хаосу, Доблесті, Покровительства",
    "Arena of Glory": "Арена Слави",
  });

  const localClock = new Intl.DateTimeFormat("uk-UA", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const serverClock = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Etc/GMT-2",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const localTime = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const updatedAt = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  function updateClocks() {
    const now = new Date();
    document.getElementById("current-time").innerHTML =
      `<span>Ваш час: ${localClock.format(now)}</span>` +
      `<span class="server-time">Сервер (UTC+2): ${serverClock.format(now)}</span>`;
  }

  function getServerWeekStart() {
    const now = new Date();
    const serverNow = new Date(now.getTime() + SERVER_OFFSET_HOURS * HOUR_MS);
    const daysSinceMonday = (serverNow.getUTCDay() + 6) % 7;
    const serverMidnightUtc = Date.UTC(
      serverNow.getUTCFullYear(),
      serverNow.getUTCMonth(),
      serverNow.getUTCDate(),
    );
    return serverMidnightUtc - daysSinceMonday * DAY_MS - SERVER_OFFSET_HOURS * HOUR_MS;
  }

  function localDayIndex(date) {
    return (date.getDay() + 6) % 7;
  }

  function convertSlot(weekStart, sourceDay, slot) {
    const startHour = Number(slot.s);
    let endHour = Number(slot.e);
    if (!Number.isFinite(startHour) || !Number.isFinite(endHour)) return null;
    if (endHour <= startHour) endHour += 24;

    const start = new Date(weekStart + sourceDay * DAY_MS + startHour * HOUR_MS);
    const end = new Date(weekStart + sourceDay * DAY_MS + endHour * HOUR_MS);
    return {
      day: localDayIndex(start),
      text: `${localTime.format(start)}-${localTime.format(end)}`,
    };
  }

  function translateNames(names) {
    return names.map((name) => translations[name] || name).join(" / ");
  }

  function groupEvents(events) {
    const weekStart = getServerWeekStart();
    const groups = new Map();

    events.forEach((event) => {
      if (!Array.isArray(event.names) || !Array.isArray(event.days) || !Array.isArray(event.times)) return;
      const key = event.names.join("\u0000");
      if (!groups.has(key)) {
        groups.set(key, {
          name: translateNames(event.names),
          originalName: event.names.join(" "),
          days: Array.from({ length: 7 }, () => new Set()),
        });
      }

      const group = groups.get(key);
      event.days.forEach((sourceDay) => {
        event.times.forEach((slot) => {
          const converted = convertSlot(weekStart, Number(sourceDay), slot);
          if (converted) group.days[converted.day].add(converted.text);
        });
      });
    });

    return [...groups.values()];
  }

  function renderSchedule(data) {
    if (!data || !Array.isArray(data.events) || data.events.length === 0) {
      throw new Error("EuroAion returned an empty schedule");
    }

    const fragment = document.createDocumentFragment();
    groupEvents(data.events).forEach((event) => {
      const row = document.createElement("tr");
      if (/Рунаториум|Арена славы|Runatorium|Arena of Glory/i.test(event.originalName)) {
        row.classList.add("featured-event");
      }

      const label = document.createElement("th");
      label.scope = "row";
      label.className = "schedule-label";
      label.textContent = event.name;
      row.appendChild(label);

      event.days.forEach((slots) => {
        const cell = document.createElement("td");
        if (slots.size === 0) {
          cell.className = "empty";
          cell.textContent = "—";
        } else {
          [...slots].sort().forEach((slot, index) => {
            if (index > 0) cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(slot));
          });
        }
        row.appendChild(cell);
      });
      fragment.appendChild(row);
    });

    tbody.replaceChildren(fragment);
    highlightToday();

    const fetched = data.fetchedAt ? new Date(data.fetchedAt) : null;
    status.classList.remove("is-error");
    status.textContent = fetched && !Number.isNaN(fetched.getTime())
      ? `Оновлено ${updatedAt.format(fetched)} · ${data.events.length} записів`
      : `${data.events.length} актуальних записів`;
  }

  function highlightToday() {
    const today = localDayIndex(new Date());
    const column = today + 2;
    document.querySelector(`.schedule-table thead th:nth-child(${column})`)?.classList.add("highlight");
    tbody.querySelectorAll("tr").forEach((row) => row.children[today + 1]?.classList.add("highlight"));
  }

  function renderError() {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 8;
    cell.className = "load-error";
    cell.textContent = "Не вдалося завантажити розклад. Спробуйте оновити сторінку пізніше.";
    row.appendChild(cell);
    tbody.replaceChildren(row);
    status.classList.add("is-error");
    status.textContent = "Помилка оновлення розкладу";
  }

  async function loadSchedule() {
    try {
      const response = await fetch(`schedule.json?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Schedule request failed: ${response.status}`);
      renderSchedule(await response.json());
    } catch (error) {
      console.error(error);
      renderError();
    }
  }

  document.querySelector(".back-button").addEventListener("click", () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "../";
  });

  updateClocks();
  window.setInterval(updateClocks, 1000);
  loadSchedule();
});
