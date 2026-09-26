// Калькулятор стигм 4.6. Дані — зі старого калькулятора (stigma/js/*.js), які сторінка
// підключає звичайними скриптами до цього модуля: stigmas, stigmaValues і lang.
//
// Вигляд — як вікно стигм у грі: дошка слотів, список звичайних стигм поруч,
// два дерева покращених під ними. Рамки слотів, значки класів і рас — зі старого
// калькулятора (stigma/img).
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

const ICONS = "../../stigma/icons/skills/";
const SAVE_KEY = "aionua-v2-stigma";
const RACE_NAMES = { pc_light: "Елійці", pc_dark: "Асмодіани" };
const STIGMAS = { one: "стигма", few: "стигми", many: "стигм", other: "стигми" };
// Миша: клік одразу ставить чи прибирає стигму, наведення показує підказку.
// Дотик: натискання відкриває картку з описом і кнопкою.
const POINTER = window.matchMedia("(hover: hover) and (pointer: fine)");

const data = window.stigmas;
const text = createText(window.lang, window.stigmaValues);
const root = document.querySelector("[data-stigma-app]");
const ui = {
  classes: root.querySelector("[data-classes]"),
  className: root.querySelector("[data-class-name]"),
  race: root.querySelector("[data-race]"),
  level: root.querySelector("[data-level]"),
  status: root.querySelector("[data-status]"),
  slots: root.querySelector("[data-slots]"),
  normal: root.querySelector("[data-normal]"),
  trees: root.querySelector("[data-trees]"),
  title: root.querySelector("[data-title]"),
  counts: root.querySelector("[data-counts]"),
  costs: root.querySelector("[data-costs]"),
  installed: root.querySelector("[data-installed]"),
  link: root.querySelector("[data-link]"),
  tooltip: root.querySelector("[data-tooltip]"),
  sheet: root.querySelector("[data-sheet]"),
  sheetBody: root.querySelector("[data-sheet-body]"),
};

let build = loadBuild();
let sheetKey = null;
let tooltipTarget = null;
const previewRanks = new Map();
let statusTimer = 0;

function loadBuild() {
  const code = window.location.hash.slice(1) || readPreference(SAVE_KEY) || "";
  return (code && StigmaBuild.decode(data, code)) || new StigmaBuild(data);
}

const name = (key) => text.name(key);
const quoted = (keys) => keys.map((key) => `«${name(key)}»`).join(", ");

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
  update();
}

function removeStigma(key) {
  const removed = build.remove(key);
  if (!removed.length) return;
  const others = removed.filter((item) => item !== key);
  announce(others.length ? `Прибрано «${name(key)}», а з нею: ${quoted(others)}.` : `Прибрано «${name(key)}».`);
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
  sheetKey = key;
  renderDetails(ui.sheetBody, key, "sheet");
  if (!ui.sheet.open) ui.sheet.showModal();
}

function onStigmaClick(key) {
  if (POINTER.matches) {
    toggle(key);
    if (tooltipTarget?.isConnected) showTooltip(tooltipTarget, key);
  } else {
    openSheet(key);
  }
}

// ---------- Підказка біля курсора ----------

function showTooltip(target, key) {
  tooltipTarget = target;
  renderDetails(ui.tooltip, key, "tooltip");
  ui.tooltip.hidden = false;
  const box = target.getBoundingClientRect();
  const tip = ui.tooltip.getBoundingClientRect();
  let left = box.right + 12;
  if (left + tip.width > window.innerWidth - 8) left = box.left - tip.width - 12;
  let top = box.top;
  if (top + tip.height > window.innerHeight - 8) top = window.innerHeight - tip.height - 8;
  ui.tooltip.style.left = `${Math.max(8, left)}px`;
  ui.tooltip.style.top = `${Math.max(8, top)}px`;
}

function hideTooltip() {
  tooltipTarget = null;
  ui.tooltip.hidden = true;
}

// ---------- Налаштування персонажа ----------

