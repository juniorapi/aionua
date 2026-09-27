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
  NORMAL_SLOT_LEVELS,
  RACES,
  SLOT_COUNT,
  StigmaBuild,
} from "./stigma-model.js";
import { createText, roman } from "./stigma-text.js";
import { POINTER, createAnnouncer, createTooltip, focusedControl, jumpTo, refocus } from "./stigma-ui.js";

const ICONS = "../../stigma/icons/skills/";
const SAVE_KEY = "aionua-v2-stigma";
const RACE_NAMES = { pc_light: "Елійці", pc_dark: "Асмодіани" };
// Знахідний відмінок: «прибрано 1 стигму», «додано 5 потрібних стигм».
const STIGMAS = { one: "стигму", few: "стигми", many: "стигм", other: "стигми" };
const NEEDED = { one: "потрібну стигму", few: "потрібні стигми", many: "потрібних стигм", other: "потрібної стигми" };
const data = window.stigmas;
const text = createText(window.lang, window.stigmaValues);
const root = document.querySelector("[data-stigma-app]");
const ui = {
  classes: root.querySelector("[data-classes]"),
  className: root.querySelector("[data-class-name]"),
  crest: root.querySelector("[data-class-crest]"),
  race: root.querySelector("[data-race]"),
  level: root.querySelector("[data-level]"),
  stats: root.querySelector("[data-stats]"),
  status: root.querySelector("[data-status]"),
  sheetStatus: root.querySelector("[data-sheet-status]"),
  normalCells: root.querySelector('[data-slot-row="normal"]'),
  advancedCells: root.querySelector('[data-slot-row="advanced"]'),
  normal: root.querySelector("[data-normal]"),
  trees: root.querySelector("[data-trees]"),
  sections: {
    normal: root.querySelector('[data-section="normal"]'),
    advanced: root.querySelector('[data-section="advanced"]'),
  },
  tooltip: root.querySelector("[data-tooltip]"),
  sheet: root.querySelector("[data-sheet]"),
  sheetBody: root.querySelector("[data-sheet-body]"),
};

let build = loadBuild();
let sheetKey = null;
const previewRanks = new Map();
const announce = createAnnouncer([ui.status, ui.sheetStatus]);
const FOCUS_ZONES = "[data-normal], [data-trees], [data-slot-row]";

function loadBuild() {
  const code = window.location.hash.slice(1) || readPreference(SAVE_KEY) || "";
  return (code && StigmaBuild.decode(data, code)) || new StigmaBuild(data);
}

const name = (key) => text.name(key);
// Одну-дві стигми називаємо, більше — рахуємо: повідомлення має бути коротким.
const quoted = (keys) => keys.map((key) => `«${name(key)}»`).join(" і ");

// Посилання на збірку: без стигм — просто адреса сторінки, без коду.
function shareUrl() {
  const base = `${window.location.origin}${window.location.pathname}`;
  return build.installed().length ? `${base}#${build.encode()}` : base;
}

function iconUrl(key, rank) {
  const stigma = build.get(key);
  return `${ICONS}${stigma.icons?.[rank] ?? `${stigma.icon}_g${Math.max(1, rank)}`}.png`;
}

function icon(key, rank, size = 40) {
  const image = element("img", "st-img");
  image.src = iconUrl(key, rank);
  image.alt = "";
  image.width = size;
  image.height = size;
  image.decoding = "async";
  return image;
}

function shownRank(key) {
  if (build.has(key)) return build.rankOf(key);
  const max = build.maxRank(key);
  return Math.min(previewRanks.get(key) ?? Math.max(1, max), build.get(key).levels.length);
}

// ---------- Дії ----------

function addStigma(key, rank) {
  const stigma = build.get(key);
  const result = build.add(key, rank);
  if (result.ok) {
    const others = result.added.filter((added) => added !== key);
    if (!others.length) announce(`Додано «${name(key)}».`);
    else if (others.length <= 2) announce(`Додано «${name(key)}» разом із ${quoted(others)}.`);
    else announce(`Додано «${name(key)}» і ще ${others.length} ${plural(others.length, NEEDED)}.`);
  } else if (result.reason === "level") {
    announce(`«${name(key)}» доступна з ${stigma.levels[0]} рівня.`, true);
  } else {
    announce(`Для «${name(key)}» і потрібних їй стигм бракує вільних слотів.`, true);
  }
  update();
}

