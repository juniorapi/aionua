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

test("AionDestiny page renders categorized Ukrainian schedules from GMT+3", async () => {
  const schedule = JSON.parse(await readFile(path.join(root, "aiondestiny", "schedule.json"), "utf8"));
  const uniqueEvents = new Set(schedule.events.map((event) => `${event.cat}\u0000${event.name}`));
  assert.equal(schedule.serverOffset, 3);
  assert.equal(schedule.eventCount, 31);
  assert.equal(uniqueEvents.size, 31);
  assert.deepEqual(
    new Set(schedule.events.map((event) => event.cat)),
    new Set(["pvp", "arenas", "siege", "tournaments"]),
  );

  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const filePath = path.resolve(root, `.${relativePath}`);
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
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    timezoneId: "Europe/Kyiv",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.route("**/googletagmanager.com/**", (route) => route.abort());

  try {
    const port = server.address().port;
    await page.goto(`http://127.0.0.1:${port}/aiondestiny/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll("#schedule-body .schedule-label").length === 31);

    assert.equal(await page.locator("html").getAttribute("lang"), "uk");
    assert.equal(await page.getByRole("heading", { name: "Розклад AionDestiny" }).count(), 1);
    assert.equal(await page.locator("#schedule-body .schedule-label").count(), 31);
    assert.equal(await page.locator("#schedule-body .category-row").count(), 4);
    assert.equal(await page.locator("#schedule-body .schedule-label").first().innerText(), "Дерадикон");
    assert.equal(
      await page.locator("#schedule-body .schedule-label").first().getAttribute("title"),
      "Офіційна назва: Dredgion",
    );
    assert.equal(
      await page.locator("#schedule-body tr:not(.category-row)").first().locator("td").first().innerText(),
      "00:00-02:00\n12:00-14:00\n20:00-22:00",
    );
    assert.match(await page.locator("#current-time").innerText(), /Сервер \(UTC\+3\)/);
    assert.equal(await page.locator(".schedule-note", { hasText: "2 входи" }).count(), 6);
    assert.equal(await page.getByText("Сірчана фортеця", { exact: true }).count(), 1);
    assert.equal(await page.getByText("Сірка", { exact: true }).count(), 0);
    assert.match(await page.locator("#schedule-status").innerText(), /31 подія|31 подій/);
    assert.deepEqual(errors, []);

    await page.getByRole("button", { name: "Турніри" }).click();
    assert.equal(await page.locator("#schedule-body .schedule-label").count(), 6);
    assert.equal(await page.locator("#schedule-body .category-row").count(), 1);
    assert.equal(await page.getByRole("button", { name: "Турніри" }).getAttribute("aria-pressed"), "true");
    const ffa2x2Row = page.getByRole("row", { name: /Кожен за себе 2×2/ });
    assert.match(await ffa2x2Row.innerText(), /17:30/);

    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-aiondestiny-desktop.png"), fullPage: true });

    await page.getByRole("button", { name: "Усі події" }).click();
    await page.setViewportSize({ width: 768, height: 900 });
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-aiondestiny-tablet.png"), fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    const dimensions = await page.evaluate(() => {
      const shell = document.querySelector(".table-shell");
      return {
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        tableViewport: shell.clientWidth,
        tableContent: shell.scrollWidth,
      };
    });
    assert.ok(dimensions.content <= dimensions.viewport, JSON.stringify(dimensions));
    assert.ok(dimensions.tableContent > dimensions.tableViewport, JSON.stringify(dimensions));
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-aiondestiny-mobile.png"), fullPage: true });

    await page.route("**/aiondestiny/schedule.json?*", (route) => route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ ...schedule, serverOffset: 0 }),
    }));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll("#schedule-body .schedule-label").length === 31);
    assert.equal(
      await page.locator("#schedule-body tr:not(.category-row)").first().locator("td").first().innerText(),
      "03:00-05:00\n15:00-17:00\n23:00-01:00",
    );
    assert.match(await page.locator(".server-time").innerText(), /Сервер \(UTC\+0\)/);
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
