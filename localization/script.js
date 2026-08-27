const backButton = document.querySelector(".back-button");

for (const [client, configuredDate] of Object.entries(window.AION_UPDATE_DATES ?? {})) {
  const card = document.querySelector(`[data-client="${client}"]`);
  const date = String(configuredDate).trim();

  if (!card || !date) continue;

  const dateElement = card.querySelector("[data-date]");
  if (dateElement) dateElement.textContent = date;
}

backButton?.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "../";
  }
});

for (const button of document.querySelectorAll("[data-download]")) {
  button.addEventListener("click", () => {
    const label = button.querySelector("span");
    if (!label) return;

    const originalLabel = label.textContent;
    button.classList.add("is-starting");
    label.textContent = "Завантаження почалося…";

    window.setTimeout(() => {
      button.classList.remove("is-starting");
      label.textContent = originalLabel;
    }, 2600);
  });
}