function removeStigma(key) {
  const removed = build.remove(key);
  if (!removed.length) return;
  const others = removed.filter((item) => item !== key);
  if (!others.length) announce(`Прибрано «${name(key)}».`);
  else if (others.length <= 2) announce(`Прибрано «${name(key)}», а з нею ${quoted(others)}.`);
  else announce(`Прибрано «${name(key)}», а з нею ще ${others.length} ${plural(others.length, STIGMAS)}.`);
  update();
}

function toggle(key) {
  if (build.has(key)) removeStigma(key);
  else addStigma(key);
}

function setRank(key, rank) {
  if (build.has(key)) {
    build.setRank(key, rank);
    update();
  } else {
    previewRanks.set(key, rank);
    if (ui.sheet.open) renderDetails(ui.sheetBody, key, "sheet");
  }
}

function openSheet(key) {
  if (key !== sheetKey) ui.sheetStatus.textContent = "";
  sheetKey = key;
  renderDetails(ui.sheetBody, key, "sheet");
  if (!ui.sheet.open) ui.sheet.showModal();
}

function onStigmaClick(key) {
  if (POINTER.matches) toggle(key);
  else openSheet(key);
}

// ---------- Налаштування персонажа ----------

function setupControls() {
  ui.classes.replaceChildren(...CLASS_ORDER.map((classId) => {
    const button = element("button", "st-class");
    button.type = "button";
    button.dataset.classId = classId;
    button.title = text.className(classId);
    button.setAttribute("aria-label", text.className(classId));
    const badge = element("span", `st-class-icon st-class-icon--${classId}`);
    badge.setAttribute("aria-hidden", "true");
    button.append(badge);
    button.addEventListener("click", () => {
      if (classId === build.classId) return;
      build.setClass(classId);
      previewRanks.clear();
      announce(`Клас: ${text.className(classId)}. Збірку почато заново.`);
      update();
    });
    return button;
  }));

  ui.race.replaceChildren(...RACES.map((race) => {
    const button = element("button", "", RACE_NAMES[race]);
    button.type = "button";
    button.dataset.race = race;
    button.addEventListener("click", () => {
      if (race === build.race) return;
      build.setRace(race);
      update();
    });
    return button;
  }));

  for (let level = MAX_LEVEL; level >= MIN_LEVEL; level -= 1) ui.level.append(new Option(`${level}`, String(level)));
  ui.level.addEventListener("change", () => {
    const before = build.installed().length;
    build.setLevel(ui.level.value);
    const lost = before - build.installed().length;
    if (lost > 0) announce(`Прибрано ${lost} ${plural(lost, STIGMAS)}: на ${build.level} рівні для них замало рівня чи слотів.`);
    update();
  });

  root.querySelector("[data-copy]").addEventListener("click", async () => {
    const copied = await copyText(shareUrl(), null);
    announce(copied ? "Посилання на збірку скопійовано." : "Не вдалося скопіювати посилання.", !copied);
  });
  root.querySelector("[data-reset]").addEventListener("click", () => {
    build.reset();
    announce("Збірку очищено.");
    update();
  });

  ui.sheet.addEventListener("click", (event) => {
    if (event.target === ui.sheet) ui.sheet.close();
  });
  root.querySelector("[data-sheet-close]").addEventListener("click", () => ui.sheet.close());

  window.addEventListener("hashchange", () => {
    const next = StigmaBuild.decode(data, window.location.hash.slice(1));
    if (next && next.encode() !== build.encode()) {
      build = next;
      update();
    }
  });
}

// ---------- Стигми ----------

function stigmaButton(key, className) {
  const stigma = build.get(key);
  const installed = build.has(key);
  const max = build.maxRank(key);
  const rank = shownRank(key);
  const button = element("button", className);
  button.type = "button";
  button.dataset.key = key;
  button.dataset.state = installed ? "installed" : max ? "available" : "locked";
  const gem = element("span", "st-gem");
  gem.append(icon(key, rank));
  button.append(gem);
  if (!installed && !max) button.dataset.level = stigma.levels[0];
  const state = installed ? `у збірці, ранг ${roman(rank)}` : max ? "можна додати" : `з ${stigma.levels[0]} рівня`;
  button.setAttribute("aria-label", `${name(key)}: ${state}`);
  // Другий клік подвійного кліку пропускаємо: після першого список уже зсунувся,
  // і він влучив би в іншу стигму.
  button.addEventListener("click", (event) => {
    if (event.detail < 2) onStigmaClick(key);
  });
  return button;
}

