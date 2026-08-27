document.addEventListener("DOMContentLoaded", () => {
  const HOUR_MS = 60 * 60 * 1000;
  const DAY_MS = 24 * HOUR_MS;
  let serverOffsetHours = 3;
  let scheduleGroups = [];
  let activeCategory = "all";
  const tbody = document.getElementById("schedule-body");
  const status = document.getElementById("schedule-status");

  const categoryLabels = Object.freeze({
    pvp: "PvP-інстанси",
    arenas: "Арени",
    siege: "Облоги",
    tournaments: "Турніри",
  });
  const categoryOrder = Object.freeze(["pvp", "arenas", "siege", "tournaments"]);

  const localClock = new Intl.DateTimeFormat("uk-UA", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const serverClock = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "UTC",
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

  function formatOffset(offsetHours) {
    const totalMinutes = Math.round(offsetHours * 60);
    const sign = totalMinutes >= 0 ? "+" : "−";
    const absoluteMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absoluteMinutes / 60);
    const minutes = absoluteMinutes % 60;
    return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""}`;
  }

  function updateClocks() {
    const now = new Date();
    const serverNow = new Date(now.getTime() + serverOffsetHours * HOUR_MS);
    document.getElementById("current-time").innerHTML =
      `<span>Ваш час: ${localClock.format(now)}</span>` +
      `<span class="server-time">Сервер (${formatOffset(serverOffsetHours)}): ${serverClock.format(serverNow)}</span>`;
  }

  function getServerWeekStart(offsetHours) {
    const now = new Date();
    const serverNow = new Date(now.getTime() + offsetHours * HOUR_MS);
    const daysSinceMonday = (serverNow.getUTCDay() + 6) % 7;
    const serverMidnightUtc = Date.UTC(
      serverNow.getUTCFullYear(),
      serverNow.getUTCMonth(),
      serverNow.getUTCDate(),
    );
    return serverMidnightUtc - daysSinceMonday * DAY_MS - offsetHours * HOUR_MS;
  }

  function localDayIndex(date) {
    return (date.getDay() + 6) % 7;
  }

  function convertSlot(weekStart, sourceDay, slot) {
    const isPointInTime = slot.at !== undefined;
    const startHour = Number(isPointInTime ? slot.at : slot.s);
    if (!Number.isFinite(startHour)) return null;

    const start = new Date(weekStart + sourceDay * DAY_MS + startHour * HOUR_MS);
    if (isPointInTime) {
      return { day: localDayIndex(start), text: localTime.format(start) };
    }

    let endHour = Number(slot.e);
    if (!Number.isFinite(endHour)) return null;
    if (endHour <= startHour) endHour += 24;
    const end = new Date(weekStart + sourceDay * DAY_MS + endHour * HOUR_MS);
    return {
      day: localDayIndex(start),
      text: `${localTime.format(start)}-${localTime.format(end)}`,
    };
  }

  function localDayForSourceDay(weekStart, sourceDay) {
    return localDayIndex(new Date(weekStart + sourceDay * DAY_MS + 12 * HOUR_MS));
  }

  function groupEvents(events, offsetHours) {
    const weekStart = getServerWeekStart(offsetHours);
    const groups = new Map();

    events.forEach((event) => {
      if (!event.name || !categoryLabels[event.cat] || !Array.isArray(event.days)) return;
      const key = `${event.cat}\u0000${event.name}`;
      if (!groups.has(key)) {
        groups.set(key, {
          category: event.cat,
          name: event.name,
          originalName: event.originalName || event.name,
          days: Array.from({ length: 7 }, () => ({ times: new Set(), notes: new Set() })),
        });
      }

      const group = groups.get(key);
      event.days.forEach((sourceDay) => {
        if (Array.isArray(event.times)) {
          event.times.forEach((slot) => {
            const converted = convertSlot(weekStart, Number(sourceDay), slot);
            if (converted) group.days[converted.day].times.add(converted.text);
          });
        }
        if (event.note) {
          group.days[localDayForSourceDay(weekStart, Number(sourceDay))].notes.add(event.note);
        }
      });
    });

    return [...groups.values()].sort((left, right) => {
      const categoryDifference = categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category);
      return categoryDifference || left.name.localeCompare(right.name, "uk");
    });
  }

  function addCategoryRow(fragment, category) {
    const row = document.createElement("tr");
    row.className = "category-row";
    const label = document.createElement("th");
    label.colSpan = 8;
    label.scope = "rowgroup";
    label.textContent = categoryLabels[category];
    row.appendChild(label);
    fragment.appendChild(row);
  }

  function renderRows() {
    const visibleGroups = scheduleGroups.filter(
      (group) => activeCategory === "all" || group.category === activeCategory,
    );
    const fragment = document.createDocumentFragment();
    let renderedCategory = null;

    visibleGroups.forEach((event) => {
      if (event.category !== renderedCategory) {
        renderedCategory = event.category;
        addCategoryRow(fragment, event.category);
      }

      const row = document.createElement("tr");
      if (/Арена Слави|Передова Залізної стіни|Кожен за себе/i.test(event.name)) {
        row.classList.add("featured-event");
      }

      const label = document.createElement("th");
      label.scope = "row";
      label.className = "schedule-label";
      label.textContent = event.name;
      label.title = `Офіційна назва: ${event.originalName}`;
      row.appendChild(label);

      event.days.forEach(({ times, notes }) => {
        const cell = document.createElement("td");
        if (times.size === 0 && notes.size === 0) {
          cell.className = "empty";
          cell.textContent = "—";
        } else {
          [...times].sort().forEach((time, index) => {
            if (index > 0) cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(time));
          });
          [...notes].forEach((note) => {
            const noteElement = document.createElement("span");
            noteElement.className = "schedule-note";
            noteElement.textContent = note;
            cell.appendChild(noteElement);
          });
        }
        row.appendChild(cell);
      });
      fragment.appendChild(row);
    });

    tbody.replaceChildren(fragment);
    highlightToday();
  }

  function highlightToday() {
    document.querySelectorAll(".schedule-table .highlight").forEach((cell) => cell.classList.remove("highlight"));
    const today = localDayIndex(new Date());
    const column = today + 2;
    document.querySelector(`.schedule-table thead th:nth-child(${column})`)?.classList.add("highlight");
    tbody.querySelectorAll("tr:not(.category-row)").forEach(
      (row) => row.children[today + 1]?.classList.add("highlight"),
    );
  }

  function renderSchedule(data) {
    if (!data || !Array.isArray(data.events) || data.events.length === 0) {
      throw new Error("AionDestiny returned an empty schedule");
    }
    const sourceOffset = Number(data.serverOffset);
    if (Number.isFinite(sourceOffset) && sourceOffset >= -12 && sourceOffset <= 14) {
      serverOffsetHours = sourceOffset;
    }
    updateClocks();
    scheduleGroups = groupEvents(data.events, serverOffsetHours);
    if (scheduleGroups.length === 0) throw new Error("AionDestiny schedule contains no valid events");
    renderRows();
    status.classList.remove("is-error");
    status.textContent = `Розклад сервера · ${scheduleGroups.length} подій`;
  }

  function renderError() {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 8;
    cell.className = "load-error";
    cell.textContent = "Не вдалося завантажити розклад. Спробуйте оновити сторінку.";
    row.appendChild(cell);
    tbody.replaceChildren(row);
    status.classList.add("is-error");
    status.textContent = "Помилка завантаження розкладу";
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

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      document.querySelectorAll(".filter-button").forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("is-active", isActive);
        candidate.setAttribute("aria-pressed", String(isActive));
      });
      renderRows();
    });
  });

  document.querySelector(".back-button").addEventListener("click", () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "../";
  });

  updateClocks();
  window.setInterval(updateClocks, 1000);
  loadSchedule();
});
