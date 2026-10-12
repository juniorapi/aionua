// Калькулятор рецепта: вибір предмета, кількість крафтів, матеріали на один крафт і разом.
import { plural } from "../format.js";
import { isEnglish, tr } from "../i18n.js";
import { assetUrl, createStepper, element, formatNumber, icon } from "./common.js";

const MAX_CRAFTS = 999;
const CRAFTS = tr(
  { one: "крафт", few: "крафти", many: "крафтів", other: "крафта" },
  { one: "craft", other: "crafts" },
);

// Назва предмета мовою сайту: у data.json поруч з українською лежить англійська (nameEn).
function itemName(item) {
  return tr(item.name, item.nameEn ?? item.name);
}

function itemRow(item, perCraft, total) {
  const row = element("tr");
  const name = element("th");
  name.scope = "row";
  const label = element("span", "recipe-item");
  label.append(icon(item.icon), element("span", "", itemName(item)));
  name.append(label);
  row.append(name, element("td", "num", formatNumber(perCraft)), element("td", "num total", formatNumber(total)));
  return row;
}

// Однакові назви в одному списку (два рецепти того самого сувою) розрізняємо
// матеріалом, якого немає в двійника, а за тих самих матеріалів — пропорцією.
function optionLabels(recipes) {
  const byName = new Map();
  recipes.forEach((recipe) => byName.set(itemName(recipe), [...(byName.get(itemName(recipe)) ?? []), recipe]));
  return new Map(recipes.map((recipe) => {
    const twins = byName.get(itemName(recipe));
    if (twins.length === 1) return [recipe.id, itemName(recipe)];
    const shared = new Set(twins.filter((twin) => twin !== recipe).flatMap((twin) => twin.materials.map((material) => material.name)));
    const own = recipe.materials.filter((material) => !shared.has(material.name));
    // Англійські назви предметів пишуться з великої, тож у дужках їх не зменшуємо.
    const hint = own.length
      ? tr(own.at(-1).name.toLocaleLowerCase("uk"), itemName(own.at(-1)))
      : `${recipe.materials.map((material) => material.quantity).join(" + ")} → ${recipe.output} ${tr("шт.", "pcs")}`;
    return [recipe.id, `${itemName(recipe)} (${hint})`];
  }));
}

function tableHead() {
  const head = element("thead");
  const row = element("tr");
  [[tr("Матеріал", "Material"), ""], [tr("На 1 крафт", "Per craft"), "num"], [tr("Разом", "Total"), "num"]].forEach(([text, className]) => {
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
  const title = element("h2", "panel-heading", tr(calculator.title, calculator.titleEn ?? calculator.title));
  title.id = `${prefix}-title`;
  const reset = element("button", "btn-ghost", tr("Скинути", "Reset"));
  reset.type = "button";
  head.append(title, reset);

  const controls = element("div", "recipe-controls");

  const pickField = element("div", "field");
  const pickLabel = element("label", "", tr(calculator.label, calculator.labelEn ?? calculator.label));
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
  const quantityText = tr("Кількість крафтів", "Number of crafts");
  const quantityLabel = element("label", "", quantityText);
  quantityLabel.htmlFor = `${prefix}-quantity`;
  const quantity = createStepper({
    id: `${prefix}-quantity`,
    label: quantityText,
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
    const recipeDescription = isEnglish ? recipe.descriptionEn : recipe.description;

    preview.src = assetUrl(recipe.icon);
    meta.replaceChildren();
    if (recipe.profession) meta.append(element("span", "badge badge-gold", tr(recipe.profession, recipe.professionEn ?? recipe.profession)));
    meta.append(element("span", "", tr(
      `За один крафт: ${formatNumber(recipe.output)} шт.`,
      `Yield per craft: ${formatNumber(recipe.output)}`,
    )));
    description.textContent = recipeDescription ?? "";
    description.hidden = !recipeDescription;

    caption.textContent = tr(
      `Матеріали на ${formatNumber(crafts)} ${plural(crafts, CRAFTS)}: ${itemName(recipe)}`,
      `Materials for ${formatNumber(crafts)} ${plural(crafts, CRAFTS)}: ${itemName(recipe)}`,
    );
    body.replaceChildren(...recipe.materials.map(
      (material) => itemRow(material, material.quantity, material.quantity * crafts),
    ));

    const resultHead = element("tr");
    const resultLabel = element("th", "", tr("Результат крафту", "Craft result"));
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