function setupControls() {
  ui.classes.replaceChildren(...CLASS_ORDER.map((classId) => {
    const button = element("button", "st-class");
    button.type = "button";
    button.dataset.classId = classId;
    const badge = element("span", `st-class-icon st-class-icon--${classId}`);
    badge.setAttribute("aria-hidden", "true");
    button.append(badge, element("span", "", text.className(classId)));
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
    const button = element("button", "st-race");
    button.type = "button";
    button.dataset.race = race;
    const emblem = element("span", `st-race-icon st-race-icon--${race}`);
    emblem.setAttribute("aria-hidden", "true");
    button.append(emblem, element("span", "", RACE_NAMES[race]));
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
    const copied = await copyText(ui.link.value, ui.link);
    announce(copied ? "Посилання на збірку скопійовано." : "Не вдалося скопіювати: виділіть посилання й натисніть Ctrl+C.", !copied);
  });
  root.querySelector("[data-reset]").addEventListener("click", () => {
    build.reset();
    announce("Збірку очищено.");
    update();
  });
  ui.link.addEventListener("focus", () => ui.link.select());

  // Підказка: наведення миші або фокус з клавіатури на будь-яку стигму.
  root.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse" || !POINTER.matches) return;
    const target = event.target.closest("[data-key]");
    if (target && target !== tooltipTarget) showTooltip(target, target.dataset.key);
  });
  root.addEventListener("pointerout", (event) => {
    const target = event.target.closest("[data-key]");
    if (target && !target.contains(event.relatedTarget)) hideTooltip();
  });
  root.addEventListener("focusin", (event) => {
    const target = event.target.closest?.("[data-key]");
    if (target && POINTER.matches) showTooltip(target, target.dataset.key);
  });
  root.addEventListener("focusout", hideTooltip);
  window.addEventListener("scroll", hideTooltip, { passive: true });

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

// ---------- Дошка ----------

function stigmaIcon(key, className) {
  const stigma = build.get(key);
  const installed = build.has(key);
  const max = build.maxRank(key);
  const rank = shownRank(key);
  const button = element("button", className);
  button.type = "button";
  button.dataset.key = key;
  button.dataset.state = installed ? "installed" : max ? "available" : "locked";
  button.append(icon(key, rank));
  if (!installed && !max) button.append(element("span", "st-lock", String(stigma.levels[0])));
  const state = installed ? `у збірці, ранг ${roman(rank)}` : max ? "можна додати" : `з ${stigma.levels[0]} рівня`;
  button.setAttribute("aria-label", `${name(key)}: ${state}`);
  button.addEventListener("click", () => onStigmaClick(key));
  return button;
}

function renderSlots() {
  const cells = [];
  // Як у грі: дві колонки звичайних слотів і дві покращених, по три в ряд.
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      const advanced = column >= 2;
      const position = row * 2 + (column % 2);
      const index = advanced ? SLOT_COUNT + position : position;
      const unlock = (advanced ? ADVANCED_SLOT_LEVELS : NORMAL_SLOT_LEVELS)[position];
      const slot = build.slots[index];
      const cell = element("li", "st-slot");
      cell.dataset.kind = advanced ? "advanced" : "normal";
      if (unlock > build.level) {
        cell.dataset.state = "locked";
        cell.append(element("span", "st-slot-level", `${unlock}`));
        cell.setAttribute("aria-label", `${advanced ? "Покращений" : "Звичайний"} слот, відкривається з ${unlock} рівня`);
      } else if (slot) {
        cell.dataset.state = "filled";
        cell.append(stigmaIcon(slot.key, "st-slot-icon"));
      } else {
        cell.dataset.state = "empty";
        cell.setAttribute("aria-label", `${advanced ? "Покращений" : "Звичайний"} слот, вільний`);
      }
      cells.push(cell);
    }
  }
  ui.slots.replaceChildren(...cells);
}

function renderNormal() {
  // Як у старому калькуляторі: поставлені стигми зникають зі списку й стоять у слотах.
  const keys = build.normalKeys().filter((key) => !build.has(key));
  ui.normal.replaceChildren(...keys.map((key) => stigmaIcon(key, "st-icon")));
  if (!keys.length) ui.normal.append(element("p", "st-empty", "Усі звичайні стигми вже в збірці."));
}

function treeNode(node) {
  const branch = element("div", "st-node");
  if (node.children.length) {
    const children = element("div", "st-children");
    children.append(...node.children.map(treeNode));
    branch.append(children);
  }
  branch.append(stigmaIcon(node.key, "st-icon"));
  return branch;
}

