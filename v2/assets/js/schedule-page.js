// Сторінка розкладу: шкала «Сьогодні» та тижнева таблиця за часом відвідувача.
import { initHeader } from "./header.js";
import {
  CATEGORY_ORDER,
  CATEGORY_TITLES,
  SERVERS,
  isServerId,
  loadSchedule,
  occurrences,
  serverWeekStart,
} from "./schedule-model.js";
import { DAY, EVENTS, HOUR, MINUTE, plural, readPreference, timeFormat, writePreference } from "./format.js";

const PREFERENCE_KEY = "aionua:v2:server";
const BASE = "../";
const TIMELINE_HOURS = 13;

const clockFormat = new Intl.DateTimeFormat("uk-UA", {
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const serverClockFormat = new Intl.DateTimeFormat("uk-UA", {
  timeZone: "UTC",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const headFormat = new Intl.DateTimeFormat("uk-UA", { weekday: "short", day: "numeric" });
const todayFormat = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
const fetchedFormat = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatOffset(hours) {
  return `UTC${hours >= 0 ? "+" : "−"}${Math.abs(hours)}`;
}

function localWeekStart(now) {
  const date = new Date(now);
  const sinceMonday = (date.getDay() + 6) % 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - sinceMonday).getTime();
}

function localDayIndex(time) {
  return (new Date(time).getDay() + 6) % 7;
}

function slotLabel(item) {
  return item.point ? timeFormat.format(item.start) : `${timeFormat.format(item.start)}–${timeFormat.format(item.end)}`;
}

// Події з однаковою назвою в одній категорії — один рядок, навіть якщо джерело ділить їх на кілька записів.
function groupEvents(events) {
  const groups = new Map();
  for (const event of events) {
    const key = `${event.category}\u0000${event.name}`;
    if (!groups.has(key)) {
      groups.set(key, { key, category: event.category, name: event.name, originalName: event.originalName, events: [] });
    }
    groups.get(key).events.push(event);
  }
  return [...groups.values()].sort((a, b) =>
    CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.name.localeCompare(b.name, "uk"));
}

function init() {
  initHeader();
  const root = document.querySelector("[data-schedule]");
  const serverName = root.querySelector("[data-server-name]");
  const clockLocal = root.querySelector("[data-clock-local]");
  const clockServer = root.querySelector("[data-clock-server]");
  const clockServerLabel = root.querySelector("[data-clock-server-label]");
  const status = root.querySelector("[data-status]");
  const official = root.querySelector("[data-official]");
  const filters = root.querySelector("[data-filters]");
  const timeline = root.querySelector("[data-timeline]");
  const timelineEmpty = root.querySelector("[data-timeline-empty]");
  const todayRange = root.querySelector("[data-today-range]");
  const weekHead = root.querySelector("[data-week-head]");
  const weekBody = root.querySelector("[data-week-body]");
  const serverButtons = [...root.querySelectorAll("[data-server-button]")];
  const legacyLink = document.querySelector("[data-legacy-link]");

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("server");
  const saved = readPreference(PREFERENCE_KEY);
  let serverId = isServerId(requested) ? requested : isServerId(saved) ? saved : "euro";
  let model = null;
  let groups = [];
  let category = "all";
  let request = 0;

  function updateClocks() {
    const now = Date.now();
    clockLocal.textContent = clockFormat.format(now);
    const offset = model ? model.offset : SERVERS[serverId].defaultOffset;
    clockServerLabel.textContent = `Сервер (${formatOffset(offset)})`;
    clockServer.textContent = serverClockFormat.format(now + offset * HOUR);
  }

  function visibleGroups() {
    return groups.filter((group) => category === "all" || group.category === category);
  }

  function renderFilters() {
    const present = CATEGORY_ORDER.filter((key) => groups.some((group) => group.category === key));
    if (category !== "all" && !present.includes(category)) category = "all";
    const options = [["all", "Усі події"], ...present.map((key) => [key, CATEGORY_TITLES[key]])];
    filters.replaceChildren(...options.map(([key, label]) => {
      const button = el("button", "filter", label);
      button.type = "button";
      button.setAttribute("aria-pressed", String(key === category));
      button.addEventListener("click", () => {
        if (category === key) return;
        category = key;
        renderFilters();
        renderTimeline();
        renderWeek();
      });
      return button;
    }));
  }

  function renderTimeline() {
    const now = Date.now();
    const hourStart = new Date(now);
    hourStart.setMinutes(0, 0, 0);
    const from = hourStart.getTime() - HOUR;
    const to = from + TIMELINE_HOURS * HOUR;
    const span = to - from;
    const percent = (time) => `${(((time - from) / span) * 100).toFixed(3)}%`;
    todayRange.textContent = `${todayFormat.format(now)}, ${timeFormat.format(from)} – ${timeFormat.format(to)} · за вашим часом`;

    const axisTrack = el("div", "tl-track");
    for (let hour = 0; hour <= TIMELINE_HOURS; hour += 1) {
      const tick = el("span", "tl-tick", timeFormat.format(from + hour * HOUR));
      tick.style.left = percent(from + hour * HOUR);
      axisTrack.append(tick);
    }
    const axis = el("div", "tl-row tl-axis");
    axis.append(el("span", "tl-name", "Подія"), axisTrack);

    const rows = [];
    let lastCategory = null;
    for (const group of visibleGroups()) {
      const items = occurrences(group.events, model.offset, from, to);
      if (items.length === 0) continue;
      if (group.category !== lastCategory) {
        lastCategory = group.category;
        rows.push(el("div", "tl-group", CATEGORY_TITLES[group.category]));
      }
      const row = el("div", "tl-row");
      const name = el("span", "tl-name", group.name);
      name.title = `Офіційна назва: ${group.originalName}`;
      const track = el("div", "tl-track");
      for (const item of items) {
        const state = item.point ? (item.start <= now ? "is-past" : "is-next")
          : item.end <= now ? "is-past" : item.start <= now ? "is-now" : "is-next";
        const block = el("span", `tl-block ${state}${item.point ? " is-point" : ""}`);
        const start = Math.max(item.start, from);
        const end = Math.min(item.end, to);
        block.style.left = percent(start);
        if (!item.point) block.style.width = `calc(${(((end - start) / span) * 100).toFixed(3)}% - 3px)`;
        const label = slotLabel(item);
        block.title = label;
        block.append(el("span", "tl-block-text", item.point ? "" : timeFormat.format(item.start)));
        block.append(el("span", "visually-hidden", `${label}${state === "is-now" ? ", триває зараз" : ""}`));
        track.append(block);
      }
      row.append(name, track);
      rows.push(row);
    }

    const nowLine = el("div", "tl-now");
    nowLine.style.setProperty("--at", ((now - from) / span).toFixed(4));
    nowLine.setAttribute("aria-hidden", "true");
    nowLine.append(el("span", "tl-now-label", timeFormat.format(now)));

    timelineEmpty.hidden = rows.length > 0;
    timeline.hidden = rows.length === 0;
    timeline.replaceChildren(axis, ...rows, nowLine);
  }

  function renderWeek() {
    const now = Date.now();
    const weekStart = localWeekStart(now);
    const weekEnd = weekStart + 7 * DAY;
    const today = localDayIndex(now);

    const headCells = [el("th", "", "Подія")];
    headCells[0].scope = "col";
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + day);
      const cell = el("th", day === today ? "is-today" : "", headFormat.format(date));
      cell.scope = "col";
      headCells.push(cell);
    }
    weekHead.replaceChildren(...headCells);

    const rows = [];
    let lastCategory = null;
    const serverWeek = serverWeekStart(now, model.offset);
    for (const group of visibleGroups()) {
      const days = Array.from({ length: 7 }, () => ({ slots: [], notes: new Set() }));
      for (const item of occurrences(group.events, model.offset, weekStart, weekEnd)) {
        if (item.start < weekStart || item.start >= weekEnd) continue;
        days[localDayIndex(item.start)].slots.push(item);
      }
      // Примітки без часу (як «2 входи» в Destiny) прив'язані до дня сервера: ставимо їх за полуднем.
      for (const event of group.events) {
        if (!event.note) continue;
        for (const day of event.days) days[localDayIndex(serverWeek + Number(day) * DAY + 12 * HOUR)].notes.add(event.note);
      }
      if (days.every((day) => day.slots.length === 0 && day.notes.size === 0)) continue;

      if (group.category !== lastCategory) {
        lastCategory = group.category;
        const groupRow = el("tr", "group-row");
        const groupCell = el("th", "", CATEGORY_TITLES[group.category]);
        groupCell.colSpan = 8;
        groupCell.scope = "rowgroup";
        groupRow.append(groupCell);
        rows.push(groupRow);
      }

      const row = el("tr");
      const name = el("th", "", group.name);
      name.scope = "row";
      name.title = `Офіційна назва: ${group.originalName}`;
      row.append(name);
      days.forEach((day, index) => {
        const cell = el("td", index === today ? "is-today" : "");
        if (day.slots.length === 0 && day.notes.size === 0) {
          cell.classList.add("is-empty");
          cell.append(el("span", "", "—"));
          cell.setAttribute("aria-label", "немає");
        } else {
          const list = el("ul", "slots");
          day.slots.sort((a, b) => a.start - b.start).forEach((item) => {
            const live = !item.point && item.start <= now && item.end > now;
            list.append(el("li", live ? "is-now" : "", slotLabel(item)));
          });
          day.notes.forEach((note) => list.append(el("li", "note", note)));
          cell.append(list);
        }
        row.append(cell);
      });
      rows.push(row);
    }
    weekBody.replaceChildren(...rows);
  }

  function renderStatus() {
    const count = model.eventCount || groups.length;
    const parts = [];
    if (model.fetchedAt) parts.push(`Оновлено ${fetchedFormat.format(model.fetchedAt)}`);
    parts.push(`${count} ${plural(count, EVENTS)}`);
    status.textContent = parts.join(" · ");
    status.classList.remove("is-error");
  }

  async function select(id) {
    serverId = id;
    writePreference(PREFERENCE_KEY, id);
    const server = SERVERS[id];
    serverName.textContent = server.name;
    document.title = `Розклад ${server.name} · Aion UA`;
    serverButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.serverButton === id)));
    official.hidden = !server.officialUrl;
    if (server.officialUrl) official.href = server.officialUrl;
    if (legacyLink) legacyLink.href = BASE + server.legacyPage;
    const url = new URL(window.location.href);
    url.searchParams.set("server", id);
    window.history.replaceState(null, "", url);

    const token = ++request;
    model = null;
    status.textContent = "Завантажуємо розклад…";
    updateClocks();
    try {
      const loaded = await loadSchedule(id, BASE);
      if (token !== request) return;
      model = loaded;
      groups = groupEvents(model.events);
      updateClocks();
      renderStatus();
      renderFilters();
      renderTimeline();
      renderWeek();
    } catch (error) {
      if (token !== request) return;
      console.error("Розклад недоступний:", error);
      status.textContent = "Не вдалося завантажити розклад. Спробуйте оновити сторінку пізніше.";
      status.classList.add("is-error");
      filters.replaceChildren();
      timeline.replaceChildren();
      weekBody.replaceChildren();
    }
  }

  serverButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.serverButton !== serverId) select(button.dataset.serverButton);
    });
  });

  select(serverId);
  updateClocks();
  setInterval(updateClocks, 1000);
  setInterval(() => {
    if (!model) return;
    renderTimeline();
    renderWeek();
  }, MINUTE);
}

init();
