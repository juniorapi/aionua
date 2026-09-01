const backButton = document.querySelector(".back-button");

// Значення з dates.js — запасні. Вони показуються одразу, щоб картка не
// блимала порожнечею, а потім їх заміщують справжні дані з релізу.
for (const [client, configuredDate] of Object.entries(window.AION_UPDATE_DATES ?? {})) {
  const card = document.querySelector(`[data-client="${client}"]`);
  const date = String(configuredDate).trim();
  if (!card || !date) continue;

  const dateElement = card.querySelector("[data-date]");
  if (dateElement) dateElement.textContent = date;
}

for (const [client, version] of Object.entries(window.AION_VERSIONS ?? {})) {
  const card = document.querySelector(`[data-client="${client}"]`);
  if (!card || !version) continue;

  const versionElement = card.querySelector("[data-version]");
  if (versionElement) versionElement.textContent = String(version).trim();
}

// Розмір і дату інсталяторів беремо з самого релізу, а не з коду сторінки.
//
// Userscript-и повідомляють свою версію самі — через @version і Last-Modified,
// тому в них ці дані завжди свіжі. Інсталятори ж доводилося вписувати руками,
// і сторінка легко відставала від того, що справді залито. GitHub знає і
// розмір ассета, і час його оновлення, тож питаємо в нього.
//
// Відповідь кешується на годину: анонімний ліміт GitHub API — 60 запитів на
// годину з адреси, а сторінку відкривають часто. Якщо запит не вдався або
// ліміт вичерпано, на картці лишаються значення з розмітки.
const RELEASE_API =
  "https://api.github.com/repos/juniorapi/aionua/releases/tags/localization";
const RELEASE_CACHE_KEY = "aionua:release-assets";
const RELEASE_CACHE_MS = 60 * 60 * 1000;
// Скільки кешу довіряти без перевірки. Понад цей час значення ще показуємо,
// але паралельно питаємо GitHub — інакше свіжа публікація не видна.
const RELEASE_TRUST_MS = 5 * 60 * 1000;

function formatSize(bytes) {
  return `${(bytes / 1048576).toFixed(1)} МБ`;
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

// Версії лежать у описі релізу машинним рядком, який пише tools/publish_release.py:
//   <!-- aionua-versions: origin=1.2.3 destiny=2.1.3 riftshade=1.2.3 -->
// Це той самий запит, що дає розмір і дату, тож зайвого звернення немає.
function parseVersions(body) {
  const line = String(body ?? "").match(/<!--\s*aionua-versions:([^>]*)-->/);
  if (!line) return null;

  // Формат `клієнт=версія@дата`. Дата — коли збірку справді зроблено.
  // Без неї бралася дата ассета з GitHub, а вона зсувається від будь-якої
  // перезаливки: одного разу картки показали сьогоднішній день трьом
  // клієнтам, хоча змінився лише один.
  const versions = {};
  const dates = {};
  for (const pair of line[1].trim().split(/\s+/)) {
    const [client, rest] = pair.split("=");
    if (!client || !rest) continue;
    const [version, date] = rest.split("@");
    if (version) versions[client] = version;
    if (date) dates[client] = date;
  }
  if (!Object.keys(versions).length) return null;
  return { versions, dates };
}

// Викликається після applyReleaseAssets — і дата з релізу навмисно перекриває
// дату ассета: та зсувається від будь-якої перезаливки, ця показує день збірки.
function applyVersions(meta) {
  if (!meta) return;
  const versions = meta.versions ?? meta;      // сумісність зі старим кешем
  const dates = meta.dates ?? {};

  for (const [client, version] of Object.entries(versions)) {
    const element = document.querySelector(`[data-client="${client}"] [data-version]`);
    if (element) element.textContent = version;
  }
  for (const [client, date] of Object.entries(dates)) {
    const element = document.querySelector(`[data-client="${client}"] [data-date]`);
    if (element && date) element.textContent = date;
  }
}

function applyReleaseAssets(assets) {
  for (const card of document.querySelectorAll("[data-release-asset]")) {
    const asset = assets[card.dataset.releaseAsset];
    if (!asset) continue;

    const sizeElement = card.querySelector("[data-size]");
    if (sizeElement && Number.isFinite(asset.size)) {
      sizeElement.textContent = formatSize(asset.size);
    }

    const dateElement = card.querySelector("[data-date]");
    const date = formatDate(asset.updated_at);
    if (dateElement && date) dateElement.textContent = date;
  }
}

function readCachedAssets() {
  try {
    const raw = localStorage.getItem(RELEASE_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.at > RELEASE_CACHE_MS) return null;
    return cached;
  } catch {
    // Приватне вікно або заблоковані дані сайту — просто йдемо в мережу.
    return null;
  }
}

function fetchRelease() {
  return fetch(RELEASE_API, { headers: { Accept: "application/vnd.github+json" } })
    .then((response) => (response.ok ? response.json() : null))
    .then((release) => {
      if (!release?.assets) return;
      const assets = {};
      for (const asset of release.assets) {
        assets[asset.name] = { size: asset.size, updated_at: asset.updated_at };
      }
      applyReleaseAssets(assets);
      const versions = parseVersions(release.body);
      if (versions) applyVersions(versions);
      try {
        localStorage.setItem(
          RELEASE_CACHE_KEY,
          JSON.stringify({ at: Date.now(), assets, versions }),
        );
      } catch {
        // Кеш не обов'язковий: без нього просто буде запит на кожне відкриття.
      }
    })
    .catch(() => { /* лишаємо значення з розмітки */ });
}

// Кеш показуємо одразу, але тут же перевіряємо його в мережі. Раніше свіжий
// кеш скасовував запит зовсім, і сторінка до години показувала стару версію
// після кожної публікації — саме так сталося з 1.3.4 замість 1.3.6.
//
// Зовсім без кешу теж не можна: анонімний ліміт GitHub — 60 запитів на годину
// на IP. Тому перші хвилини кешу вважаємо надійними й у мережу не йдемо, а
// далі показуємо збережене й одразу оновлюємо.
const cached = readCachedAssets();
if (cached) {
  applyReleaseAssets(cached.assets);
  if (cached.versions) applyVersions(cached.versions);
  if (Date.now() - cached.at > RELEASE_TRUST_MS) fetchRelease();
} else {
  fetchRelease();
}

backButton?.addEventListener("click", () => {
  // history.back() має сенс лише тоді, коли попередня сторінка — наша.
  // Інакше (прямий захід, перехід із пошуку) повертаємося на головну:
  // сама лише history.length > 1 тут не рятує, бо в свіжому вікні в історії
  // вже може лежати сторінка нової вкладки чи пошук.
  let cameFromSite = false;
  try {
    cameFromSite = Boolean(document.referrer)
      && new URL(document.referrer).origin === window.location.origin;
  } catch (e) { /* некоректний referrer — вважаємо, що зайшли напряму */ }

  if (cameFromSite && window.history.length > 1) {
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
