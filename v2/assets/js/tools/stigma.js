// Калькулятор стигм 4.6. Дані — зі старого калькулятора (stigma/js/*.js), які сторінка
// підключає звичайними скриптами до цього модуля: stigmas, stigmaValues і lang.
import { plural, readPreference, writePreference } from "../format.js";
import { initHeader } from "../header.js";
import { copyText, element, formatNumber } from "./common.js";
import {
  ADVANCED,
  ADVANCED_SLOT_LEVELS,
  CLASS_ORDER,
  MAX_LEVEL,
  MIN_LEVEL,
  NORMAL,
  NORMAL_SLOT_LEVELS,
  RACES,
  SLOT_COUNT,
  StigmaBuild,
} from "./stigma-model.js";
import { createText, roman } from "./stigma-text.js";

const ICONS = "../../stigma/icons/skills/";
const SAVE_KEY = "aionua-v2-stigma";
const RACE_NAMES = { pc_light: "Елійці", pc_dark: "Асмодіани" };
const STIGMAS = { one: "стигма", few: "стигми", many: "стигм", other: "стигми" };
// Широкий екран з мишею: клік одразу ставить стигму, наведення показує опис збоку.
// Інакше натискання відкриває опис із кнопкою «Додати».
const WIDE = window.matchMedia("(min-width: 1181px)");
const HOVER = window.matchMedia("(hover: hover) and (pointer: fine)");

const data = window.stigmas;
const text = createText(window.lang, window.stigmaValues);
const root = document.querySelector("[data-stigma-app]");
const ui = {
  classSelect: root.querySelector("[data-class]"),
  race: root.querySelector("[data-race]"),
  level: root.querySelector("[data-level]"),
  summary: root.querySelector("[data-summary]"),
  status: root.querySelector("[data-status]"),
  normalSlots: root.querySelector('[data-slot-group="normal"]'),
  advancedSlots: root.querySelector('[data-slot-group="advanced"]'),
  normal: root.querySelector("[data-normal]"),
  trees: root.querySelector("[data-trees]"),
  details: root.querySelector("[data-details]"),
  sheet: root.querySelector("[data-sheet]"),
  sheetBody: root.querySelector("[data-sheet-body]"),
};

let build = loadBuild();
let selected = null;
let hovered = null;
const previewRanks = new Map();
let statusTimer = 0;

function loadBuild() {
  const code = window.location.hash.slice(1) || readPreference(SAVE_KEY) || "";
  return (code && StigmaBuild.decode(data, code)) || new StigmaBuild(data);
}

function name(key) {
  return text.name(key);
}

function quoted(keys) {
  return keys.map((key) => `«${name(key)}»`).join(", ");
}

function iconUrl(key, rank) {
  const stigma = build.get(key);
  return `${ICONS}${stigma.icons?.[rank] ?? `${stigma.icon}_g${Math.max(1, rank)}`}.png`;
}

function icon(key, rank, large = false) {
  const image = element("img", large ? "item-icon item-icon--lg" : "item-icon");
  image.src = iconUrl(key, rank);
  image.alt = "";
  image.width = large ? 48 : 36;
  image.height = large ? 48 : 36;
  image.decoding = "async";
  return image;
}

function shownRank(key) {
  if (build.has(key)) return build.rankOf(key);
  const max = build.maxRank(key);
  return Math.min(previewRanks.get(key) ?? Math.max(1, max), build.get(key).levels.length);
}

function announce(message, isError = false) {
  window.clearTimeout(statusTimer);
  ui.status.textContent = message;
  ui.status.classList.toggle("is-error", isError);
  statusTimer = window.setTimeout(() => { ui.status.textContent = ""; }, 6000);
}

// ---------- Дії ----------

function addStigma(key, rank) {
  const stigma = build.get(key);
  const result = build.add(key, rank);
  if (result.ok) {
    const others = result.added.filter((added) => added !== key);
    announce(others.length ? `Додано «${name(key)}» разом із: ${quoted(others)}.` : `Додано «${name(key)}».`);
  } else if (result.reason === "level") {
    announce(`«${name(key)}» доступна з ${stigma.levels[0]} рівня.`, true);
  } else {
    announce(`Для «${name(key)}» і потрібних їй стигм бракує вільних слотів.`, true);
  }
  selected = key;
  update();
}

function removeStigma(key) {
  const removed = build.remove(key);
  if (!removed.length) return;
  const others = removed.filter((item) => item !== key);
  announce(others.length ? `Прибрано «${name(key)}», а з нею: ${quoted(others)}.` : `Прибрано «${name(key)}».`);
  update();
}

function setRank(key, rank) {
  if (build.has(key)) {
    build.setRank(key, rank);
    update();
  } else {
    previewRanks.set(key, rank);
    renderDetailsEverywhere();
  }
}

