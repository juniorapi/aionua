import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.resolve(import.meta.dirname, "..");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

// Реліз локалізації, як його віддає GitHub API: версії й дати збірок лежать в описі.
const release = {
  body: "Нові збірки\n<!-- aionua-versions: origin=1.4.0@01.10.2026 destiny=2.3.0@30.09.2026 riftshade=1.4.2@29.09.2026 -->",
  assets: [
    { name: "AionOriginUA.exe", size: 253539123, updated_at: "2026-10-02T10:00:00Z" },
    { name: "AionRiftshadeUA.exe", size: 48968089, updated_at: "2026-10-02T10:00:00Z" },
    { name: "AionDestinyUA.exe", size: 151100000, updated_at: "2026-10-02T10:00:00Z" },
  ],
};

async function readData(tool) {
  return JSON.parse(await readFile(path.join(root, "v2", tool, "data.json"), "utf8"));
}

function launchBrowser() {
  const executablePath = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    chromium.executablePath(),
  ].find((candidate) => candidate && existsSync(candidate));
  if (!executablePath) throw new Error("Chromium or Google Chrome is required");
  return chromium.launch({ headless: true, executablePath });
}

async function withSite(run) {
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      const relative = pathname.replace(/^\/aionua\//, "");
      const filePath = path.resolve(root, relative.endsWith("/") || relative === "" ? `${relative}index.html` : relative);
      if (!filePath.startsWith(root)) throw new Error("Path outside repository");
      const payload = await readFile(filePath);
      response.writeHead(200, { "content-type": mimeTypes[path.extname(filePath)] ?? "application/octet-stream" });
      response.end(payload);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await launchBrowser();
  const origin = `http://127.0.0.1:${server.address().port}`;

  async function open(pagePath, viewport = { width: 1440, height: 1000 }) {
    const context = await browser.newContext({ viewport, locale: "uk-UA" });
    await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    // Іконка, що не знайшлася, — це битий шлях у data.json, а не дрібниця.
    page.on("response", (response) => {
      if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.route(/googletagmanager\.com|fonts\.googleapis\.com/, (route) => route.abort());
    await page.route("https://api.github.com/**", (route) => route.fulfill({ contentType: "application/json", body: JSON.stringify(release) }));
    // Файл релізу браузер зберігає, не йдучи зі сторінки; 204 дає ту саму поведінку без завантаження.
    await page.route("https://github.com/**", (route) => route.fulfill({ status: 204 }));
    await page.goto(`${origin}/aionua/${pagePath}`, { waitUntil: "domcontentloaded" });
    return { page, context, errors };
  }

  try {
    await run(open);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

async function fitsViewport(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  assert.ok(dimensions.content <= dimensions.viewport, JSON.stringify(dimensions));
}

test("v2 craft calculator multiplies every material by the number of crafts", async () => {
  const { calculators } = await readData("crystal_crafting");
  const crystals = calculators.find((calculator) => calculator.id === "crystal");
  const red = crystals.recipes.find((recipe) => recipe.id === "red");

  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/crystal_crafting/");
    const panel = page.locator("section#crystal");
    await panel.waitFor();
    assert.equal(await page.locator("[data-calculators] > section.panel").count(), calculators.length);
    assert.equal(await page.locator('.site-nav a[aria-current="true"]').innerText(), "Крафт");

    await panel.getByLabel("Тип кристалу").selectOption("red");
    await panel.getByLabel("Кількість крафтів", { exact: true }).fill("7");

    const rows = panel.locator("tbody tr");
    assert.equal(await rows.count(), red.materials.length);
    for (const [index, material] of red.materials.entries()) {
      const cells = rows.nth(index).locator("th, td");
      assert.equal(await cells.nth(0).innerText(), material.name);
      assert.equal(await cells.nth(1).innerText(), String(material.quantity));
      assert.equal(await cells.nth(2).innerText().then((text) => text.replace(/\s/g, "")), String(material.quantity * 7));
    }
    const result = panel.locator("tfoot tr").last().locator("th, td");
    assert.equal(await result.nth(0).innerText(), red.name);
    assert.equal(await result.nth(2).innerText(), String(red.output * 7));
    assert.equal(await panel.locator(".recipe-meta .badge").innerText(), red.profession);

    // Кнопки лічильника не виходять за межі 1…999.
    await panel.getByRole("button", { name: "Кількість крафтів: більше" }).click();
    assert.equal(await panel.getByLabel("Кількість крафтів", { exact: true }).inputValue(), "8");
    await panel.getByRole("button", { name: "Скинути" }).click();
    assert.equal(await panel.getByLabel("Тип кристалу").inputValue(), crystals.recipes[0].id);
    assert.equal(await panel.getByLabel("Кількість крафтів", { exact: true }).inputValue(), "1");
    assert.equal(await panel.getByRole("button", { name: "Кількість крафтів: менше" }).isDisabled(), true);

    const brokenIcons = await page.evaluate(() => [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    assert.deepEqual(brokenIcons, []);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 recipe lists tell twin recipes apart and show item effects", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/spc/");
    const scrolls = page.locator("section#scroll");
    await scrolls.waitFor();
    const scrollOptions = await scrolls.locator("select option").allInnerTexts();
    assert.ok(scrollOptions.includes("Сувій відваги III (асватовий папір)"), scrollOptions.join(" | "));
    assert.ok(scrollOptions.includes("Сувій відваги III (макіновий папір)"), scrollOptions.join(" | "));
    assert.match(await scrolls.locator(".recipe-desc").innerText(), /^Швидк\. атаки \+9%/);

    const powders = await page.locator("section#powders select option").allInnerTexts();
    assert.ok(powders.includes("Елітний стихійний порошок (1 → 2 шт.)"), powders.join(" | "));
    assert.ok(powders.includes("Елітний стихійний порошок (12 → 20 шт.)"), powders.join(" | "));
    assert.equal(new Set(powders).size, powders.length);

    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 craft page lists gathering spots per race and copies coordinates", async () => {
  const { gathering } = await readData("craft");
  const opal = gathering.find((material) => material.id === "Opal");

  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/craft/");
    const section = page.locator("[data-gathering]");
    const opalButton = section.getByRole("button", { name: /^Опал/ });
    await opalButton.waitFor();
    assert.equal(await section.locator(".search-field").isHidden(), true);
    assert.equal(await section.getByRole("button", { name: "Копіювати координати" }).isDisabled(), true);

    await opalButton.click();
    assert.equal(await opalButton.getAttribute("aria-pressed"), "true");
    const spots = section.locator("textarea");
    assert.equal(await spots.inputValue(), opal.spots.elyos.join("\n"));
    await section.getByRole("button", { name: "Копіювати координати" }).click();
    await section.locator(".copy-status").filter({ hasText: `Скопійовано: ${opal.spots.elyos.length} точки` }).waitFor();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), opal.spots.elyos.join("\n"));

    await section.getByRole("button", { name: "Асмодіани" }).click();
    assert.equal(await spots.inputValue(), "");
    assert.match(await section.getByRole("button", { name: /^Опал/ }).innerText(), new RegExp(`${opal.spots.asmodians.length} точ`));

    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 essence tapping on a phone opens coordinates under the chosen resource", async () => {
  const { races } = await readData("essencetapping");
  const iron = races.elyos.find((entry) => entry.name === "Залізо");

  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/essencetapping/", { width: 390, height: 844 });
    const root = page.locator("[data-gathering]");
    await root.locator(".gather-item").first().waitFor();
    assert.equal(await root.locator(".gather-item").count(), races.elyos.length);
    assert.equal(await root.locator(".gather-output").isHidden(), true);

    await root.getByRole("searchbox", { name: "Пошук ресурсу" }).fill("залізо");
    assert.equal(await root.locator(".gather-item").count(), races.elyos.filter((entry) => entry.name.toLowerCase().includes("залізо")).length);
    await root.locator(".gather-item").first().click();

    // Панель стоїть одразу за вибраним рядком, а не над довгим списком.
    const placement = await page.evaluate(() => {
      const output = document.querySelector(".gather-output");
      return {
        afterSelected: output.previousElementSibling?.getAttribute("aria-pressed") === "true",
        visible: !output.hidden,
      };
    });
    assert.deepEqual(placement, { afterSelected: true, visible: true });
    assert.equal(await root.locator("textarea").inputValue(), iron.spots.join("\n"));
    await fitsViewport(page);
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-v2-essencetapping-mobile.png") });

    // Вибрана раса запам'ятовується між сторінками збирання.
    await root.getByRole("button", { name: "Асмодіани" }).click();
    await page.goto(page.url().replace("essencetapping", "aethertapping"));
    await page.locator(".gather-region").first().waitFor();
    assert.equal(await page.getByRole("button", { name: "Асмодіани" }).getAttribute("aria-pressed"), "true");
    assert.equal(await page.locator(".gather-region").first().innerText(), "Альтгард");

    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 enchantment calculator lists 41 stones from 80% down to 0%", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/aion-4.6-enchantment-calculator/");
    const stones = page.locator("[data-stones] li");
    await stones.first().waitFor();
    assert.equal(await page.locator("[data-summary]").innerText(), "Вічний предмет 65 рівня, +0: найкращий шанс 80% дає камінь L105 і вище.");
    assert.equal(await stones.count(), 41);
    assert.equal(await stones.first().innerText(), "L105\n80%");
    assert.equal(await stones.last().innerText(), "L65\n0%");
    assert.equal(await page.locator('.site-nav a[aria-current="true"]').innerText(), "Калькулятори");

    await page.getByRole("button", { name: "Міфічний" }).click();
    await page.getByLabel("Рівень предмета").selectOption("60");
    await page.getByLabel("Поточне зачарування").selectOption("5");
    assert.equal(await page.getByRole("button", { name: "Міфічний" }).getAttribute("aria-pressed"), "true");
    assert.equal(await page.getByRole("button", { name: "Вічний" }).getAttribute("aria-pressed"), "false");
    assert.equal(await stones.first().innerText(), "L115\n80%");
    assert.equal(await stones.nth(10).innerText(), "L105\n60%");
    assert.equal(await stones.last().innerText(), "L75\n0%");

    await page.setViewportSize({ width: 390, height: 844 });
    await fitsViewport(page);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 ether converter adds every kind up in basic magic ether", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/efir/");
    const total = page.locator("#ether-total");
    await total.waitFor();

    await page.getByRole("spinbutton", { name: /^Сяючий магічний ефір/ }).fill("2");
    await page.getByRole("spinbutton", { name: /^Чистий магічний ефір/ }).fill("3");
    await page.getByRole("spinbutton", { name: /^Очищений магічний ефір/ }).fill("4");
    await page.getByRole("spinbutton", { name: /^Магічний ефір/ }).fill("5");
    // 2 × 27 + 3 × 9 + 4 × 3 + 5 = 98
    assert.equal(await total.innerText(), "98");
    assert.equal(await page.locator(".ether-result").first().innerText(), "= 54");

    await page.getByRole("spinbutton", { name: /^Сяючий магічний ефір/ }).fill("12345");
    assert.equal(await page.getByRole("spinbutton", { name: /^Сяючий магічний ефір/ }).inputValue(), "9999");
    await page.getByRole("button", { name: "Скинути" }).click();
    assert.equal(await total.innerText(), "0");

    await page.setViewportSize({ width: 390, height: 844 });
    await fitsViewport(page);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 counter page drives the overlay preview and builds the OBS link", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/tempering-solution-counter/");
    // Число зі старої сторінки (той самий ключ сховища) має перейти в нову.
    await page.evaluate(() => localStorage.setItem("waterCount", "41"));
    await page.reload();
    const count = page.locator("[data-count]").first();
    const overlay = page.frameLocator("[data-preview]");
    await overlay.locator("[data-count]").filter({ hasText: "41" }).waitFor();
    assert.equal(await count.innerText(), "41");
    assert.equal(await page.locator('.site-nav a[aria-current="true"]').innerText(), "СтрімБокс");

    await page.getByRole("button", { name: "Плюс один" }).click();
    assert.equal(await count.innerText(), "42");
    await overlay.locator("[data-count]").filter({ hasText: "42" }).waitFor();
    // Клік по самому оверлею, як у вікні «Взаємодія» OBS.
    await overlay.locator("[data-overlay]").click();
    await page.locator("[data-count]").first().filter({ hasText: "43" }).waitFor();

    await page.getByPlaceholder("Точне число").fill("1000");
    await page.getByRole("button", { name: "Встановити" }).click();
    assert.equal((await count.innerText()).replace(/\s/g, ""), "1000");

    await page.getByRole("button", { name: "English" }).click();
    await page.getByRole("button", { name: "Зелений" }).click();
    const link = page.getByLabel("Посилання для джерела «Браузер»");
    assert.match(await link.inputValue(), /\/v2\/tempering-solution-counter\/overlay\.html\?lang=en&bg=green$/);
    await overlay.locator("[data-label]").filter({ hasText: "Loot Counter" }).waitFor();
    assert.equal(await page.locator("[data-preview-frame]").getAttribute("data-bg"), "green");

    await page.getByLabel("Свій підпис").fill("Розчини за стрім");
    await overlay.locator("[data-label]").filter({ hasText: "Розчини за стрім" }).waitFor();
    assert.match(await link.inputValue(), /&label=/);
    await page.getByRole("button", { name: "Копіювати" }).click();
    await page.getByText("Посилання скопійовано").waitFor();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), await link.inputValue());

    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Скинути" }).click();
    assert.equal(await count.innerText(), "0");

    await page.setViewportSize({ width: 390, height: 844 });
    await fitsViewport(page);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 stream overlay counts clicks and keys, and resets only on a double Delete", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/ice-hammer-counter/overlay.html?lang=de&bg=transparent");
    await page.evaluate(() => localStorage.setItem("hammerCount", "5"));
    await page.reload();
    const count = page.locator("[data-count]");
    await count.filter({ hasText: "5" }).waitFor();
    assert.equal(await page.locator("[data-label]").textContent(), "Beutezähler");
    assert.equal(await page.locator("html").getAttribute("data-bg"), "transparent");
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgba(0, 0, 0, 0)");

    await page.locator("[data-overlay]").click();
    assert.equal(await count.innerText(), "6");
    await page.locator("[data-overlay]").click({ button: "right" });
    assert.equal(await count.innerText(), "5");
    await page.keyboard.press("+");
    await page.keyboard.press("+");
    await page.keyboard.press("-");
    assert.equal(await count.innerText(), "6");
    await page.keyboard.press("Delete");
    assert.equal(await count.innerText(), "6");
    await page.keyboard.press("Delete");
    assert.equal(await count.innerText(), "0");
    assert.equal(await page.evaluate(() => localStorage.getItem("hammerCount")), "0");

    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 localization shows release versions, sizes and script versions", async () => {
  const scriptVersion = (await readFile(path.join(root, "localization", "originaion-ua.user.js"), "utf8")).match(/@version\s+([\d.]+)/)[1];

  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/localization/");
    const origin = page.locator('[data-client="origin"]');
    await origin.locator("[data-version]").filter({ hasText: "1.4.0" }).waitFor();
    assert.equal(await origin.locator("[data-size]").innerText(), "241,8 МБ");
    // Дата збірки з опису релізу важливіша за дату файлу, яка зсувається від перезаливки.
    assert.equal(await origin.locator("[data-date]").innerText(), "01.10.2026");
    assert.equal(await page.locator('[data-client="riftshade"] [data-size]').innerText(), "46,7 МБ");
    assert.equal(await page.locator('[data-client="destiny"] [data-version]').innerText(), "2.3.0");
    assert.equal(await page.locator('.site-nav a[aria-current="page"]').innerText(), "Локалізація");

    await page.locator('[data-script-meta="originaion-ua.user.js"]').filter({ hasText: `Версія ${scriptVersion}` }).waitFor();
    assert.equal(await page.getByRole("link", { name: "Встановити скрипт" }).first().getAttribute("href"), "../../localization/originaion-ua.user.js");

    const download = origin.getByRole("link", { name: /Завантажити локалізацію для Origin Aion/ });
    assert.equal(await download.getAttribute("href"), "https://github.com/juniorapi/aionua/releases/download/localization/AionOriginUA.exe");
    await download.click();
    assert.equal(await download.innerText(), "Завантаження почалося…");

    const cached = await page.evaluate(() => JSON.parse(localStorage.getItem("aionua:release-assets")));
    assert.equal(cached.versions.versions.origin, "1.4.0");

    await page.setViewportSize({ width: 390, height: 844 });
    await fitsViewport(page);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 home links every migrated tool to its v2 page", async () => {
  const html = await readFile(path.join(root, "v2", "index.html"), "utf8");
  for (const tool of [
    "crystal_crafting", "craft", "spc", "essencetapping", "aethertapping", "aion-4.6-enchantment-calculator", "efir",
    "tempering-solution-counter", "ice-hammer-counter", "localization",
  ]) {
    assert.match(html, new RegExp(`class="tool-link" href="${tool.replace(/\./g, "\\.")}/"`), tool);
    assert.ok(existsSync(path.join(root, "v2", tool, "index.html")), tool);
  }
});
