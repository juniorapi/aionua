// Збирання: ресурси за расою, пошук і координати [pos:…] для чату гри.
import { plural, readPreference, writePreference } from "../format.js";
import { copyText, element, formatNumber, prefersReducedMotion } from "./common.js";

const RACES = [
  ["elyos", "Елійці"],
  ["asmodians", "Асмодіани"],
];
const RACE_KEY = "aionua-v2-race";
const SPOTS = { one: "точка", few: "точки", many: "точок", other: "точки" };
const RESOURCES = { one: "ресурс", few: "ресурси", many: "ресурсів", other: "ресурсу" };
// На вузькому екрані одна колонка: координати розкриваються під вибраним ресурсом.
const STACKED = window.matchMedia("(max-width: 1180px)");
// Короткий список (матеріали крафту) видно цілком, пошук там зайвий.
const SEARCH_MIN_ENTRIES = 9;

// «дудник+шери» -> «дудник + шери»: так назви з кількох трав легше читати.
function displayName(name) {
  return name.replace(/\s*\+\s*/g, " + ");
}

function searchText(entry) {
  const level = entry.level === undefined ? "" : ` рів. ${entry.level} рів.${entry.level}`;
  return `${entry.name} ${entry.region ?? ""}${level}`.toLocaleLowerCase("uk");
}

function levelText(entry) {
  return entry.level === undefined ? "" : `рів. ${entry.level}`;
}

/**
 * races: { elyos: [{ name, spots, level?, region? }], asmodians: [...] }.
 * headingLevel — рівень заголовків регіонів і панелі координат у структурі сторінки.
 */