function slotCell(index) {
  const advanced = index >= SLOT_COUNT;
  const position = advanced ? index - SLOT_COUNT : index;
  const unlock = (advanced ? ADVANCED_SLOT_LEVELS : NORMAL_SLOT_LEVELS)[position];
  const slot = build.slots[index];
  const cell = element("li", "st-cell");
  cell.dataset.kind = advanced ? "advanced" : "normal";
  const frame = element("div", "st-cell-frame");
  cell.append(frame);

  if (unlock > build.level) {
    cell.dataset.state = "locked";
    frame.append(element("span", "st-cell-note", `${unlock}`));
    cell.setAttribute("aria-label", `Слот відкривається з ${unlock} рівня`);
    return cell;
  }
  if (!slot) {
    // Порожня клітинка веде до списку, з якого її можна заповнити.
    cell.dataset.state = "empty";
    const add = element("button", "st-cell-add", "+");
    add.type = "button";
    add.setAttribute("aria-label", advanced ? "Вільний слот: вибрати покращену стигму" : "Вільний слот: вибрати звичайну стигму");
    // detail 0 — натиснуто з клавіатури.
    add.addEventListener("click", (event) => jumpTo(ui.sections[advanced ? "advanced" : "normal"], event.detail === 0));
    frame.append(add);
    return cell;
  }

  cell.dataset.state = "filled";
  const stigma = build.get(slot.key);
  frame.append(stigmaButton(slot.key, "st-cell-stigma"));
  const rankSelect = element("select", "st-cell-rank");
  rankSelect.setAttribute("aria-label", `Ранг: ${name(slot.key)}`);
  for (let value = 1; value <= build.maxRank(slot.key); value += 1) {
    rankSelect.append(new Option(`${roman(value)} · ${stigma.levels[value - 1]}`, String(value)));
  }
  rankSelect.value = String(slot.rank);
  rankSelect.disabled = build.maxRank(slot.key) < 2;
  rankSelect.addEventListener("change", () => setRank(slot.key, Number(rankSelect.value)));
  cell.append(rankSelect);
  return cell;
}

function renderSlots() {
  const cells = (from) => Array.from({ length: SLOT_COUNT }, (_, offset) => slotCell(from + offset));
  ui.normalCells.replaceChildren(...cells(0));
  ui.advancedCells.replaceChildren(...cells(SLOT_COUNT));
}

// Вибрана звичайна стигма переходить у слот і зникає зі списку, а прибрана — повертається.
function renderNormal() {
  const keys = build.normalKeys().filter((key) => !build.has(key));
  if (!keys.length) {
    ui.normal.replaceChildren(element("p", "st-pool-empty", "Усі звичайні стигми вже в слотах."));
    return;
  }
  ui.normal.replaceChildren(...keys.map((key) => {
    const item = element("div", "st-pool-item");
    item.append(stigmaButton(key, "st-stigma"), element("span", "st-pool-level", String(build.get(key).levels[0])));
    return item;
  }));
}

// Гілка йде зліва направо: потрібні стигми ліворуч, покращена — праворуч від них.
function treeNode(node) {
  const branch = element("div", "st-node");
  branch.append(stigmaButton(node.key, "st-stigma"));
  if (node.children.length) {
    const children = element("div", "st-children");
    children.append(...node.children.map(treeNode));
    branch.append(children);
  }
  return branch;
}

// Одна стигма може стояти в гілці кілька разів, тож рахуємо різні.
function treeKeys(node, keys = new Set()) {
  keys.add(node.key);
  node.children.forEach((child) => treeKeys(child, keys));
  return keys;
}

function renderTrees() {
  ui.trees.replaceChildren(...build.trees().map((tree) => {
    const panel = element("div", "panel st-tree");
    panel.dataset.tipPanel = "";
    panel.setAttribute("role", "group");
    panel.setAttribute("aria-label", `Гілка: ${name(tree.key)}`);
    const keys = [...treeKeys(tree)];
    const head = element("div", "st-tree-head");
    head.append(
      element("p", "st-tree-title", name(tree.key)),
      element("p", "st-tree-count", `вибрано ${keys.filter((key) => build.has(key)).length} з ${keys.length}`),
    );
    const scroller = element("div", "st-tree-scroll");
    scroller.append(treeNode(tree));
    panel.append(head, scroller);
    return panel;
  }));
}

function renderStats() {
  const counts = build.counts();
  const cost = build.cost();
  const items = [
    ["Звичайні", `${counts.normal.used}/${counts.normal.allowed}`, "normal"],
    ["Покращені", `${counts.advanced.used}/${counts.advanced.allowed}`, "advanced"],
    ["Осколки стигм", formatNumber(cost.shards), "shards"],
    ["Очки Безодні", formatNumber(cost.abyss), "abyss"],
  ];
  ui.stats.replaceChildren(...items.map(([label, value, kind]) => {
    const item = element("div", `st-stat st-stat--${kind}`);
    item.append(element("dt", "", label), element("dd", "", value));
    return item;
  }));
}

