// Оригінальні калькулятори стигм 4.6 (stigma/) і 4.8 (stigmas/) та переходи на них зі старих адрес v2.
//
// Запуск: node --test tests/stigma-calculators.e2e.mjs
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.resolve(import.meta.dirname, "..");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
};

function launchBrowser() {
  const executablePath = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    chromium.executablePath(),
  ].find((candidate) => candidate && existsSync(candidate));
  if (!executablePath) throw new Error("Chromium or Google Chrome is required");
  return chromium.launch({ headless: true, executablePath });
}

// Сайт лежить у підпапці /aionua/, як на GitHub Pages: сторінки калькуляторів звертаються до неї напряму.
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
  // Калькулятор 4.8 бере jQuery з CDN; у тестах — локальна копія зі сторінки 4.6.
  const jquery = await readFile(path.join(root, "stigma", "js", "jquery.js"), "utf8");

  async function open(pagePath) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 950 }, locale: "uk-UA" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.route(/googletagmanager\.com|fonts\.googleapis\.com/, (route) => route.abort());
    await page.route(/ajax\.googleapis\.com/, (route) => route.fulfill({ contentType: "text/javascript", body: jquery }));
    await page.goto(`${origin}/aionua/${pagePath}`, { waitUntil: "load" });
    return { page, context, errors, origin };
  }

  try {
    await run(open);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

test("stigma calculator 4.6 keeps a clean address until a stigma is added and opens links one after another", async () => {
  await withSite(async (open) => {
    const { page, context, errors, origin } = await open("stigma/");
    await page.locator(".stigma-free").first().waitFor();
    const base = `${origin}/aionua/stigma/`;
    assert.equal(page.url(), base);
    assert.equal(await page.locator("#stigma_link").inputValue(), base);
    // Калькулятор — для 4.6, і в куті тепер саме ця версія.
    assert.equal(await page.locator("#version_layer").evaluate((layer) => getComputedStyle(layer, "::before").content), '"4.6"');

    await page.locator(".stigma-free").first().click();
    assert.match(page.url(), /#[a-zA-Z]+$/);
    assert.equal(await page.locator("#stigma_link").inputValue(), page.url());
    await page.locator("#stigma_nor_1").hover();
    await page.locator("#stigma_nor_1 .stigma-delete").click();
    assert.equal(page.url(), base);

    // Два посилання поспіль: раніше друге могло пропуститися.
    await page.goto(`${base}#aCnahasgxaqgwaffBeecd`);
    await page.waitForFunction(() => document.querySelectorAll(".stigma-slot-active, .stigma-slot-advance-active").length === 8);
    await page.goto(`${base}#fBybdeBbakaib`);
    await page.waitForFunction(() => document.querySelectorAll(".stigma-slot-active, .stigma-slot-advance-active").length === 4);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("stigma calculator 4.8 takes clicks, charges stigmas and explains them in Ukrainian", async () => {
  await withSite(async (open) => {
    const { page, context, errors, origin } = await open("stigmas/gunner/");
    await page.locator('#right_stigma div.stigma[data-stigma="02"]').waitFor();
    // Звичайні кліки мишею: підказка більше не перехоплює клік, коли стає над стигмою.
    for (const code of ["02", "03", "06", "09", "10", "11"]) await page.locator(`#right_stigma div.stigma[data-stigma="${code}"]`).click();
    assert.equal(await page.evaluate(() => window.location.hash), "#jbahfd:65");
    assert.equal(await page.locator("#hidden_stigma").getAttribute("data-stigma"), "002");

    // Кнопка заточки тепер видна: картинка add.png знаходиться.
    await page.locator("section#wrap_gold1").hover();
    const plus = page.locator("section#wrap_gold1 img.enchant");
    await plus.waitFor();
    assert.ok(await plus.evaluate((image) => image.complete && image.naturalWidth > 0));
    assert.equal(await plus.getAttribute("title"), "Зарядити стигму");
    await plus.click();
    await page.locator('#enchant .button[data-value="5"]').click();
    assert.equal(await page.evaluate(() => window.location.hash), "#jbahfdvzzzzz:65");

    // Уміння із зарядкою: етапи й час — українською.
    await page.locator("#left_stigma #gold1").hover();
    const tooltip = await page.locator("#tooltip").innerText();
    assert.match(tooltip, /Етап 1/);
    assert.match(tooltip, /Час зарядки/);
    assert.match(tooltip, /Удар магією вітру/);
    assert.doesNotMatch(tooltip, /\[%/);

    await page.locator("#default_build").click();
    assert.equal(page.url(), `${origin}/aionua/stigmas/gunner/`);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("old v2 calculator addresses open the original calculators with the same build", async () => {
  await withSite(async (open) => {
    const first = await open("v2/stigma/#aCnahasgxaqgwaffBeecd");
    await first.page.waitForURL(/\/aionua\/stigma\/#aCnahasgxaqgwaffBeecd$/);
    await first.context.close();
    const second = await open("v2/stigmas/#cleric/jbghfd:65");
    await second.page.waitForURL(/\/aionua\/stigmas\/cleric\/#jbghfd:65$/);
    await second.page.waitForFunction(() => document.getElementById("hidden_stigma")?.getAttribute("data-stigma") === "001");
    await second.context.close();
  });
});
