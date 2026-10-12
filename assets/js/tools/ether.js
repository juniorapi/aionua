// Конвертер ефіру: скільки звичайного магічного ефіру в усіх видах разом.
import { initHeader } from "../header.js";
import { tr } from "../i18n.js";
import { createStepper, element, formatNumber, icon } from "./common.js";

const MAX_COUNT = 9999;
// Кожен наступний вид — утричі більше попереднього: 27 = 3 × 9 = 3 × 3 × 3.
// Англійські назви — як у клієнті NA/EU: Brilliant, Pure, Greater і просто Magical Aether.
const ETHERS = [
  { id: "radiant", name: tr("Сяючий магічний ефір", "Brilliant Magical Aether"), rate: 27, icon: "efir/images/icon_item_od05_u.png" },
  { id: "pure", name: tr("Чистий магічний ефір", "Pure Magical Aether"), rate: 9, icon: "efir/images/icon_item_od05_l.png" },
  { id: "refined", name: tr("Очищений магічний ефір", "Greater Magical Aether"), rate: 3, icon: "efir/images/icon_item_od05_r.png" },
  { id: "basic", name: tr("Магічний ефір", "Magical Aether"), rate: 1, icon: "efir/images/icon_item_od05.png" },
];

function renderConverter(root) {
  const rows = element("div", "ether-rows");
  const total = element("strong", "num", "0");
  total.id = "ether-total";
  const counters = ETHERS.map((ether) => {
    const row = element("div", "ether-row");
    const label = element("label");
    label.htmlFor = `ether-${ether.id}`;
    const rate = formatNumber(ether.rate);
    label.append(ether.name, element("small", "", tr(`1 шт. = ${rate} магічного ефіру`, `1 pc = ${rate} Magical Aether`)));
    const result = element("output", "ether-result", "0");
    result.htmlFor = `ether-${ether.id}`;
    const counter = createStepper({
      id: `ether-${ether.id}`,
      label: ether.name,
      min: 0,
      max: MAX_COUNT,
      value: 0,
      onChange: update,
    });
    row.append(icon(ether.icon), label, counter.root, result);
    rows.append(row);
    return { ether, counter, result };
  });

  const footer = element("div", "ether-total");
  const totalLabel = element("span", "", tr("Разом магічного ефіру", "Total Magical Aether"));
  totalLabel.id = "ether-total-label";
  total.setAttribute("aria-labelledby", totalLabel.id);
  total.setAttribute("aria-live", "polite");
  footer.append(totalLabel, total);

  function update() {
    let sum = 0;
    counters.forEach(({ ether, counter, result }) => {
      const value = counter.value * ether.rate;
      sum += value;
      result.textContent = `= ${formatNumber(value)}`;
    });
    total.textContent = formatNumber(sum);
  }

  root.querySelector("[data-reset]")?.addEventListener("click", () => {
    counters.forEach(({ counter }) => counter.set(0));
    counters[0].counter.input.focus();
  });

  root.querySelector("[data-converter]").replaceChildren(rows, footer);
  update();
}

initHeader();
renderConverter(document.querySelector("[data-ether]"));
