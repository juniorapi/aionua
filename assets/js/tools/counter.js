// Сторінка лічильника: налаштування оверлею, посилання для OBS і прев'ю з кнопками.
import { readPreference, writePreference } from "../format.js";
import { initHeader } from "../header.js";
import { copyText, element, formatNumber } from "./common.js";
import {
  BACKGROUNDS,
  COUNTERS,
  LANGUAGES,
  MAX_COUNT,
  onCountChange,
  overlaySettings,
  readCount,
  writeCount,
} from "./counter-core.js";

const SETTINGS_KEY = "aionua-v2-counter-overlay";
// Прев'ю перезавантажується з кожною зміною підпису, тож чекаємо паузи в наборі.
const LABEL_DELAY_MS = 400;

function readSettings() {
  try {
    return overlaySettings(new URLSearchParams(readPreference(SETTINGS_KEY) ?? ""));
  } catch {
    return overlaySettings(new URLSearchParams());
  }
}

function segmented(container, options, selected, onSelect) {
  const buttons = Object.entries(options).map(([value, text]) => {
    const button = element("button", "", text);
    button.type = "button";
    button.dataset.value = value;
    button.setAttribute("aria-pressed", String(value === selected));
    button.addEventListener("click", () => {
      buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
      onSelect(value);
    });
    return button;
  });
  container.replaceChildren(...buttons);
}

function init() {
  initHeader();
  const root = document.querySelector("[data-counter-page]");
  const counter = COUNTERS[root.dataset.counter];
  const settings = readSettings();
  let labelTimer = 0;
  let statusTimer = 0;

  const preview = root.querySelector("[data-preview]");
  const previewFrame = root.querySelector("[data-preview-frame]");
  const link = root.querySelector("[data-overlay-link]");
  const labelInput = root.querySelector("[data-label-input]");
  const copyStatus = root.querySelector("[data-copy-status]");
  const countText = root.querySelector("[data-count]");
  const setForm = root.querySelector("[data-set]");
  const setInput = setForm.querySelector("input");
  setInput.max = String(MAX_COUNT);

  function overlayUrl() {
    const params = new URLSearchParams({ lang: settings.lang, bg: settings.bg });
    if (settings.label) params.set("label", settings.label);
    return new URL(`overlay.html?${params}`, window.location.href).href;
  }

  function refreshOverlay() {
    const url = overlayUrl();
    link.value = url;
    preview.src = url;
    previewFrame.dataset.bg = settings.bg;
    labelInput.placeholder = LANGUAGES[settings.lang].label;
    writePreference(SETTINGS_KEY, new URL(url).search.slice(1));
  }

  function showCount(count) {
    countText.textContent = formatNumber(count);
  }

  // Прев'ю — окрема сторінка: число туди доходить подією storage.
  function setCount(value) {
    showCount(writeCount(counter, value));
  }

  segmented(
    root.querySelector("[data-lang-options]"),
    Object.fromEntries(Object.entries(LANGUAGES).map(([id, language]) => [id, language.short])),
    settings.lang,
    (lang) => {
      settings.lang = lang;
      refreshOverlay();
    },
  );
  root.querySelectorAll("[data-lang-options] button").forEach((button) => {
    button.setAttribute("aria-label", LANGUAGES[button.dataset.value].name);
  });
  segmented(root.querySelector("[data-bg-options]"), BACKGROUNDS, settings.bg, (bg) => {
    settings.bg = bg;
    refreshOverlay();
  });

  labelInput.value = settings.label;
  labelInput.addEventListener("input", () => {
    window.clearTimeout(labelTimer);
    labelTimer = window.setTimeout(() => {
      settings.label = labelInput.value.trim().slice(0, 40);
      refreshOverlay();
    }, LABEL_DELAY_MS);
  });

  root.querySelector("[data-copy]").addEventListener("click", async () => {
    const copied = await copyText(link.value, link);
    window.clearTimeout(statusTimer);
    copyStatus.classList.toggle("is-error", !copied);
    copyStatus.textContent = copied ? "Посилання скопійовано" : "Не вдалося скопіювати: виділіть посилання й натисніть Ctrl+C";
    if (copied) statusTimer = window.setTimeout(() => { copyStatus.textContent = ""; }, 4000);
  });

  root.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => setCount(readCount(counter) + Number(button.dataset.step)));
  });
  setForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (setInput.value === "") return;
    setCount(setInput.value);
    setInput.value = "";
  });
  root.querySelector("[data-reset]").addEventListener("click", () => {
    if (window.confirm("Скинути лічильник до нуля?")) setCount(0);
  });

  onCountChange(counter, showCount);
  showCount(readCount(counter));
  refreshOverlay();
}

init();
