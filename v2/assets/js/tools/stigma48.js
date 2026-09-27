// Калькулятор стигм 4.8. Дані класів і переклад — файли старого калькулятора (stigmas/js/*.js):
// кожен клас лежить в окремому файлі, тож сторінка завантажує потрібний сама.
import { plural, readPreference, writePreference } from "../format.js";
import { initHeader } from "../header.js";
import { copyText, element, loadData, showLoadError } from "./common.js";
import {
  CLASS_ORDER,
  GRADE_LEVEL,
  GREATER,
  HIDDEN,
  LINKS,
  MAJOR,
  MAX_ENCHANT,
  MAX_LEVEL,
  MIN_LEVEL,
  NORMAL,
  SLOTS,
  STIGMA_COUNT,
  StigmaBuild48,
  gradeOf,
} from "./stigma48-model.js";
import { GRADE_NAMES, createText48 } from "./stigma48-text.js";
import { POINTER, createAnnouncer, createTooltip, focusedControl, jumpTo, refocus } from "./stigma-ui.js";

const DATA = "../../stigmas/js/";
const ICONS = "../../stigmas/img/";
const SAVE_KEY = "aionua-v2-stigma48";
const DEFAULT_CLASS = CLASS_ORDER[0];
// Англійські назви класів — ключі перекладу в stigmas/js/lang_uk.js.
const TITLES = {
  templar: "Templar", gladiator: "Gladiator", ranger: "Ranger", assassin: "Assassin", sorcerer: "Sorcerer",
  spiritmaster: "Spiritmaster", chanter: "Chanter", cleric: "Cleric", gunner: "Gunner", aethertech: "Aethertech",
  songweaver: "Songweaver",
};
// Значки класів — спільний спрайт калькулятора 4.6.
const SPRITE = {
  templar: "knight", gladiator: "fighter", ranger: "ranger", assassin: "assassin", sorcerer: "wizard",
  spiritmaster: "elementalist", chanter: "chanter", cleric: "priest", gunner: "gunner", songweaver: "bard",
  aethertech: "rider",
};
const KIND = { [MAJOR]: "gold", [GREATER]: "blue", [NORMAL]: "green", [HIDDEN]: "violet" };
const SLOT_NAMES = { [MAJOR]: "Головний слот", [GREATER]: "Великий слот", [NORMAL]: "Слот" };
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const GROUPS = [
  { grade: MAJOR, title: "Головні", numbers: range(1, 2) },
  { grade: GREATER, title: "Великі", numbers: range(3, 8) },
  { grade: NORMAL, title: "Звичайні", numbers: range(9, STIGMA_COUNT) },
];
// Знахідний відмінок: «знято 1 стигму».
const STIGMAS = { one: "стигму", few: "стигми", many: "стигм", other: "стигми" };
const FOCUS_ZONES = "[data-pool], [data-ring], [data-links]";

const root = document.querySelector("[data-stigma48-app]");
const ui = {
  classes: root.querySelector("[data-classes]"),
  className: root.querySelector("[data-class-name]"),
  crest: root.querySelector("[data-class-crest]"),
  level: root.querySelector("[data-level]"),
  stats: root.querySelector("[data-stats]"),
  status: root.querySelector("[data-status]"),
  sheetStatus: root.querySelector("[data-sheet-status]"),
  ring: root.querySelector("[data-ring]"),
  pool: root.querySelector("[data-pool]"),
  links: root.querySelector("[data-links]"),
  sections: {
    pool: root.querySelector('[data-section="pool"]'),
    links: root.querySelector('[data-section="links"]'),
  },
  tooltip: root.querySelector("[data-tooltip]"),
  sheet: root.querySelector("[data-sheet]"),
  sheetBody: root.querySelector("[data-sheet-body]"),
};

const announce = createAnnouncer([ui.status, ui.sheetStatus]);
const classData = new Map();
const previewEnchant = new Map();
let build = null;
let skills = [];
let text = null;
let classNames = {};
let icons = {};
let sheetKey = null;
let loading = 0;
let tooltip = null;

// ---------- Дані ----------

