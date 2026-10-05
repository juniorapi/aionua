// «Найближчі події» на головній: що йде зараз і що далі на вибраному сервері.
import { CATEGORY_LABELS, SERVERS, isServerId, loadSchedule, occurrences } from "./schedule-model.js";
import {
  HOUR,
  dayLabel,
  formatDuration,
  isSameLocalDay,
  readPreference,
  timeFormat,
  weekdayShort,
  writePreference,
} from "./format.js";

const PREFERENCE_KEY = "aionua:v2:server";
const RUNNING_LIMIT = 4;
const NEXT_LIMIT = 6;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function badge(category) {
  return element("span", "badge", CATEGORY_LABELS[category] || category);
}

function runningItem(item, now) {
  const li = element("li", "now-item");
  const top = element("div", "now-top");
  top.append(
    element("span", "now-name", item.name),
    badge(item.category),
    element("span", "now-time", `${timeFormat.format(item.start)}–${timeFormat.format(item.end)}`),
  );

  const progress = element("div", "progress");
  progress.setAttribute("aria-hidden", "true");
  const fill = element("span");
  const share = (now - item.start) / (item.end - item.start);
  fill.style.width = `${Math.min(100, Math.max(2, Math.round(share * 100)))}%`;
  progress.append(fill);

  li.append(top, progress, element("p", "now-left", `ще ${formatDuration(item.end - now)}`));
  return li;
}

function nextItem(item, now) {
  const li = element("li", "next-item");
  const time = element("time", "next-time");
  time.dateTime = new Date(item.start).toISOString();
  if (!isSameLocalDay(item.start, now)) time.append(element("small", "", weekdayShort.format(item.start)));
  time.append(timeFormat.format(item.start));

  li.append(
    time,
    element("span", "next-name", item.name),
    badge(item.category),
    element("span", "next-in", `через ${formatDuration(item.start - now)}`),
  );
  return li;
}

export function initEvents(root) {
  if (!root) return;
  const buttons = [...root.querySelectorAll("[data-events-server]")];
  const link = root.querySelector("[data-events-link]");
  const dateText = root.querySelector("[data-events-date]");
  const nowList = root.querySelector("[data-now-list]");
  const nowEmpty = root.querySelector("[data-now-empty]");
  const nextList = root.querySelector("[data-next-list]");
  const status = root.querySelector("[data-events-status]");

  const saved = readPreference(PREFERENCE_KEY);
  let current = isServerId(saved) ? saved : "euro";
  let model = null;
  let request = 0;

  function render() {
    const now = Date.now();
    dateText.textContent = `${dayLabel.format(now)} · за вашим часом`;
    if (!model) return;

    const around = occurrences(model.events, model.offset, now - 12 * HOUR, now + 36 * HOUR);
    const running = around
      .filter((item) => !item.point && item.start <= now && item.end > now)
      .sort((a, b) => a.end - b.end);
    const upcoming = around.filter((item) => item.start > now).slice(0, NEXT_LIMIT);

    nowList.replaceChildren(...running.slice(0, RUNNING_LIMIT).map((item) => runningItem(item, now)));
    if (running.length > RUNNING_LIMIT) {
      const more = element("li", "now-left", `і ще ${running.length - RUNNING_LIMIT} у повному розкладі`);
      nowList.append(more);
    }
    nowEmpty.hidden = running.length > 0;

    nextList.replaceChildren(...upcoming.map((item) => nextItem(item, now)));
    status.hidden = upcoming.length > 0;
    if (upcoming.length === 0) status.textContent = "Найближчим часом подій немає.";
  }

  async function select(serverId) {
    current = serverId;
    writePreference(PREFERENCE_KEY, serverId);
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.eventsServer === serverId)));
    link.href = `schedule/?server=${serverId}`;
    link.setAttribute("aria-label", `Повний розклад ${SERVERS[serverId].name}`);

    const token = ++request;
    model = null;
    status.hidden = false;
    status.textContent = "Завантажуємо розклад…";
    try {
      const loaded = await loadSchedule(serverId);
      if (token !== request) return;
      model = loaded;
      render();
    } catch (error) {
      if (token !== request) return;
      console.error("Розклад недоступний:", error);
      nowList.replaceChildren();
      nextList.replaceChildren();
      nowEmpty.hidden = true;
      status.hidden = false;
      status.textContent = "Не вдалося завантажити розклад. Спробуйте пізніше.";
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.eventsServer !== current) select(button.dataset.eventsServer);
    });
  });

  select(current);
  setInterval(render, 30 * 1000);
}