function renderTrees() {
  ui.trees.replaceChildren(...build.trees().map((tree) => {
    const wrap = element("div", "st-tree");
    wrap.setAttribute("aria-label", `Гілка: ${name(tree.key)}`);
    wrap.setAttribute("role", "group");
    wrap.append(treeNode(tree));
    return wrap;
  }));
}

// ---------- Бічна панель ----------

function renderSide() {
  ui.title.textContent = `${text.className(build.classId)}, ${build.level} рівень`;
  const counts = build.counts();
  ui.counts.replaceChildren(
    countCard(`${counts.normal.used}/${counts.normal.allowed}`, "Звичайні", "normal"),
    countCard(`${counts.advanced.used}/${counts.advanced.allowed}`, "Покращені", "advanced"),
  );
  const cost = build.cost();
  ui.costs.replaceChildren(
    costRow("shard", "Осколки стигм", cost.shards),
    costRow("abyss", "Очки Безодні", cost.abyss),
  );

  const rows = build.installed().map(({ key, rank }) => {
    const stigma = build.get(key);
    const row = element("li", "st-row");
    const label = element("span", "st-row-name");
    label.append(name(key));
    if (stigma.type === ADVANCED) label.append(element("small", "", "покращена"));
    const rankSelect = element("select", "select select--sm st-row-rank");
    rankSelect.setAttribute("aria-label", `Ранг: ${name(key)}`);
    for (let value = 1; value <= build.maxRank(key); value += 1) {
      rankSelect.append(new Option(`${roman(value)} · ${stigma.levels[value - 1]}`, String(value)));
    }
    rankSelect.value = String(rank);
    rankSelect.disabled = build.maxRank(key) < 2;
    rankSelect.addEventListener("change", () => setRank(key, Number(rankSelect.value)));
    const remove = element("button", "st-row-remove", "×");
    remove.type = "button";
    remove.setAttribute("aria-label", `Прибрати: ${name(key)}`);
    remove.addEventListener("click", () => removeStigma(key));
    row.append(icon(key, rank, 32), label, rankSelect, remove);
    return row;
  });
  if (rows.length) ui.installed.replaceChildren(...rows);
  else ui.installed.replaceChildren(element("li", "st-empty", "Стигми не вибрані. Клік по стигмі на дошці додає її."));
  ui.link.value = window.location.href;
}

function countCard(value, label, kind) {
  const card = element("div", `st-count st-count--${kind}`);
  card.append(element("strong", "", value), element("span", "", label));
  return card;
}

function costRow(kind, label, amount) {
  const row = element("div", "st-cost");
  const term = element("dt");
  const glyph = element("span", `st-cost-icon st-cost-icon--${kind}`);
  glyph.setAttribute("aria-hidden", "true");
  term.append(glyph, label);
  row.append(term, element("dd", "", formatNumber(amount)));
  return row;
}

// ---------- Опис стигми ----------

function requirementList(key) {
  return (build.get(key).require ?? []).map((requirement) => build.resolveRequirement(requirement));
}

function neededFor(key) {
  return Object.keys(build.list).filter((candidate) => build.fitsRace(candidate) && requirementList(candidate).includes(key));
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
  const frame = element("span", "st-details-icon");
  frame.append(icon(key, rank, 44));
  head.append(frame, titleBlock);
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
    stage.rows.forEach((row) => {
      const item = element("div");
      item.append(element("dt", "", row.label), element("dd", "", row.value));
      table.append(item);
    });
    block.append(table);
    parts.push(block);
  });

  const price = element("dl", "stigma-price");
  price.append(costRow("shard", "Осколки стигм", stigma.shards?.[rank - 1] ?? 0));
  if (stigma.abyss?.[rank - 1]) price.append(costRow("abyss", "Очки Безодні", stigma.abyss[rank - 1]));
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
  ui.className.textContent = text.className(build.classId);
  ui.race.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.race === build.race)));
  ui.level.value = String(build.level);
}

function save() {
  const code = build.encode();
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${code}`);
  writePreference(SAVE_KEY, code);
}

function update() {
  hideTooltip();
  save();
  renderSetup();
  renderSlots();
  renderNormal();
  renderTrees();
  renderSide();
  if (ui.sheet.open && sheetKey) renderDetails(ui.sheetBody, sheetKey, "sheet");
}

initHeader();
setupControls();
update();
