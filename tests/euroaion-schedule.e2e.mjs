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

test("EuroAion page renders the official schedule in the AionDestiny table style", async () => {
  const schedule = JSON.parse(await readFile(path.join(root, "euroaion", "schedule.json"), "utf8"));
  assert.equal(schedule.sourceUrl, "https://euroaion.com/ru-RU/Tools/Schedule");
  assert.equal(schedule.events.length, 18);

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
    await page.goto(`http://127.0.0.1:${port}/euroaion/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll("#schedule-body tr").length === 15);

    assert.equal(await page.locator("html").getAttribute("lang"), "uk");
    assert.equal(await page.getByRole("heading", { name: "Розклад EuroAion" }).count(), 1);
    assert.equal(await page.locator("#schedule-body tr").count(), 15);
    assert.equal(await page.locator("#schedule-body .schedule-label").first().innerText(), "Джерела Тіамаранти");
    assert.deepEqual(
      await page.locator("#schedule-body tr").first().locator("td").first().innerText(),
      "15:00-16:00\n19:00-20:00",
    );
    assert.match(
      await page.locator("#timezone-note").innerText(),
      /Вихідні дані: UTC\+2.*Europe\/(?:Kyiv|Kiev) \(UTC\+3\)/,
    );
    assert.equal(await page.getByText("Рунаторіум", { exact: true }).count(), 1);
    assert.equal(await page.getByText("Источники Тиамаранты", { exact: true }).count(), 0);
    assert.match(await page.locator("#schedule-status").innerText(), /^Оновлено .* · 18 записів$/);
    assert.ok(await page.locator(".schedule-table .highlight").count() > 1);
    assert.deepEqual(
      await page.evaluate(() => ({
        body: getComputedStyle(document.body).backgroundColor,
        heading: getComputedStyle(document.querySelector("h1")).color,
        header: getComputedStyle(document.querySelector("thead th")).backgroundColor,
      })),
      {
        body: "rgb(26, 26, 46)",
        heading: "rgb(83, 175, 204)",
        header: "rgb(80, 80, 122)",
      },
    );
    assert.deepEqual(errors, []);

    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-euroaion-desktop.png"), fullPage: true });

    await page.setViewportSize({ width: 768, height: 900 });
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-euroaion-tablet.png"), fullPage: true });

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
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-euroaion-mobile.png"), fullPage: true });

    await page.route("**/euroaion/schedule.json?*", (route) => route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ ...schedule, serverOffset: 0 }),
    }));
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll("#schedule-body tr").length === 15);
    assert.equal(
      await page.locator("#schedule-body tr").first().locator("td").first().innerText(),
      "17:00-18:00\n21:00-22:00",
    );
    assert.match(await page.locator("#timezone-note").innerText(), /Вихідні дані: UTC\+0/);
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