export function renderGathering(root, races, { headingLevel = 2, idPrefix = "gather" } = {}) {
  const heading = `h${headingLevel}`;
  const saved = readPreference(RACE_KEY);
  let race = saved && Object.hasOwn(races, saved) ? saved : RACES[0][0];
  let selected = null;
  let statusTimer = 0;

  const controls = element("div", "gather-controls");
  const raceGroup = element("div", "segmented");
  raceGroup.setAttribute("role", "group");
  raceGroup.setAttribute("aria-label", "Раса");
  const raceButtons = RACES.map(([id, label]) => {
    const button = element("button", "", label);
    button.type = "button";
    button.dataset.race = id;
    raceGroup.append(button);
    return button;
  });

  const search = element("label", "search-field search-field--sm");
  search.innerHTML = '<svg aria-hidden="true"><use href="#i-search"/></svg>';
  const searchLabel = element("span", "visually-hidden", "Пошук ресурсу");
  const searchInput = element("input");
  Object.assign(searchInput, {
    type: "search",
    placeholder: "Назва, локація чи рівень",
    autocomplete: "off",
    spellcheck: false,
  });
  search.append(searchLabel, searchInput);

  const summary = element("p", "meta");
  summary.setAttribute("aria-live", "polite");
  controls.append(raceGroup, search, summary);

  const list = element("div", "gather-list");

  const output = element("aside", "panel gather-output");
  const outputTitle = element(heading, "", "Оберіть ресурс");
  outputTitle.id = `${idPrefix}-output-title`;
  output.setAttribute("aria-labelledby", outputTitle.id);
  const outputMeta = element("p", "meta", "Натисніть на ресурс у списку, і тут з'являться його координати.");
  const spotsLabel = element("label", "visually-hidden", "Координати для чату гри");
  spotsLabel.htmlFor = `${idPrefix}-spots`;
  const spots = element("textarea", "spots");
  spots.id = `${idPrefix}-spots`;
  spots.readOnly = true;
  spots.spellcheck = false;
  // Кожна точка — окремий рядок, тож не переносимо: інакше межі між точками губляться.
  spots.wrap = "off";
  const copy = element("button", "btn btn-primary", "Копіювати координати");
  copy.type = "button";
  copy.disabled = true;
  const status = element("p", "copy-status");
  status.setAttribute("role", "status");
  const hint = element("p", "tool-hint", "Рядок [pos:…] у чаті гри стає посиланням на точку мапи.");
  output.append(outputTitle, outputMeta, spotsLabel, spots, copy, status, hint);

  const layout = element("div", "gather-body");
  layout.append(list, output);
  root.replaceChildren(controls, layout);

  function select(entry, button) {
    selected = entry;
    list.querySelectorAll(".gather-item[aria-pressed='true']").forEach((item) => item.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    outputTitle.textContent = displayName(entry.name);
    outputMeta.textContent = [entry.region, levelText(entry), `${formatNumber(entry.spots.length)} ${plural(entry.spots.length, SPOTS)}`]
      .filter(Boolean)
      .join(" · ");
    spots.value = entry.spots.join("\n");
    spots.scrollTop = 0;
    copy.disabled = false;
    setStatus("");
    placeOutput();
    if (STACKED.matches) output.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
  }

  // Широкий екран: панель праворуч і завжди видна. Вузький: панель іде одразу за
  // вибраним ресурсом, а поки нічого не вибрано, її немає.
  function placeOutput() {
    const button = selected ? list.querySelector(".gather-item[aria-pressed='true']") : null;
    const inline = STACKED.matches && Boolean(button);
    if (inline) button.after(output);
    else if (output.parentElement !== layout) layout.append(output);
    output.hidden = STACKED.matches && !button;
    output.classList.toggle("is-inline", inline);
  }

  function clearSelection() {
    selected = null;
    outputTitle.textContent = "Оберіть ресурс";
    outputMeta.textContent = "Натисніть на ресурс у списку, і тут з'являться його координати.";
    spots.value = "";
    copy.disabled = true;
    setStatus("");
    placeOutput();
  }

  function setStatus(text, isError = false) {
    window.clearTimeout(statusTimer);
    status.textContent = text;
    status.classList.toggle("is-error", isError);
    if (text && !isError) statusTimer = window.setTimeout(() => { status.textContent = ""; }, 4000);
  }

  function itemButton(entry) {
    const button = element("button", "gather-item");
    button.type = "button";
    button.setAttribute("aria-pressed", String(entry === selected));
    if (entry.level !== undefined) button.append(element("span", "gather-level", levelText(entry)));
    button.append(
      element("span", "gather-name", displayName(entry.name)),
      element("span", "gather-count", `${formatNumber(entry.spots.length)} ${plural(entry.spots.length, SPOTS)}`),
    );
    button.addEventListener("click", () => select(entry, button));
    return button;
  }

  function renderList() {
    const entries = races[race] ?? [];
    const terms = searchInput.value.toLocaleLowerCase("uk").split(/\s+/).filter(Boolean);
    const visible = entries.filter((entry) => {
      const text = searchText(entry);
      return terms.every((term) => text.includes(term));
    });

    const plain = entries.every((entry) => entry.level === undefined);
    list.classList.toggle("gather-list--plain", plain);
    search.hidden = entries.length < SEARCH_MIN_ENTRIES;
    searchInput.placeholder = plain ? "Назва ресурсу" : "Назва, локація чи рівень";

    // Регіони в порядку першої появи: дані вже відсортовані за рівнем.
    const regions = new Map();
    visible.forEach((entry) => {
      const key = entry.region ?? "";
      if (!regions.has(key)) regions.set(key, []);
      regions.get(key).push(entry);
    });

    const fragment = document.createDocumentFragment();
    let index = 0;
    regions.forEach((group, region) => {
      const block = element("div", "gather-group");
      if (region) {
        const title = element(heading, "gather-region", region);
        title.id = `${idPrefix}-region-${race}-${index}`;
        block.setAttribute("role", "group");
        block.setAttribute("aria-labelledby", title.id);
        block.append(title);
      }
      group.forEach((entry) => block.append(itemButton(entry)));
      fragment.append(block);
      index += 1;
    });
    list.replaceChildren(fragment);

    if (visible.length === 0) {
      list.append(element("p", "empty-note", "Нічого не знайдено. Спробуйте іншу назву чи рівень."));
    }
    summary.textContent = terms.length
      ? `Знайдено ${formatNumber(visible.length)} з ${formatNumber(entries.length)}`
      : `${formatNumber(entries.length)} ${plural(entries.length, RESOURCES)}`;
    // Список перебудовано: панель, що стояла під ресурсом, треба поставити знову.
    placeOutput();
  }

  function setRace(next) {
    race = next;
    raceButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.race === race)));
    writePreference(RACE_KEY, race);
    clearSelection();
    renderList();
  }

  raceButtons.forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.race !== race) setRace(button.dataset.race);
  }));
  searchInput.addEventListener("input", renderList);
  STACKED.addEventListener("change", placeOutput);
  copy.addEventListener("click", async () => {
    if (!selected) return;
    const copied = await copyText(spots.value, spots);
    if (copied) {
      setStatus(`Скопійовано: ${formatNumber(selected.spots.length)} ${plural(selected.spots.length, SPOTS)}`);
    } else {
      spots.focus();
      spots.select();
      setStatus("Не вдалося скопіювати. Текст виділено: натисніть Ctrl+C.", true);
    }
  });

  setRace(race);
}
