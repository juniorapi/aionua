// Локалізація: версії, розміри й дати інсталяторів із релізу GitHub, версії скриптів із самих файлів.
//
// Логіка та сама, що в localization/script.js старої сторінки: запасні значення з
// localization/dates.js, справжні — з релізу, кеш спільний для обох сторінок.
import { initHeader } from "../header.js";

const RELEASE_API = "https://api.github.com/repos/juniorapi/aionua/releases/tags/localization";
const RELEASE_CACHE_KEY = "aionua:release-assets";
// Анонімний ліміт GitHub API — 60 запитів на годину з адреси: годину тримаємо кеш,
// але після п'яти хвилин показуємо його й одразу перевіряємо, чи не вийшла нова збірка.
const RELEASE_CACHE_MS = 60 * 60 * 1000;
const RELEASE_TRUST_MS = 5 * 60 * 1000;
const SCRIPTS_BASE = "../../localization/";
// Заголовок userscript-а вміщається в перші кілобайти, решту файлу не тягнемо.
const SCRIPT_HEAD_BYTES = 4096;

const sizeFormat = new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function formatSize(bytes) {
  return `${sizeFormat.format(bytes / 1048576)} МБ`;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function setText(client, field, text) {
  // Назва клієнта приходить з опису релізу, тож у селектор — лише екранованою.
  const element = document.querySelector(`[data-client="${CSS.escape(client)}"] [data-${field}]`);
  if (element && text) element.textContent = text;
}

// Рядок в описі релізу пише tools/publish_release.py:
//   <!-- aionua-versions: origin=1.2.3@23.09.2026 destiny=2.1.3@… -->
// Дата після @ — день збірки; дата ассета зсувається від будь-якої перезаливки.
function parseVersions(body) {
  const line = String(body ?? "").match(/<!--\s*aionua-versions:([^>]*)-->/);
  if (!line) return null;
  const versions = {};
  const dates = {};
  for (const pair of line[1].trim().split(/\s+/)) {
    const [client, rest] = pair.split("=");
    if (!client || !rest) continue;
    const [version, date] = rest.split("@");
    if (version) versions[client] = version;
    if (date) dates[client] = date;
  }
  return Object.keys(versions).length ? { versions, dates } : null;
}

function applyReleaseAssets(assets) {
  document.querySelectorAll("[data-release-asset]").forEach((row) => {
    const asset = assets?.[row.dataset.releaseAsset];
    if (!asset) return;
    if (Number.isFinite(asset.size)) setText(row.dataset.client, "size", formatSize(asset.size));
    setText(row.dataset.client, "date", formatDate(asset.updated_at));
  });
}

// Після ассетів: дата збірки з опису релізу навмисно перекриває дату файлу.
function applyVersions(meta) {
  if (!meta) return;
  const versions = meta.versions ?? meta;
  Object.entries(versions).forEach(([client, version]) => setText(client, "version", version));
  Object.entries(meta.dates ?? {}).forEach(([client, date]) => setText(client, "date", date));
}

function readCachedRelease() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(RELEASE_CACHE_KEY));
    return cached && Date.now() - cached.at <= RELEASE_CACHE_MS ? cached : null;
  } catch {
    return null;
  }
}

async function fetchRelease() {
  try {
    const response = await fetch(RELEASE_API, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) return;
    const release = await response.json();
    if (!Array.isArray(release?.assets)) return;
    const assets = {};
    release.assets.forEach((asset) => {
      assets[asset.name] = { size: asset.size, updated_at: asset.updated_at };
    });
    const versions = parseVersions(release.body);
    applyReleaseAssets(assets);
    applyVersions(versions);
    try {
      window.localStorage.setItem(RELEASE_CACHE_KEY, JSON.stringify({ at: Date.now(), assets, versions }));
    } catch {
      // Без кешу просто буде запит на кожне відкриття.
    }
  } catch {
    // Мережа чи ліміт: лишаються запасні значення.
  }
}

function loadReleaseMeta() {
  // Запасні значення показуємо одразу, щоб рядки не стояли порожні до відповіді GitHub.
  Object.entries(window.AION_VERSIONS ?? {}).forEach(([client, version]) => setText(client, "version", String(version).trim()));
  Object.entries(window.AION_UPDATE_DATES ?? {}).forEach(([client, date]) => setText(client, "date", String(date).trim()));

  const cached = readCachedRelease();
  if (!cached) {
    fetchRelease();
    return;
  }
  applyReleaseAssets(cached.assets);
  applyVersions(cached.versions);
  if (Date.now() - cached.at > RELEASE_TRUST_MS) fetchRelease();
}

// Версія — з @version у заголовку скрипта, дата — з Last-Modified, який GitHub Pages
// ставить за останнім деплоєм файлу.
function loadScriptMeta() {
  document.querySelectorAll("[data-script-meta]").forEach(async (meta) => {
    try {
      const response = await fetch(`${SCRIPTS_BASE}${meta.dataset.scriptMeta}`, {
        cache: "no-cache",
        headers: { Range: `bytes=0-${SCRIPT_HEAD_BYTES - 1}` },
      });
      if (!response.ok) return;
      const head = (await response.text()).slice(0, SCRIPT_HEAD_BYTES);
      const version = head.match(/@version\s+([\d.]+)/)?.[1];
      const date = formatDate(response.headers.get("last-modified") ?? "");
      meta.textContent = [version && `Версія ${version}`, date && `оновлено ${date}`].filter(Boolean).join(" · ");
    } catch {
      // Без метаданих рядок лишається як є.
    }
  });
}

function initDownloads() {
  document.querySelectorAll("[data-download]").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.querySelector("span");
      if (!label || button.classList.contains("is-starting")) return;
      const original = label.textContent;
      button.classList.add("is-starting");
      label.textContent = "Завантаження почалося…";
      window.setTimeout(() => {
        button.classList.remove("is-starting");
        label.textContent = original;
      }, 2600);
    });
  });
}

initHeader();
loadReleaseMeta();
loadScriptMeta();
initDownloads();