function select(key) {
  selected = key;
  hovered = null;
  renderDetailsEverywhere();
}

function openSheet(key) {
  selected = key;
  renderDetails(ui.sheetBody, key);
  if (!ui.sheet.open) ui.sheet.showModal();
}

function onStigmaClick(key) {
  if (WIDE.matches && HOVER.matches && !build.has(key)) {
    addStigma(key);
  } else if (WIDE.matches) {
    select(key);
  } else {
    openSheet(key);
  }
}

// ---------- Налаштування персонажа ----------

function setupControls() {
  const classes = [...CLASS_ORDER].sort((a, b) => text.className(a).localeCompare(text.className(b), "uk"));
  ui.classSelect.replaceChildren(...classes.map((classId) => new Option(text.className(classId), classId)));
  ui.classSelect.addEventListener("change", () => {
    build.setClass(ui.classSelect.value);
    selected = null;
    previewRanks.clear();
    announce(`Клас: ${text.className(build.classId)}. Збірку почато заново.`);
    update();
  });

  for (let level = MAX_LEVEL; level >= MIN_LEVEL; level -= 1) ui.level.append(new Option(String(level), String(level)));
  ui.level.addEventListener("change", () => {
    const before = build.installed().length;
    build.setLevel(ui.level.value);
    const lost = before - build.installed().length;
    if (lost > 0) announce(`Прибрано ${lost} ${plural(lost, STIGMAS)}: на ${build.level} рівні для них замало рівня чи слотів.`);
    update();
  });

  const raceButtons = RACES.map((race) => {
    const button = element("button", "", RACE_NAMES[race]);
    button.type = "button";
    button.addEventListener("click", () => {
      if (race === build.race) return;
      build.setRace(race);
      update();
    });
    button.dataset.race = race;
    return button;
  });
  ui.race.replaceChildren(...raceButtons);

  root.querySelector("[data-copy]").addEventListener("click", async () => {
    const copied = await copyText(window.location.href, null);
    announce(copied ? "Посилання на збірку скопійовано." : "Не вдалося скопіювати: скопіюйте адресу сторінки вручну.", !copied);
  });
  root.querySelector("[data-reset]").addEventListener("click", () => {
    build.reset();
    selected = null;
    announce("Збірку очищено.");
    update();
  });

  // Наведення на будь-яку стигму показує її опис у бічній панелі.
  root.addEventListener("pointerover", (event) => {
    if (!WIDE.matches || event.pointerType !== "mouse") return;
    const key = event.target.closest("[data-key]")?.dataset.key;
    if (key && key !== hovered) {
      hovered = key;
      renderDetails(ui.details, key);
    }
  });
  root.querySelector("[data-lists]").addEventListener("pointerleave", () => {
    if (!hovered) return;
    hovered = null;
    renderDetails(ui.details, selected);
  });
  root.addEventListener("focusin", (event) => {
    const key = event.target.closest?.("[data-key]")?.dataset.key;
    if (key && WIDE.matches) renderDetails(ui.details, key);
  });

  ui.sheet.addEventListener("click", (event) => {
    // Клік по затемненню за карткою закриває її.
    if (event.target === ui.sheet) ui.sheet.close();
  });
  root.querySelector("[data-sheet-close]").addEventListener("click", () => ui.sheet.close());

  window.addEventListener("hashchange", () => {
    const next = StigmaBuild.decode(data, window.location.hash.slice(1));
    if (next && next.encode() !== build.encode()) {
      build = next;
      selected = null;
      update();
    }
  });
}

// ---------- Малювання ----------

function stigmaButton(key, className = "stigma-card") {
  const stigma = build.get(key);
  const installed = build.has(key);
  const max = build.maxRank(key);
  const rank = shownRank(key);
  const state = installed ? "installed" : max ? "available" : "locked";

  const button = element("button", className);
  button.type = "button";
  button.dataset.key = key;
  button.dataset.state = state;
  if (key === selected) button.classList.add("is-selected");
  const body = element("span", "stigma-card-body");
  body.append(element("span", "stigma-card-name", name(key)));
  const meta = installed
    ? `Ранг ${roman(rank)} · ${stigma.levels[rank - 1]} рів.`
    : `з ${stigma.levels[0]} рів.${stigma.levels.length > 1 ? ` · ${stigma.levels.length} ${plural(stigma.levels.length, { one: "ранг", few: "ранги", many: "рангів", other: "рангу" })}` : ""}`;
  body.append(element("span", "stigma-card-meta", meta));
  button.append(icon(key, rank), body);
  const stateText = installed ? "встановлено" : max ? "можна додати" : `доступна з ${stigma.levels[0]} рівня`;
  button.setAttribute("aria-label", `${name(key)}, ${stateText}`);
  button.addEventListener("click", () => onStigmaClick(key));
  return button;
}

