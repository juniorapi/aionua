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

// Версія та дата оновлення userscript-ів читаються з самих файлів:
// @version — з хедера Tampermonkey, дата — із заголовка Last-Modified,
// який GitHub Pages виставляє за часом останнього деплою файлу.
for (const meta of document.querySelectorAll("[data-script-meta]")) {
  fetch(meta.dataset.scriptMeta, { cache: "no-cache" })
    .then(async (response) => {
      if (!response.ok) return;
      const source = await response.text();
      const version = source.match(/@version\s+([\d.]+)/)?.[1];
      const lastModified = response.headers.get("last-modified");
      let date = "";
      if (lastModified) {
        const d = new Date(lastModified);
        if (!Number.isNaN(d.getTime())) {
          const pad = (n) => String(n).padStart(2, "0");
          date = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
        }
      }
      const parts = [];
      if (version) parts.push(`Версія ${version}`);
      if (date) parts.push(`оновлено ${date}`);
      meta.textContent = parts.join(" · ");
    })
    .catch(() => { /* без метаданих картка лишається як була */ });
}

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