// ---------- Опис стигми ----------

function requirementList(key) {
  return (build.get(key).require ?? []).map((requirement) => build.resolveRequirement(requirement));
}

function neededFor(key) {
  return Object.keys(build.list).filter((candidate) => build.fitsRace(candidate) && requirementList(candidate).includes(key));
}

function row(label, value) {
  const item = element("div");
  item.append(element("dt", "", label), element("dd", "", value));
  return item;
}

function renderDetails(container, key, mode) {
  const stigma = build.get(key);
  if (!stigma) {
    container.replaceChildren();
    return;
  }
  const installed = build.has(key);
  const max = build.maxRank(key);
  const rank = shownRank(key);
  const parts = [];

  const head = element("div", "stigma-details-head");
  const titleBlock = element("div");
  titleBlock.append(element("p", "stigma-details-title", `${name(key)} ${roman(rank)}`));
  const badges = element("p", "stigma-badges");
  badges.append(element("span", stigma.type === ADVANCED ? "badge badge-gold" : "badge", stigma.type === ADVANCED ? "Покращена" : "Звичайна"));
  if (stigma.race) badges.append(element("span", "badge", RACE_NAMES[stigma.race]));
  if (installed) badges.append(element("span", "badge badge-live", "У збірці"));
  titleBlock.append(badges);
  const gem = element("span", "st-gem st-gem--lg");
  gem.append(icon(key, rank, 44));
  head.append(gem, titleBlock);
  parts.push(head);

  if (mode === "sheet" && stigma.levels.length > 1) {
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
      button.disabled = installed && value > max;
      button.addEventListener("click", () => setRank(key, value));
      ranks.append(button);
    });
    parts.push(ranks);
  } else if (stigma.levels.length > 1) {
    parts.push(element("p", "stigma-links", `Ранг ${roman(rank)} з ${stigma.levels.length} · ${stigma.levels[rank - 1]} рівень`));
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
    String(stage.text).split(/\n+/).filter(Boolean).forEach((line) => block.append(element("p", "", line.trim())));
    const table = element("dl", "stigma-costs");
    stage.rows.forEach((item) => table.append(row(item.label, item.value)));
    block.append(table);
    parts.push(block);
  });

  const price = element("dl", "stigma-costs stigma-price");
  price.append(row("Осколки стигм", formatNumber(stigma.shards?.[rank - 1] ?? 0)));
  if (stigma.abyss?.[rank - 1]) price.append(row("Очки Безодні", formatNumber(stigma.abyss[rank - 1])));
  parts.push(price);

  if (mode === "tooltip") {
    const hint = installed ? "Клік — прибрати зі збірки" : max ? (stigma.type === ADVANCED && !build.requirementsMet(key) ? "Клік — додати разом із потрібними" : "Клік — додати в збірку") : "";
    if (hint) parts.push(element("p", "st-tooltip-hint", hint));
  } else {
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
  }
  container.replaceChildren(...parts);
}

// ---------- Оновлення ----------

function renderSetup() {
  ui.classes.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.classId === build.classId)));
  ui.race.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.race === build.race)));
  ui.level.value = String(build.level);
  ui.className.textContent = text.className(build.classId);
  ui.crest.className = `st-class-icon st-class-icon--${build.classId}`;
}

// Адресу не чіпаємо, доки людина нічого не змінила: чисте посилання лишається чистим,
// а код з'являється, лише коли в збірці є стигми.
function save() {
  const url = shareUrl();
  if (url !== window.location.href.replace(/#$/, "")) window.history.replaceState(null, "", url);
  writePreference(SAVE_KEY, build.encode());
}

function update({ initial = false } = {}) {
  const hadTooltip = tooltip.active;
  const focus = focusedControl(root, FOCUS_ZONES);
  tooltip.hide();
  if (!initial) save();
  renderSetup();
  renderStats();
  renderSlots();
  renderNormal();
  renderTrees();
  if (ui.sheet.open && sheetKey) renderDetails(ui.sheetBody, sheetKey, "sheet");
  refocus(focus);
  if (hadTooltip) tooltip.restore();
}

const tooltip = createTooltip({ root, node: ui.tooltip, render: (node, key) => renderDetails(node, key, "tooltip") });
initHeader();
setupControls();
update({ initial: true });
