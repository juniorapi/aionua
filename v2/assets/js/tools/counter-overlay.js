// Оверлей для OBS: лише підпис, число й іконка. Рахують у вікні «Взаємодія» OBS:
// клік додає одиницю, правий клік забирає, клавіші + і − роблять те саме,
// два натискання Delete поспіль скидають до нуля.
import { COUNTERS, LANGUAGES, onCountChange, overlaySettings, readCount, writeCount } from "./counter-core.js";

// Одне натискання Delete могло б стерти лічильник за стрім, тож скидаємо лише за подвійне.
const RESET_WINDOW_MS = 1500;

const counter = COUNTERS[document.body.dataset.counter];
const { lang, bg, label } = overlaySettings(new URLSearchParams(window.location.search));
const numberFormat = new Intl.NumberFormat(LANGUAGES[lang].locale);
const root = document.querySelector("[data-overlay]");
const countElement = root.querySelector("[data-count]");
let count = readCount(counter);
let resetArmedAt = 0;

document.documentElement.lang = lang;
document.documentElement.dataset.bg = bg;
root.querySelector("[data-label]").textContent = label || LANGUAGES[lang].label;

function render(next, bump = false) {
  count = next;
  countElement.textContent = numberFormat.format(count);
  if (!bump) return;
  root.classList.remove("is-bumped");
  // Читання розміру перезапускає анімацію, навіть якщо натискання йдуть одне за одним.
  void root.offsetWidth;
  root.classList.add("is-bumped");
}

function change(delta) {
  const next = writeCount(counter, count + delta);
  if (next !== count) render(next, delta > 0);
}

root.addEventListener("click", () => change(1));
root.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  change(-1);
});
root.addEventListener("animationend", () => root.classList.remove("is-bumped"));

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (["+", "=", " ", "ArrowUp"].includes(event.key)) {
    change(1);
  } else if (["-", "_", "ArrowDown", "Backspace"].includes(event.key)) {
    change(-1);
  } else if (event.key === "Delete") {
    const now = Date.now();
    if (now - resetArmedAt <= RESET_WINDOW_MS) {
      render(writeCount(counter, 0));
      resetArmedAt = 0;
    } else {
      resetArmedAt = now;
    }
  } else {
    return;
  }
  event.preventDefault();
});

onCountChange(counter, (next) => render(next, next > count));
render(count);