function renderSetup() {
  ui.classSelect.value = build.classId;
  ui.level.value = String(build.level);
  ui.race.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.race === build.race)));
}

function renderSummary() {
  const counts = build.counts();
  const cost = build.cost();
  const items = [
    ["Звичайні слоти", `${counts.normal.used}/${counts.normal.allowed}`],
    ["Покращені слоти", `${counts.advanced.used}/${counts.advanced.allowed}`],
    ["Осколки стигм", formatNumber(cost.shards)],
    ["Очки Безодні", formatNumber(cost.abyss)],
  ];
  ui.summary.replaceChildren(...items.map(([label, value]) => {
    const item = element("div", "stigma-stat");
    item.append(element("dt", "", label), element("dd", "", value));
    return item;
  }));
}

function slotTile(index) {
  const advanced = index >= SLOT_COUNT;
  const position = advanced ? index - SLOT_COUNT : index;
  const unlock = (advanced ? ADVANCED_SLOT_LEVELS : NORMAL_SLOT_LEVELS)[position];
  const slot = build.slots[index];
  const tile = element("li", "stigma-slot");
  tile.dataset.kind = advanced ? "advanced" : "normal";

  if (unlock > build.level) {
    tile.dataset.state = "locked";
    tile.append(element("span", "stigma-slot-note", `з ${unlock} рів.`));
    return tile;
  }
  if (!slot) {
    tile.dataset.state = "empty";
    tile.append(element("span", "stigma-slot-note", "Вільний слот"));
    return tile;
  }

  tile.dataset.state = "filled";
  const stigma = build.get(slot.key);
  tile.append(stigmaButton(slot.key, "stigma-slot-main"));
  const tools = element("div", "stigma-slot-tools");
  const rankSelect = element("select", "select select--sm");
  rankSelect.setAttribute("aria-label", `Ранг: ${name(slot.key)}`);
  for (let rank = 1; rank <= build.maxRank(slot.key); rank += 1) {
    rankSelect.append(new Option(`${roman(rank)} · ${stigma.levels[rank - 1]} рів.`, String(rank)));
  }
  rankSelect.value = String(slot.rank);
  rankSelect.addEventListener("change", () => setRank(slot.key, Number(rankSelect.value)));
  const removeButton = element("button", "stigma-remove", "×");
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", `Прибрати: ${name(slot.key)}`);
  removeButton.addEventListener("click", () => removeStigma(slot.key));
  tools.append(rankSelect, removeButton);
  tile.append(tools);
  return tile;
}

function renderSlots() {
  const tiles = (from) => Array.from({ length: SLOT_COUNT }, (_, offset) => slotTile(from + offset));
  ui.normalSlots.replaceChildren(...tiles(0));
  ui.advancedSlots.replaceChildren(...tiles(SLOT_COUNT));
}

function renderNormal() {
  ui.normal.replaceChildren(...build.normalKeys().map((key) => stigmaButton(key)));
}

function treeNode(node) {
  const item = element("li");
  item.append(stigmaButton(node.key));
  if (node.children.length) {
    const children = element("ul");
    children.append(...node.children.map(treeNode));
    item.append(children);
  }
  return item;
}

function renderTrees() {
  ui.trees.replaceChildren(...build.trees().map((tree) => {
    const panel = element("section", "panel stigma-tree-panel");
    panel.setAttribute("aria-label", `Дерево: ${name(tree.key)}`);
    const list = element("ul", "stigma-tree");
    list.append(treeNode(tree));
    panel.append(list);
    return panel;
  }));
}

function paragraphs(content) {
  return String(content).split(/\n+/).filter(Boolean).map((line) => element("p", "", line.trim()));
}

function requirementList(key) {
  return (build.get(key).require ?? []).map((requirement) => build.resolveRequirement(requirement));
}

function neededFor(key) {
  return Object.keys(build.list).filter((candidate) => (
    build.fitsRace(candidate) && requirementList(candidate).includes(key)
  ));
}

