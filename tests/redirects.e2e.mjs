// Старі адреси після переїзду нової версії в корінь сайту: розклади серверів, /v2/… і лічильники в OBS.
//
// Запуск: node --test tests/redirects.e2e.mjs
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
const mimeTypes = { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };

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
  const executablePath = [process.env.CHROME_PATH, chromium.executablePath()].find((candidate) => candidate && existsSync(candidate));
  const browser = await chromium.launch({ headless: true, executablePath });
  const origin = `http://127.0.0.1:${server.address().port}`;
  async function open(pagePath, { obs = false } = {}) {
    const context = await browser.newContext({ locale: "uk-UA" });
    const page = await context.newPage();
    // Джерело «Браузер» в OBS: сторінка бачить window.obsstudio.
    if (obs) await page.addInitScript(() => { window.obsstudio = { pluginVersion: "test" }; });
    await page.route(/googletagmanager\.com|fonts\.googleapis\.com|workers\.dev|api\.github\.com/, (route) => route.abort());
    await page.goto(`${origin}/aionua/${pagePath}`, { waitUntil: "load" });
    return { page, context };
  }
  try {
    await run(open, origin);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

test("old schedule pages open the schedule with their server", async () => {
  await withSite(async (open) => {
    for (const [page, server] of [["euroaion/", "euro"], ["originaion/", "origin"], ["aiondestiny/", "destiny"]]) {
      const opened = await open(page);
      await opened.page.waitForURL(new RegExp(`/aionua/schedule/\\?server=${server}$`));
      await opened.page.locator(`[data-server-button="${server}"][aria-pressed="true"]`).waitFor();
      await opened.context.close();
    }
  });
});

test("v2 addresses lead to the same page at the site root, with query and build", async () => {
  await withSite(async (open) => {
    const cases = [
      ["v2/", /\/aionua\/$/],
      ["v2/schedule/?server=origin", /\/aionua\/schedule\/\?server=origin$/],
      ["v2/craft/", /\/aionua\/craft\/$/],
      ["v2/localization/", /\/aionua\/localization\/$/],
      ["v2/tempering-solution-counter/overlay.html?lang=de&bg=green", /\/aionua\/tempering-solution-counter\/overlay\.html\?lang=de&bg=green$/],
    ];
    for (const [from, to] of cases) {
      const { page, context } = await open(from);
      await page.waitForURL(to);
      await context.close();
    }
  });
});

test("old counter address in OBS shows the overlay with the same count", async () => {
  await withSite(async (open) => {
    // Звичайний браузер бачить сторінку налаштувань.
    const plain = await open("ice-hammer-counter/");
    assert.match(plain.page.url(), /\/ice-hammer-counter\/$/);
    await plain.page.locator("[data-counter-page]").waitFor();
    await plain.context.close();

    const { page, context } = await open("tempering-solution-counter/", { obs: true });
    await page.waitForURL(/\/tempering-solution-counter\/overlay\.html\?lang=en$/);
    await page.evaluate(() => { localStorage.setItem("waterCount", "41"); });
    await page.reload();
    assert.equal(await page.locator("[data-count]").innerText(), "41");
    assert.equal(await page.locator("[data-label]").textContent(), "Loot Counter");
    await context.close();
  });
});
