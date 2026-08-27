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

function launchBrowser() {
  const executablePath = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    chromium.executablePath(),
  ].find((candidate) => candidate && existsSync(candidate));
  if (!executablePath) throw new Error("Chromium or Google Chrome is required");
  return chromium.launch({ headless: true, executablePath });
}

test("home page displays Origin Aion online from collected data", async () => {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://127.0.0.1");
      if (url.pathname === "/aionua/data.json") {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({
          destiny: { total: 217, light: 97, dark: 120 },
          origin: { total: 525, is_online: true },
          euro: { total: 150, elyos_pct: 46, asmo_pct: 54 },
          updated_at: "2026-08-27T07:24:48Z",
        }));
        return;
      }

      const relativePath = url.pathname === "/aionua/"
        ? "index.html"
        : url.pathname.replace(/^\/aionua\//, "");
      const filePath = path.resolve(root, relativePath);
      if (!filePath.startsWith(root)) throw new Error("Path outside repository");
      const payload = await readFile(filePath);
      const contentType = path.extname(filePath) === ".css"
        ? "text/css; charset=utf-8"
        : "text/html; charset=utf-8";
      response.writeHead(200, { "content-type": contentType });
      response.end(payload);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/googletagmanager.com/**", (route) => route.abort());
  await page.route("**/fonts.googleapis.com/**", (route) => route.abort());

  try {
    const port = server.address().port;
    await page.goto(`http://127.0.0.1:${port}/aionua/`, { waitUntil: "domcontentloaded" });
    await page.locator("#origin-total").waitFor();
    await page.waitForFunction(() => document.querySelector("#origin-total")?.textContent === "525");

    assert.equal(await page.locator("#origin-total").innerText(), "525");
    assert.equal(await page.getByText("Origin Aion", { exact: true }).count(), 1);
    assert.deepEqual(
      await page.locator(".online-bar .bar-server").allInnerTexts(),
      ["EuroAion", "Origin Aion", "AionDestiny"],
    );
    assert.equal(await page.locator("#origin-status-dot").getAttribute("class"), "status-dot");
    assert.deepEqual(errors, []);

    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-home-online-desktop.png"), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert.ok(dimensions.content <= dimensions.viewport, JSON.stringify(dimensions));
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-home-online-mobile.png"), fullPage: true });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
