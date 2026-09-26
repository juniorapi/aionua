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
  ".svg": "image/svg+xml",
};

// Субота, 26.09.2026, 13:04 за Києвом (12:04 за часом EuroAion, UTC+2).
const NOW = "2026-09-26T10:04:07Z";

const online = {
  destiny: { total: 217, light: 97, dark: 120 },
  origin: { total: null, is_online: true, elyos: null, asmo: null, elyos_pct: 43, asmo_pct: 57 },
  euro: { total: null, is_online: true, elyos_pct: 55, asmo_pct: 45 },
  updated_at: "2026-09-26T10:03:00Z",
};

// Дні рахуються від понеділка (5 — субота), години — за часом сервера.
const euroSchedule = {
  serverOffset: 2,
  fetchedAt: "2026-09-26T10:04:07Z",
  events: [
    { names: ["Dredgions"], cat: "dredgion", days: [5], times: [{ s: 12, e: 14 }, { s: 21, e: 22 }] },
    { names: ["Iron Wall Warfront"], cat: "battlefield", days: [5, 6], times: [{ s: 13, e: 14 }] },
    { names: ["Tiamaranta's Hearts"], cat: "siege", days: [0, 1, 2, 3, 4, 5, 6], times: [{ s: 14, e: 15 }] },
    { names: ["Arenas: Chaos, Discipline, Harmony"], cat: "arena", days: [5, 6], times: [{ s: 18, e: 22 }] },
  ],
};

const originSchedule = {
  serverOffset: 2,
  fetchedAt: "2026-09-26T10:04:12Z",
  eventCount: 2,
  events: [
    { names: ["Terath Dredgion"], cat: "pvp", days: [5], times: [{ s: 19, e: 21 }] },
    { names: ["Tiamaranta"], cat: "siege", days: [5], times: [{ s: 20, e: 21 }] },
  ],
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

async function withSite(run) {
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      const fixtures = {
        "/aionua/data.json": online,
        "/aionua/euroaion/schedule.json": euroSchedule,
        "/aionua/originaion/schedule.json": originSchedule,
      };
      if (fixtures[pathname]) {
        response.writeHead(200, { "content-type": mimeTypes[".json"] });
        response.end(JSON.stringify(fixtures[pathname]));
        return;
      }
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

  async function open(pagePath, viewport = { width: 1440, height: 1000 }) {
    const context = await browser.newContext({ viewport, timezoneId: "Europe/Kyiv", locale: "uk-UA" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(/googletagmanager\.com|fonts\.googleapis\.com|workers\.dev/, (route) => route.abort());
    await page.clock.install({ time: new Date(NOW) });
    await page.goto(`http://127.0.0.1:${server.address().port}/aionua/${pagePath}`, { waitUntil: "domcontentloaded" });
    return { page, context, errors };
  }

  try {
    await run(open);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

test("v2 home shows live servers, upcoming events and tool search", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/");

    const destiny = page.locator('[data-server="destiny"]');
    await destiny.locator("[data-total]").filter({ hasText: "217" }).waitFor();
    assert.equal(await destiny.locator("[data-unit]").innerText(), "гравців");
    assert.equal(await destiny.locator("[data-asmo]").innerText(), "120 · 55%");
    assert.equal(await destiny.locator("[data-ely]").innerText(), "97 · 45%");

    // Origin і EuroAion без лічильника: число сховане, пояснення та відсотки видно.
    const origin = page.locator('[data-server="origin"]');
    assert.equal(await origin.locator("[data-count]").isHidden(), true);
    assert.equal(await origin.locator("[data-note]").isVisible(), true);
    assert.equal(await origin.locator("[data-asmo]").innerText(), "57%");
    assert.equal(await page.locator('[data-server="euro"] [data-state]').innerText(), "онлайн");

    const now = page.locator("[data-now-list] .now-name");
    await now.first().waitFor();
    assert.deepEqual(await now.allInnerTexts(), ["Дерадикони"]);
    assert.deepEqual(
      await page.locator("[data-next-list] .next-name").allInnerTexts(),
      ["Передова Залізної стіни", "Серця Тіамаранти", "Арени Хаосу, Дисципліни, Гармонії", "Дерадикони", "Передова Залізної стіни", "Серця Тіамаранти"],
    );
    assert.equal(await page.locator("[data-next-list] .next-in").first().innerText(), "через 56 хв");

    await page.getByRole("button", { name: "Origin Aion" }).click();
    await page.locator("[data-next-list] .next-name").filter({ hasText: "Дерадикон Терат" }).waitFor();
    assert.equal(await page.locator("[data-events-link]").getAttribute("href"), "schedule/?server=origin");

    await page.keyboard.press("/");
    await page.keyboard.type("стіг");
    const results = page.locator("#search-results a");
    assert.deepEqual(await results.locator(".result-name").allInnerTexts(), ["Стігми 4.6", "Стігми 4.8"]);
    await page.keyboard.press("Enter");
    await page.waitForURL(/\/aionua\/stigma\/$/);

    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 home fits a phone screen and opens the section menu", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/", { width: 390, height: 844 });
    await page.locator('[data-server="destiny"] [data-total]').filter({ hasText: "217" }).waitFor();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert.ok(dimensions.content <= dimensions.viewport, JSON.stringify(dimensions));

    const menu = page.getByRole("button", { name: "Меню" });
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("#site-nav").isVisible(), true);
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-v2-home-mobile.png"), fullPage: true });
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("v2 schedule shows today's timeline and the week in local time", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("v2/schedule/?server=euro");

    await page.locator(".tl-row .tl-name").filter({ hasText: "Дерадикони" }).waitFor();
    assert.equal(await page.locator("[data-server-name]").innerText(), "EuroAion");
    assert.equal(await page.locator("[data-clock-server-label]").textContent(), "Сервер (UTC+2)");
    assert.equal(await page.locator(".tl-block.is-now").count(), 1);
    assert.equal(await page.locator(".week-table thead th.is-today").textContent(), "сб, 26");

    const dredgions = page.locator(".week-table tbody tr").filter({ hasText: "Дерадикони" });
    assert.equal(await dredgions.locator("td.is-today").innerText(), "13:00–15:00\n22:00–23:00");

    await page.getByRole("button", { name: "Облоги" }).click();
    assert.deepEqual(await page.locator(".week-table tbody th[scope=row]").allInnerTexts(), ["Серця Тіамаранти"]);

    await page.getByRole("button", { name: "Origin Aion" }).click();
    await page.locator("[data-server-name]").filter({ hasText: "Origin Aion" }).waitFor();
    await page.locator(".week-table tbody th[scope=row]").filter({ hasText: "Тіамаранта" }).waitFor();
    assert.match(page.url(), /server=origin/);

    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-v2-schedule.png"), fullPage: true });
    assert.deepEqual(errors, []);
    await context.close();
  });
});
