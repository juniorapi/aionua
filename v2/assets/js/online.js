// Онлайн серверів. Логіка станів перенесена з index.html основного сайту:
// кожне правило там виросло з реального збою джерела, тож тут вони ті самі.
import { fetchJson, formatNumber, plural, PLAYERS, updatedFormat, MINUTE } from "./format.js";

// Воркер збирає онлайн наживо (код у worker/). Якщо він недоступний,
// сторінка тихо відкочується на data.json, який оновлює GitHub Actions.
const ONLINE_ENDPOINT = "https://aionua-online.borsay86.workers.dev/";
const FALLBACK_ENDPOINT = "../data.json";
const REFRESH_MS = 2 * MINUTE;
// Старіші дані показуємо, але не називаємо «наживо».
const FRESH_MS = 10 * MINUTE;

function card(root, id) {
  const element = root.querySelector(`[data-server="${id}"]`);
  const pick = (name) => element.querySelector(`[data-${name}]`);
  return {
    dot: pick("dot"),
    state: pick("state"),
    count: pick("count"),
    total: pick("total"),
    unit: pick("unit"),
    note: pick("note"),
    bar: pick("bar"),
    barAsmo: pick("bar-asmo"),
    barEly: pick("bar-ely"),
    factions: pick("factions"),
    asmo: pick("asmo"),
    ely: pick("ely"),
  };
}

function setState(view, state) {
  view.dot.classList.toggle("is-loading", state === "unknown");
  view.dot.classList.toggle("is-offline", state === "offline");
  view.dot.classList.toggle("is-live", state === "online");
  view.state.classList.toggle("is-online", state === "online");
  view.state.textContent = state === "online" ? "онлайн" : state === "offline" ? "офлайн" : "";
}

function showCount(view, total) {
  view.total.textContent = formatNumber(total);
  view.unit.textContent = plural(total, PLAYERS);
  view.count.hidden = false;
  view.note.hidden = true;
}

// Нуль на місці числа читався б як «на сервері нікого», тому без лічильника
// число ховаємо, а поруч пишемо, що сервер його просто не публікує.
function hideCount(view, explain) {
  view.count.hidden = true;
  view.note.hidden = !explain;
}

function showFactions(view, asmo, ely, isPercent) {
  let asmoPct = asmo;
  let elyPct = ely;
  if (isPercent) {
    view.asmo.textContent = `${asmo}%`;
    view.ely.textContent = `${ely}%`;
  } else {
    asmoPct = Math.round((asmo / (asmo + ely)) * 100);
    elyPct = 100 - asmoPct;
    view.asmo.textContent = `${formatNumber(asmo)} · ${asmoPct}%`;
    view.ely.textContent = `${formatNumber(ely)} · ${elyPct}%`;
  }
  view.barAsmo.style.flexGrow = String(asmoPct);
  view.barEly.style.flexGrow = String(elyPct);
  view.bar.hidden = false;
  view.factions.hidden = false;
}

function hideFactions(view) {
  view.bar.hidden = true;
  view.factions.hidden = true;
}

// Воркер пропускає сервер, який не відповів, — тоді лишається попереднє значення.
function renderDestiny(view, destiny) {
  if (!destiny) return;
  if (Number.isFinite(destiny.total)) {
    showCount(view, destiny.total);
    setState(view, "online");
  }
  if (Number.isFinite(destiny.dark) && Number.isFinite(destiny.light) && destiny.dark + destiny.light > 0) {
    showFactions(view, destiny.dark, destiny.light, false);
  }
}

// is_online: null — стан Origin невідомий (збій запиту чи змінилась відповідь API).
// Тоді нічого не міняємо: ні «офлайн», ні старе число як живе не стверджуємо.
function renderOrigin(view, origin) {
  if (!origin || origin.is_online == null) return;
  const online = origin.is_online === true;
  setState(view, online ? "online" : "offline");
  if (!online) {
    hideCount(view, false);
    hideFactions(view);
    return;
  }

  // З 27.08.2026 Origin не публікує кількість гравців (playerCount: null),
  // хоча isOnline лишається true.
  if (Number.isFinite(origin.total)) showCount(view, origin.total);
  else hideCount(view, true);

  // Коли лічильник доступний, показуємо розбивку в людях; без нього — відсотки.
  // 0/0 буває, коли сервер щойно піднявся: тоді краще не показувати нічого.
  const hasRaceCount = Number.isFinite(origin.asmo) && Number.isFinite(origin.elyos);
  const hasRacePct = Number.isFinite(origin.asmo_pct) && Number.isFinite(origin.elyos_pct);
  const asmo = hasRaceCount ? origin.asmo : origin.asmo_pct;
  const ely = hasRaceCount ? origin.elyos : origin.elyos_pct;
  if ((hasRaceCount || hasRacePct) && asmo + ely > 0) showFactions(view, asmo, ely, !hasRaceCount);
  else hideFactions(view);
}

// EuroAion уже не раз міняв розмітку, тож будь-яке значення може не прийти.
// Офлайн стверджуємо лише за явним is_online: false (техробіти).
function renderEuro(view, euro) {
  if (!euro) return;
  if (euro.is_online === false) {
    setState(view, "offline");
    hideCount(view, false);
    hideFactions(view);
    return;
  }

  // З 24.09.2026 EuroAion не публікує кількість гравців: сервер працює й віддає самі відсотки.
  const hasCount = Number.isFinite(euro.total);
  if (hasCount) showCount(view, euro.total);
  else hideCount(view, euro.is_online === true);
  if (hasCount || euro.is_online === true) setState(view, "online");
  if (Number.isFinite(euro.asmo_pct) && Number.isFinite(euro.elyos_pct) && euro.asmo_pct + euro.elyos_pct > 0) {
    showFactions(view, euro.asmo_pct, euro.elyos_pct, true);
  }
}

export function initOnline(root) {
  if (!root) return;
  const views = { euro: card(root, "euro"), origin: card(root, "origin"), destiny: card(root, "destiny") };
  const pill = root.querySelector("[data-live-pill]");
  const pillDot = root.querySelector("[data-live-dot]");
  const pillText = root.querySelector("[data-live-text]");
  const updated = root.querySelector("[data-updated]");

  function setPill(kind, text) {
    pill.classList.toggle("is-live", kind === "live");
    pillDot.classList.toggle("is-loading", kind !== "live");
    pillDot.classList.toggle("is-live", kind === "live");
    pillText.textContent = text;
  }

  function render(data) {
    renderEuro(views.euro, data.euro);
    renderOrigin(views.origin, data.origin);
    renderDestiny(views.destiny, data.destiny);

    const stamp = data.updated_at ? new Date(data.updated_at) : null;
    if (stamp && !Number.isNaN(stamp.getTime())) {
      updated.textContent = `Оновлено ${updatedFormat.format(stamp)}`;
      const fresh = Date.now() - stamp.getTime() <= FRESH_MS;
      setPill(fresh ? "live" : "stale", fresh ? "наживо" : "дані застаріли");
    } else {
      setPill("stale", "час оновлення невідомий");
    }
  }

  async function load() {
    try {
      render(await fetchJson(ONLINE_ENDPOINT));
      return;
    } catch (error) {
      console.warn("Воркер недоступний, беремо data.json:", error);
    }
    try {
      render(await fetchJson(FALLBACK_ENDPOINT));
    } catch (error) {
      console.error("Не вдалося отримати онлайн:", error);
      setPill("stale", "немає зв'язку");
      if (updated.textContent === "Отримуємо дані…") updated.textContent = "Дані недоступні";
    }
  }

  load();
  setInterval(load, REFRESH_MS);
}
