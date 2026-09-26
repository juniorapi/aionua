// Енергокінез і ефірокінез: ресурси за расою з координатами для чату.
import { initHeader } from "../header.js";
import { loadData, showLoadError } from "./common.js";
import { renderGathering } from "./gathering.js";

async function init() {
  initHeader();
  const root = document.querySelector("[data-gathering]");
  try {
    const data = await loadData("data.json?v=1");
    renderGathering(root, data.races);
  } catch (error) {
    console.error(error);
    showLoadError(root);
  }
}

init();
