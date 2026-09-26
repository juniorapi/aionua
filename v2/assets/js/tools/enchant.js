// Калькулятор зачарування (патч 4.6): шанс для кожного рівня каменю.
//
// Найкращий шанс, 80 %, дає камінь рівня «рівень предмета + рідкість + поточне
// зачарування» і вище. Кожен рівень каменю нижче забирає 2 %, тож за 40 рівнів
// шанс падає до нуля: разом 41 рядок, як у старому калькуляторі.
import { initHeader } from "../header.js";
import { element } from "./common.js";

const GRADES = [
  { value: 20, name: "Героїчний" },
  { value: 30, name: "Легендарний" },
  { value: 40, name: "Вічний" },
  { value: 50, name: "Міфічний" },
];
const DEFAULT_GRADE = 40;
const MAX_ITEM_LEVEL = 65;
const MAX_ENCHANT = 14;
const STEPS = 40;
const STEP_CHANCE = 2;

function renderCalculator(root) {
  let grade = DEFAULT_GRADE;
  const gradeButtons = GRADES.map(({ value, name }) => {
    const button = element("button", "", name);
    button.type = "button";
    button.setAttribute("aria-pressed", String(value === grade));
    button.addEventListener("click", () => {
      grade = value;
      gradeButtons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
      update();
    });
    return button;
  });
  root.querySelector("[data-grades]").replaceChildren(...gradeButtons);
  const itemLevel = root.querySelector("[data-item-level]");
  const enchantLevel = root.querySelector("[data-enchant-level]");
  const summary = root.querySelector("[data-summary]");
  const grid = root.querySelector("[data-stones]");

  for (let level = MAX_ITEM_LEVEL; level >= 1; level -= 1) itemLevel.append(new Option(String(level), String(level)));
  for (let level = 0; level <= MAX_ENCHANT; level += 1) enchantLevel.append(new Option(`+${level}`, String(level)));

  function update() {
    const best = Number(itemLevel.value) + grade + Number(enchantLevel.value);
    const gradeName = GRADES.find((candidate) => candidate.value === grade).name;

    summary.replaceChildren(
      `${gradeName} предмет ${itemLevel.value} рівня, +${enchantLevel.value}: найкращий шанс `,
      element("strong", "", `${STEPS * STEP_CHANCE}%`),
      " дає камінь ",
      element("strong", "", `L${best}`),
      " і вище.",
    );

    const fragment = document.createDocumentFragment();
    for (let step = 0; step <= STEPS; step += 1) {
      const chance = (STEPS - step) * STEP_CHANCE;
      const stone = element("li", step === 0 ? "stone is-best" : "stone");
      const bar = element("span", "stone-bar");
      bar.setAttribute("aria-hidden", "true");
      const fill = element("span");
      fill.style.width = `${(chance / (STEPS * STEP_CHANCE)) * 100}%`;
      bar.append(fill);
      stone.append(element("span", "stone-level", `L${best - step}`), bar, element("span", "stone-chance", `${chance}%`));
      fragment.append(stone);
    }
    grid.replaceChildren(fragment);
  }

  itemLevel.addEventListener("change", update);
  enchantLevel.addEventListener("change", update);
  update();
}

initHeader();
renderCalculator(document.querySelector("[data-enchant]"));
