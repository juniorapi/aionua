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

test("Origin Aion page renders the official weekly schedule in local time", async () => {
  const schedule = JSON.parse(await readFile(path.join(root, "originaion", "schedule.json"), "utf8"));
  assert.equal(schedule.sourceUrl, "https://originaion.com/schedule");
  assert.match(schedule.sourceAsset, /^\/_next\/static\/chunks\/.*\.js$/);
  assert.equal(schedule.eventCount, 30);
  assert.equal(new Set(schedule.events.map((event) => event.key)).size, 30);
  assert.deepEqual(new Set(schedule.events.map((event) => event.cat)), new Set(["pvp", "arenas", "siege", "rifts"]));

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
    await page.goto(`http://127.0.0.1:${port}/originaion/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll("#schedule-body .schedule-label").length === 30);

    assert.equal(await page.locator("html").getAttribute("lang"), "uk");
    assert.equal(await page.getByRole("heading", { name: "Розклад Origin Aion" }).count(), 1);
    assert.equal(await page.locator("#schedule-body .schedule-label").count(), 30);
    assert.equal(await page.locator("#schedule-body .category-row").count(), 4);
    assert.equal(await page.locator("#schedule-body .schedule-label").first().innerText(), "Дерадикон Терат");
    assert.equal(
      await page.locator("#schedule-body tr:not(.category-row)").first().locator("td").first().innerText(),
      "01:00-03:00\n13:00-15:00\n20:00-22:00",
    );
    assert.match(await page.locator("#current-time").innerText(), /Сервер \(UTC\+2\)/);
    assert.match(await page.locator("#schedule-status").innerText(), /^Оновлено .* · 30 подій$/);
    assert.equal(await page.getByText("Terath Dredgion", { exact: true }).count(), 0);
    assert.deepEqual(errors, []);

    await page.getByRole("button", { name: "Облоги" }).click();
    assert.equal(await page.locator("#schedule-body .schedule-label").count(), 15);
    assert.equal(await page.locator("#schedule-body .category-row").count(), 1);
    assert.equal(await page.getByRole("button", { name: "Облоги" }).getAttribute("aria-pressed"), "true");

    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-originaion-desktop.png"), fullPage: true });

    await page.getByRole("button", { name: "Усі події" }).click();
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
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-originaion-mobile.png"), fullPage: true });
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
