const backButton = document.querySelector(".back-button");

for (const [client, release] of Object.entries(window.AION_VERSIONS ?? {})) {
  const card = document.querySelector(`[data-client="${client}"]`);
  const version = String(release?.version ?? "").trim();
  const date = String(release?.date ?? "").trim();

  if (!card || !version) continue;

  for (const element of card.querySelectorAll("[data-version]")) {
    element.textContent = version;
  }

  const dateElement = card.querySelector("[data-date]");
  if (dateElement) dateElement.textContent = date;

  const downloadButton = card.querySelector("[data-download]");
  const clientName = card.dataset.clientName;
  if (downloadButton && clientName) {
    downloadButton.setAttribute(
      "aria-label",
      `Завантажити українську локалізацію для ${clientName} ${version}`,
    );
  }
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
