// Калькулятор рецепта: вибір предмета, кількість крафтів, матеріали на один крафт і разом.
import { plural } from "../format.js";
import { assetUrl, createStepper, element, formatNumber, icon } from "./common.js";

const MAX_CRAFTS = 999;
const CRAFTS = { one: "крафт", few: "крафти", many: "крафтів", other: "крафта" };

function itemRow(item, perCraft, total) {
  const row = element("tr");
  const name = element("th");
  name.scope = "row";
  const label = element("span", "recipe-item");
  label.append(icon(item.icon), element("span", "", item.name));
  name.append(label);
  row.append(name, element("td", "num", formatNumber(perCraft)), element("td", "num total", formatNumber(total)));
  return row;
}

// Однакові назви в одному списку (два рецепти того самого сувою) розрізняємо
// матеріалом, якого немає в двійника, а за тих самих матеріалів — пропорцією.
function optionLabels(recipes) {
  const byName = new Map();
  recipes.forEach((recipe) => byName.set(recipe.name, [...(byName.get(recipe.name) ?? []), recipe]));
  return new Map(recipes.map((recipe) => {
    const twins = byName.get(recipe.name);
    if (twins.length === 1) return [recipe.id, recipe.name];
    const shared = new Set(twins.filter((twin) => twin !== recipe).flatMap((twin) => twin.materials.map((material) => material.name)));
    const own = recipe.materials.filter((material) => !shared.has(material.name));
    const hint = own.length
      ? own.at(-1).name.toLocaleLowerCase("uk")
      : `${recipe.materials.map((material) => material.quantity).join(" + ")} → ${recipe.output} шт.`;
    return [recipe.id, `${recipe.name} (${hint})`];
  }));
}

function tableHead() {
  const head = element("thead");
  const row = element("tr");
  [["Матеріал", ""], ["На 1 крафт", "num"], ["Разом", "num"]].forEach(([text, className]) => {
    const cell = element("th", className, text);
    cell.scope = "col";
    row.append(cell);
  });
  head.append(row);
  return head;
}

export function renderRecipeCalculator(calculator) {
  const prefix = `calc-${calculator.id}`;
  const [firstRecipe] = calculator.recipes;

  const section = element("section", "panel");
  section.id = calculator.id;
  section.setAttribute("aria-labelledby", `${prefix}-title`);

  const head = element("div", "panel-head");
  const title = element("h2", "panel-heading", calculator.title);
  title.id = `${prefix}-title`;
  const reset = element("button", "btn-ghost", "Скинути");
  reset.type = "button";
  head.append(title, reset);

  const controls = element("div", "recipe-controls");

  const pickField = element("div", "field");
  const pickLabel = element("label", "", calculator.label);
  pickLabel.htmlFor = `${prefix}-recipe`;
  const pick = element("div", "recipe-pick");
  const preview = icon(firstRecipe.icon, "item-icon item-icon--lg", 48);
  preview.loading = "eager";
  const select = element("select", "select");
  select.id = `${prefix}-recipe`;
  optionLabels(calculator.recipes).forEach((label, id) => select.append(new Option(label, id)));
  pick.append(preview, select);
  pickField.append(pickLabel, pick);

  const meta = element("p", "recipe-meta");
  const description = element("p", "recipe-desc");

  const quantityField = element("div", "field");
  const quantityLabel = element("label", "", "Кількість крафтів");
  quantityLabel.htmlFor = `${prefix}-quantity`;
  const quantity = createStepper({
    id: `${prefix}-quantity`,
    label: "Кількість крафтів",
    min: 1,
    max: MAX_CRAFTS,
    value: 1,
    onChange: update,
  });
  quantityField.append(quantityLabel, quantity.root);
  controls.append(pickField, meta, description, quantityField);

  const results = element("div", "recipe-results");
  const table = element("table", "recipe-table");
  const caption = element("caption", "visually-hidden");
  const body = element("tbody");
  const foot = element("tfoot");
  table.append(caption, tableHead(), body, foot);
  results.append(table);

  const layout = element("div", "recipe-body");
  layout.append(controls, results);
  section.append(head, layout);

  function update() {
    const recipe = calculator.recipes.find((candidate) => candidate.id === select.value) ?? firstRecipe;
    const crafts = quantity.value;

    preview.src = assetUrl(recipe.icon);
    meta.replaceChildren();
    if (recipe.profession) meta.append(element("span", "badge badge-gold", recipe.profession));
    meta.append(element("span", "", `За один крафт: ${formatNumber(recipe.output)} шт.`));
    description.textContent = recipe.description ?? "";
    description.hidden = !recipe.description;

    caption.textContent = `Матеріали на ${formatNumber(crafts)} ${plural(crafts, CRAFTS)}: ${recipe.name}`;
    body.replaceChildren(...recipe.materials.map(
      (material) => itemRow(material, material.quantity, material.quantity * crafts),
    ));

    const resultHead = element("tr");
    const resultLabel = element("th", "", "Результат крафту");
    resultLabel.colSpan = 3;
    resultLabel.scope = "colgroup";
    resultHead.append(resultLabel);
    foot.replaceChildren(resultHead, itemRow(recipe, recipe.output, recipe.output * crafts));
  }

  select.addEventListener("change", update);
  reset.addEventListener("click", () => {
    select.value = firstRecipe.id;
    quantity.set(1);
  });

  update();
  return section;
}