async function fetchCode(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

// Файли старого калькулятора — звичайні скрипти з глобальними var. Виконуємо їх в окремій
// функції й забираємо лише потрібне; мовний файл без STIGMAS_LANG = "uk" не чіпає сторінку.
async function loadDictionaries() {
  const code = await fetchCode(`${DATA}lang_uk.js`);
  return new Function("STIGMAS_LANG", `${code}\nreturn { SKILL_UK, STAT_UK, UI_UK };`)("en");
}

function loadClass(classId) {
  if (!classData.has(classId)) {
    const request = fetchCode(`${DATA}${classId}.js`).then((code) => new Function(`${code}\nreturn skill;`)());
    request.catch(() => classData.delete(classId));
    classData.set(classId, request);
  }
  return classData.get(classId);
}

// #cleric/jbghfd:65 — клас і код старого калькулятора; без класу — код для збереженого класу.
function parseHash(hash) {
  const raw = decodeURIComponent(String(hash ?? "").replace(/^#/, ""));
  if (!raw) return null;
  const [first, code = ""] = raw.split("/");
  return TITLES[first] ? { classId: first, code } : { classId: null, code: raw };
}

function saved() {
  const state = parseHash(readPreference(SAVE_KEY) || "");
  return state ?? { classId: null, code: "" };
}

// ---------- Дрібниці ----------

const className = (classId) => classNames[TITLES[classId]] ?? classId;
const name = (number) => text.name(skills[number - 1]);
const quoted = (numbers) => (numbers.length <= 2
  ? numbers.map((number) => `«${name(number)}»`).join(" і ")
  : `${numbers.length} ${plural(numbers.length, STIGMAS)}`);

function shareUrl() {
  const base = `${window.location.origin}${window.location.pathname}`;
  if (build.installed().length) return `${base}#${build.classId}/${build.encode()}`;
  return build.classId === DEFAULT_CLASS ? base : `${base}#${build.classId}`;
}

function icon(number, size = 40) {
  const image = element("img", "st-img");
  image.src = `${ICONS}${build.classId}/${icons[build.classId][number - 1]}`;
  image.alt = "";
  image.width = size;
  image.height = size;
  image.decoding = "async";
  return image;
}

function enchantShown(number) {
  if (gradeOf(number) === HIDDEN) {
    const linked = build.linked();
    return linked?.number === number ? linked.enchant : 0;
  }
  return build.has(number) ? build.enchantOf(number) : (previewEnchant.get(number) ?? 0);
}

// ---------- Дії ----------

function slotsMessage(number) {
  const grade = gradeOf(number);
  if (grade === MAJOR) return "Головний слот уже зайнятий: головна стигма стає лише в нього.";
  if (grade === GREATER) return "Немає вільного великого чи головного слота.";
  return "Усі відкриті слоти зайняті.";
}

function addStigma(number) {
  const grade = gradeOf(number);
  const result = build.add(number, previewEnchant.get(number) ?? 0);
  if (result.ok) announce(`Додано «${name(number)}».`);
  else if (result.reason === "level") announce(`«${name(number)}» — ${GRADE_NAMES[grade].toLowerCase()} стигма, її можна носити з ${GRADE_LEVEL[grade]} рівня.`, true);
  else announce(slotsMessage(number), true);
  update();
}

function removeStigma(number) {
  if (!build.remove(number)) return;
  announce(`Прибрано «${name(number)}».`);
  update();
}

function applyCombo(variant) {
  const result = build.applyCombo(variant);
  const hidden = name(STIGMA_COUNT + variant);
  if (!result.ok) {
    announce(result.reason === "level" ? `«${hidden}» — з 55 рівня: тоді відкривається головний слот.` : "Цю комбінацію не вдалося зібрати.", true);
  } else {
    const removed = result.removed.length ? ` Знято: ${quoted(result.removed)}.` : "";
    announce(`Зібрано комбінацію для «${hidden}».${removed}`);
  }
  update();
}

function toggle(number) {
  if (gradeOf(number) === HIDDEN) {
    const variant = number - STIGMA_COUNT;
    if (variant <= 2 && build.linked()?.number !== number) applyCombo(variant);
    return;
  }
  if (build.has(number)) removeStigma(number);
  else addStigma(number);
}

function setEnchant(number, value) {
  if (build.has(number)) {
    build.setEnchant(number, value);
    update();
  } else {
    previewEnchant.set(number, value);
    if (ui.sheet.open) renderDetails(ui.sheetBody, String(number), "sheet");
  }
}

function openSheet(number) {
  if (String(number) !== sheetKey) ui.sheetStatus.textContent = "";
  sheetKey = String(number);
  renderDetails(ui.sheetBody, sheetKey, "sheet");
  if (!ui.sheet.open) ui.sheet.showModal();
}

function onStigmaClick(number) {
  if (POINTER.matches) toggle(number);
  else openSheet(number);
}

async function switchClass(classId) {
  if (classId === build.classId) return;
  const token = ++loading;
  root.setAttribute("aria-busy", "true");
  try {
    const list = await loadClass(classId);
    if (token !== loading) return;
    skills = list;
    build.setClass(classId);
    previewEnchant.clear();
    announce(`Клас: ${className(classId)}. Збірку почато заново.`);
    update();
  } catch {
    if (token === loading) announce("Не вдалося завантажити стигми класу. Спробуйте ще раз.", true);
  } finally {
    if (token === loading) root.removeAttribute("aria-busy");
  }
}

async function openHash() {
  const state = parseHash(window.location.hash);
  if (!state) return;
  const classId = state.classId ?? build.classId;
  const next = (state.code && StigmaBuild48.decode(state.code, { classId })) || new StigmaBuild48({ classId, level: build.level });
  if (classId === build.classId && next.encode() === build.encode()) return;
  const token = ++loading;
  try {
    const list = await loadClass(classId);
    if (token !== loading) return;
    skills = list;
    build = next;
    update();
  } catch {
    if (token === loading) announce("Не вдалося завантажити стигми класу. Спробуйте ще раз.", true);
  }
}

// ---------- Налаштування ----------

function setupControls() {
  ui.classes.replaceChildren(...CLASS_ORDER.map((classId) => {
    const button = element("button", "st-class");
    button.type = "button";
    button.dataset.classId = classId;
    button.title = className(classId);
    button.setAttribute("aria-label", className(classId));
    const badge = element("span", `st-class-icon st-class-icon--${SPRITE[classId]}`);
    badge.setAttribute("aria-hidden", "true");
    button.append(badge);
    button.addEventListener("click", () => switchClass(classId));
    return button;
  }));

  for (let level = MAX_LEVEL; level >= MIN_LEVEL; level -= 1) ui.level.append(new Option(`${level}`, String(level)));
  ui.level.addEventListener("change", () => {
    const removed = build.setLevel(ui.level.value);
    if (removed.length) announce(`Знято ${removed.length} ${plural(removed.length, STIGMAS)}: на ${build.level} рівні для них немає слота.`);
    update();
  });

  root.querySelector("[data-copy]").addEventListener("click", async () => {
    const copied = await copyText(shareUrl(), null);
    announce(copied ? "Посилання на збірку скопійовано." : "Не вдалося скопіювати посилання.", !copied);
  });
  root.querySelector("[data-reset]").addEventListener("click", () => {
    build.reset();
    previewEnchant.clear();
    announce("Збірку очищено.");
    update();
  });

  ui.sheet.addEventListener("click", (event) => {
    if (event.target === ui.sheet) ui.sheet.close();
  });
  root.querySelector("[data-sheet-close]").addEventListener("click", () => ui.sheet.close());
  window.addEventListener("hashchange", openHash);
}

// ---------- Стигми ----------

function stigmaButton(number, className) {
  const grade = gradeOf(number);
  const installed = build.has(number);
  const hidden = grade === HIDDEN;
  const open = hidden ? build.level >= GRADE_LEVEL[HIDDEN] : build.fits(number);
  const button = element("button", className);
  button.type = "button";
  button.dataset.key = String(number);
  let state = "available";
  if (installed || (hidden && build.linked()?.number === number)) state = "installed";
  else if (!open) state = "locked";
  else if (!hidden && !build.canAdd(number)) state = "blocked";
  button.dataset.state = state;
  if (state === "locked") button.dataset.level = GRADE_LEVEL[grade];
  const gem = element("span", `st-gem s48-gem s48-gem--${KIND[grade]}`);
  gem.append(icon(number));
  button.append(gem);
  const label = {
    installed: hidden ? "відкрита" : `у збірці, +${build.enchantOf(number)}`,
    locked: `з ${GRADE_LEVEL[grade]} рівня`,
    blocked: "немає вільного слота",
    available: hidden ? "прихована стигма" : "можна додати",
  }[state];
  button.setAttribute("aria-label", `${name(number)}: ${label}`);
  // Другий клік подвійного кліку пропускаємо: після першого список уже зсунувся.
  button.addEventListener("click", (event) => {
    if (event.detail < 2) onStigmaClick(number);
  });
  return button;
}

// Кільце як у грі: головний слот угорі, великі — з боків, звичайні — внизу, прихована — в центрі.
function slotCell(index) {
  const slot = SLOTS[index];
  const cell = element("li", "st-cell s48-cell");
  cell.dataset.kind = KIND[slot.grade];
  cell.style.gridArea = slot.id;
  const frame = element("div", "st-cell-frame");
  cell.append(frame);
  const title = `${SLOT_NAMES[slot.grade]}, з ${slot.level} рівня`;

  if (!build.isOpen(index)) {
    cell.dataset.state = "locked";
    frame.append(element("span", "st-cell-note", `${slot.level}`));
    cell.setAttribute("aria-label", `${title}: ще закритий`);
    return cell;
  }
  const current = build.slots[index];
  if (!current) {
    cell.dataset.state = "empty";
    const add = element("button", "st-cell-add", "+");
    add.type = "button";
    add.setAttribute("aria-label", `${title}: вільний — вибрати стигму`);
    add.addEventListener("click", (event) => jumpTo(ui.sections.pool, event.detail === 0));
    frame.append(add);
    return cell;
  }

  cell.dataset.state = "filled";
  frame.append(stigmaButton(current.number, "st-cell-stigma"));
  const select = element("select", "st-cell-rank");
  select.setAttribute("aria-label", `Заточка: ${name(current.number)}`);
  for (let value = 0; value <= MAX_ENCHANT; value += 1) select.append(new Option(`+${value}`, String(value)));
  select.value = String(current.enchant);
  select.addEventListener("change", () => setEnchant(current.number, Number(select.value)));
  cell.append(select);
  return cell;
}

function linkedCell() {
  const cell = element("li", "st-cell s48-cell s48-linked");
  cell.dataset.kind = KIND[HIDDEN];
  cell.style.gridArea = "linked";
  const frame = element("div", "st-cell-frame");
  cell.append(frame);
  const linked = build.linked();
  if (!linked) {
    const locked = build.level < GRADE_LEVEL[HIDDEN];
    cell.dataset.state = locked ? "locked" : "empty";
    frame.append(element("span", "st-cell-note s48-linked-note", locked ? "55" : "?"));
    cell.append(element("span", "s48-linked-caption", "прихована"));
    const hint = locked ? "Прихована стигма: з 55 рівня" : "Прихована стигма: відкриється, коли зайняті всі шість слотів";
    cell.setAttribute("aria-label", hint);
    cell.title = hint;
    return cell;
  }
  cell.dataset.state = linked.charged ? "active" : "inactive";
  frame.append(stigmaButton(linked.number, "st-cell-stigma"));
  cell.append(element("span", "s48-linked-caption", linked.charged ? `+${linked.enchant}` : "не діє"));
  return cell;
}

function renderRing() {
  ui.ring.replaceChildren(...SLOTS.map((_, index) => slotCell(index)), linkedCell());
}

// Вибрана стигма переходить у слот і зникає зі списку, а прибрана — повертається.
function renderPool() {
  ui.pool.replaceChildren(...GROUPS.map((group) => {
    const section = element("div", "s48-group");
    section.dataset.kind = KIND[group.grade];
    const head = element("p", "s48-group-title", group.title);
    head.append(element("span", "s48-group-level", `з ${GRADE_LEVEL[group.grade]} рівня`));
    const list = element("div", "s48-group-list");
    const free = group.numbers.filter((number) => !build.has(number));
    if (free.length) list.append(...free.map((number) => stigmaButton(number, "st-stigma")));
    else list.append(element("p", "st-pool-empty", "Усі вже в слотах."));
    section.append(head, list);
    return section;
  }));
}

// Умови прихованої стигми: головна + будь-які дві великі з трьох; інакше — третя.
function renderLinks() {
  const linked = build.linked();
  const linkRow = (variant, formula) => {
    const number = STIGMA_COUNT + variant;
    const item = element("div", "s48-link");
    const active = linked?.variant === variant;
    item.classList.toggle("is-active", active);
    const result = element("div", "s48-link-result");
    result.append(element("p", "s48-link-name", name(number)));
    if (active) result.append(element("p", `s48-link-state${linked.charged ? " is-on" : ""}`, linked.charged ? `Діє, заточка +${linked.enchant}` : "Відкрита, але діє лише із зарядженими до +1 стигмами"));
    item.append(formula, result);
    if (variant <= 2) {
      const apply = element("button", "btn-ghost s48-apply", "Зібрати");
      apply.type = "button";
      apply.disabled = active || build.level < GRADE_LEVEL[HIDDEN];
      apply.setAttribute("aria-label", `Зібрати комбінацію для «${name(number)}»`);
      apply.addEventListener("click", () => applyCombo(variant));
      item.append(apply);
    }
    return item;
  };
  const op = (sign) => element("span", "s48-op", sign);
  const rows = LINKS[build.classId].map((combo, index) => {
    const formula = element("div", "s48-formula");
    formula.append(
      stigmaButton(combo.gold, "st-stigma"),
      op("+"),
      element("span", "s48-note", "дві з"),
      ...combo.blues.map((number) => stigmaButton(number, "st-stigma")),
      op("="),
      stigmaButton(STIGMA_COUNT + index + 1, "st-stigma"),
    );
    return linkRow(index + 1, formula);
  });
  const other = element("div", "s48-formula");
  other.append(element("span", "s48-note", "Будь-яка інша комбінація"), op("="), stigmaButton(STIGMA_COUNT + 3, "st-stigma"));
  ui.links.replaceChildren(...rows, linkRow(3, other));
}

function renderStats() {
  const counts = build.counts();
  const linked = build.linked();
  const items = [
    ["Слоти", `${counts.used}/${counts.open}`, "slots"],
    ["Прихована", linked ? name(linked.number) : "—", "linked"],
    ["Її заточка", linked ? (linked.charged ? `+${linked.enchant}` : "не діє") : "—", "enchant"],
  ];
  ui.stats.replaceChildren(...items.map(([label, value, kind]) => {
    const item = element("div", `st-stat st-stat--${kind}`);
    item.append(element("dt", "", label), element("dd", "", value));
    return item;
  }));
}

// ---------- Опис стигми ----------

function row(label, value) {
  const item = element("div");
  item.append(element("dt", "", label), element("dd", "", value));
  return item;
}

function renderDetails(container, key, mode) {
  const number = Number(key);
  const skill = skills[number - 1];
  if (!skill) {
    container.replaceChildren();
    return;
  }
  const grade = gradeOf(number);
  const hidden = grade === HIDDEN;
  const installed = build.has(number);
  const linked = build.linked();
  const enchant = enchantShown(number);
  const info = text.details(skill, { grade, level: build.level, enchant });
  const parts = [];

  const head = element("div", "stigma-details-head");
  const titleBlock = element("div");
  titleBlock.append(element("p", "stigma-details-title", enchant ? `${info.name} +${enchant}` : info.name));
  const badges = element("p", "stigma-badges");
  badges.append(element("span", `badge s48-badge s48-badge--${KIND[grade]}`, GRADE_NAMES[grade]));
  if (installed) badges.append(element("span", "badge badge-live", "У збірці"));
  if (hidden && linked?.number === number) badges.append(element("span", linked.charged ? "badge badge-live" : "badge", linked.charged ? "Діє" : "Не діє"));
  titleBlock.append(badges);
  const gem = element("span", `st-gem st-gem--lg s48-gem s48-gem--${KIND[grade]}`);
  gem.append(icon(number, 44));
  head.append(gem, titleBlock);
  parts.push(head);

  parts.push(element("p", "stigma-links", `${info.tag} · ${info.kind}`));
  if (info.available) parts.push(element("p", "stigma-links", `Ранг ${info.rank} з ${info.max} · з ${info.level} рівня`));
  else parts.push(element("p", "stigma-warning", `Доступна з ${info.level} рівня.`));

  if (mode === "sheet" && !hidden) {
    const values = element("div", "segmented stigma-ranks s48-enchants");
    values.setAttribute("role", "group");
    values.setAttribute("aria-label", "Заточка");
    for (let value = 0; value <= MAX_ENCHANT; value += 1) {
      const button = element("button", "", `+${value}`);
      button.type = "button";
      button.setAttribute("aria-pressed", String(value === enchant));
      button.addEventListener("click", () => setEnchant(number, value));
      values.append(button);
    }
    parts.push(values);
  }

  info.stages.forEach((stage) => {
    const block = element("div", "stigma-stage");
    if (stage.title) block.append(element("p", "stigma-stage-title", stage.title));
    stage.lines.forEach((line) => block.append(element("p", "", line)));
    const table = element("dl", "stigma-costs");
    stage.rows.forEach((item) => table.append(row(item.label, item.value)));
    block.append(table);
    parts.push(block);
  });
  if (info.rows.length) {
    const table = element("dl", "stigma-costs stigma-price");
    info.rows.forEach((item) => table.append(row(item.label, item.value)));
    parts.push(table);
  }
  if (info.condition) parts.push(element("p", "stigma-links", info.condition));
  if (info.effect) parts.push(element("p", "stigma-links", `Кожна заточка: ${info.effect}.`));
  if (hidden) parts.push(element("p", "stigma-links", "Заточка прихованої стигми — найменша з шести в слотах."));
  if (info.english) parts.push(element("p", "stigma-links s48-english", "Опис з англійських даних: у клієнті український текст належить іншій версії вміння."));

  const variant = number - STIGMA_COUNT;
  const canCombo = hidden && variant <= 2 && linked?.number !== number && build.level >= GRADE_LEVEL[HIDDEN];
  if (mode === "tooltip") {
    let hint = "";
    if (hidden) hint = canCombo ? "Клік — зібрати цю комбінацію" : "";
    else if (installed) hint = "Клік — прибрати зі збірки";
    else if (build.canAdd(number)) hint = "Клік — додати в збірку";
    if (hint) parts.push(element("p", "st-tooltip-hint", hint));
  } else if (hidden) {
    if (canCombo) {
      const action = element("button", "btn btn-primary stigma-action", "Зібрати цю комбінацію");
      action.type = "button";
      action.addEventListener("click", () => applyCombo(variant));
      parts.push(action);
    }
  } else {
    const action = installed
      ? element("button", "btn-ghost stigma-action", "Прибрати зі збірки")
      : element("button", "btn btn-primary stigma-action", "Додати в збірку");
    action.type = "button";
    action.disabled = !installed && !build.canAdd(number);
    action.addEventListener("click", () => {
      if (installed) removeStigma(number);
      else addStigma(number);
    });
    parts.push(action);
  }
  container.replaceChildren(...parts);
}

// ---------- Оновлення ----------

function renderSetup() {
  ui.classes.querySelectorAll("button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.classId === build.classId)));
  ui.level.value = String(build.level);
  ui.className.textContent = className(build.classId);
  ui.crest.className = `st-class-icon st-class-icon--${SPRITE[build.classId]}`;
}

// Адресу не чіпаємо, доки людина нічого не змінила: чисте посилання лишається чистим.
function save() {
  const url = shareUrl();
  if (url !== window.location.href.replace(/#$/, "")) window.history.replaceState(null, "", url);
  writePreference(SAVE_KEY, `${build.classId}/${build.encode()}`);
}

function update({ initial = false } = {}) {
  const hadTooltip = tooltip.active;
  const focus = focusedControl(root, FOCUS_ZONES);
  tooltip.hide();
  if (!initial) save();
  renderSetup();
  renderStats();
  renderRing();
  renderPool();
  renderLinks();
  if (ui.sheet.open && sheetKey) renderDetails(ui.sheetBody, sheetKey, "sheet");
  refocus(focus);
  if (hadTooltip) tooltip.restore();
}

async function start() {
  initHeader();
  const state = parseHash(window.location.hash) ?? saved();
  const classId = state.classId ?? DEFAULT_CLASS;
  try {
    const [dictionaries, iconMap, list] = await Promise.all([loadDictionaries(), loadData("icons.json"), loadClass(classId)]);
    text = createText48(dictionaries);
    classNames = dictionaries.UI_UK ?? {};
    icons = iconMap;
    skills = list;
  } catch {
    showLoadError(ui.pool);
    root.removeAttribute("aria-busy");
    return;
  }
  build = (state.code && StigmaBuild48.decode(state.code, { classId })) || new StigmaBuild48({ classId });
  tooltip = createTooltip({ root, node: ui.tooltip, render: (node, key) => renderDetails(node, key, "tooltip") });
  setupControls();
  update({ initial: true });
  root.removeAttribute("aria-busy");
}

start();
