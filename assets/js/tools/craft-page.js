// Сторінки крафту: калькулятори рецептів із data.json, а де є — і точки збору матеріалів.
import { initHeader } from "../header.js";
import { tr } from "../i18n.js";
import { loadData, showLoadError } from "./common.js";
import { renderGathering } from "./gathering.js";
import { renderRecipeCalculator } from "./recipes.js";

// У data.json крафту точки збору згруповано за матеріалом; списку потрібні ресурси за расою.
// Назву віддаємо вже мовою сайту, а nameEn — для списку, який перекладає сам.
function gatheringByRace(materials) {
  const races = { elyos: [], asmodians: [] };
  materials.forEach(({ name, nameEn, spots }) => {
    Object.keys(races).forEach((race) => {
      if (spots[race]?.length) races[race].push({ name: tr(name, nameEn ?? name), nameEn, spots: spots[race] });
    });
  });
  return races;
}

async function init() {
  initHeader();
  const calculators = document.querySelector("[data-calculators]");
  const gathering = document.querySelector("[data-gathering]");
  try {
    const data = await loadData("data.json?v=2");
    calculators.replaceChildren(...data.calculators.map(renderRecipeCalculator));
    if (gathering && data.gathering) {
      renderGathering(gathering, gatheringByRace(data.gathering), { headingLevel: 3 });
    }
  } catch (error) {
    console.error(error);
    showLoadError(calculators);
    gathering?.replaceChildren();
  }
}

init();