function renderDetails(container, key) {
  const heading = "h2";
  if (!key || !build.get(key)) {
    const placeholder = element("div", "stigma-details-empty");
    placeholder.append(
      element(heading, "stigma-details-title", "Оберіть стигму"),
      element("p", "", WIDE.matches && HOVER.matches
        ? "Наведіть на стигму, щоб побачити опис. Клік додає її в збірку."
        : "Натисніть на стигму, щоб побачити опис і додати її."),
    );
    container.replaceChildren(placeholder);
    return;
  }

  const stigma = build.get(key);
  const installed = build.has(key);
  const max = build.maxRank(key);
  const rank = shownRank(key);
  const parts = [];

  const head = element("div", "stigma-details-head");
  const titleBlock = element("div");
  titleBlock.append(element(heading, "stigma-details-title", `${name(key)} ${roman(rank)}`));
  const badges = element("p", "stigma-badges");
  badges.append(element("span", stigma.type === ADVANCED ? "badge badge-gold" : "badge", stigma.type === ADVANCED ? "Покращена" : "Звичайна"));
  if (stigma.race) badges.append(element("span", "badge", RACE_NAMES[stigma.race]));
  if (installed) badges.append(element("span", "badge badge-live", "У збірці"));
  titleBlock.append(badges);
  head.append(icon(key, rank, true), titleBlock);
  parts.push(head);

  if (stigma.levels.length > 1) {
    const ranks = element("div", "segmented stigma-ranks");
    ranks.setAttribute("role", "group");
    ranks.setAttribute("aria-label", "Ранг");
    stigma.levels.forEach((level, index) => {
      const value = index + 1;
      const button = element("button");
      button.type = "button";
      button.append(element("span", "", roman(value)), element("small", "", `${level} рів.`));
      button.setAttribute("aria-pressed", String(value === rank));
      button.setAttribute("aria-label", `Ранг ${roman(value)}, з ${level} рівня`);
      // Старший ранг можна переглянути наперед, а в збірці — лише доступний на цьому рівні.
      button.disabled = installed && value > max;
      button.addEventListener("click", () => setRank(key, value));
      ranks.append(button);
    });
    parts.push(ranks);
  }

  if (!max) parts.push(element("p", "stigma-warning", `Доступна з ${stigma.levels[0]} рівня.`));
  else if (rank > max) parts.push(element("p", "stigma-warning", `Ранг ${roman(rank)} — з ${stigma.levels[rank - 1]} рівня.`));

  const requirements = requirementList(key);
  if (requirements.length) {
    const line = element("p", "stigma-links");
    line.append(element("span", "stigma-links-label", "Потрібні: "));
    requirements.forEach((requiredKey, index) => {
      if (index) line.append(", ");
      line.append(element("span", build.has(requiredKey) ? "is-done" : "", name(requiredKey)));
    });
    parts.push(line);
  }
  const needed = neededFor(key);
  if (needed.length) {
    const line = element("p", "stigma-links");
    line.append(element("span", "stigma-links-label", "Потрібна для: "), needed.map(name).join(", "));
    parts.push(line);
  }

  const stages = text.stages(key, rank);
  stages.forEach((stage) => {
    const block = element("div", "stigma-stage");
    if (stages.length > 1) block.append(element("p", "stigma-stage-title", text.word("base", "stage", stage.number)));
    block.append(...paragraphs(stage.text));
    const table = element("dl", "stigma-costs");
    stage.rows.forEach((row) => {
      const item = element("div");
      item.append(element("dt", "", row.label), element("dd", "", row.value));
      table.append(item);
    });
    block.append(table);
    parts.push(block);
  });

  const price = element("dl", "stigma-price");
  const priceRows = [["Осколки стигм", stigma.shards?.[rank - 1]]];
  if (stigma.abyss?.[rank - 1]) priceRows.push(["Очки Безодні", stigma.abyss[rank - 1]]);
  priceRows.forEach(([label, amount]) => {
    const item = element("div");
    item.append(element("dt", "", label), element("dd", "", formatNumber(amount ?? 0)));
    price.append(item);
  });
  parts.push(price);

  const action = installed
    ? element("button", "btn-ghost stigma-action", "Прибрати зі збірки")
    : element("button", "btn btn-primary stigma-action", stigma.type === ADVANCED && !build.requirementsMet(key) ? "Додати разом із потрібними" : "Додати в збірку");
  action.type = "button";
  action.disabled = !installed && !max;
  action.addEventListener("click", () => {
    if (installed) removeStigma(key);
    else addStigma(key, rank);
  });
  parts.push(action);

  container.replaceChildren(...parts);
}

function renderDetailsEverywhere() {
  renderDetails(ui.details, hovered ?? selected);
  if (ui.sheet.open) renderDetails(ui.sheetBody, selected);
  // Позначка вибраної стигми в списках.
  root.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
  if (selected) root.querySelectorAll(`[data-key="${CSS.escape(selected)}"]`).forEach((item) => item.classList.add("is-selected"));
}

function save() {
  const code = build.encode();
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${code}`);
  writePreference(SAVE_KEY, code);
}

function update() {
  if (selected && !build.get(selected)) selected = null;
  renderSetup();
  renderSummary();
  renderSlots();
  renderNormal();
  renderTrees();
  renderDetailsEverywhere();
  save();
}

initHeader();
setupControls();
update();
