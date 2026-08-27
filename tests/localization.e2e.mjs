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

test("localization page presents three direct client downloads", async () => {
  const htmlSource = await readFile(path.join(root, "localization", "index.html"), "utf8");
  assert.doesNotMatch(htmlSource, /\b4\.[68]\b/);
  assert.doesNotMatch(htmlSource, /\b\d{2}\.\d{2}\.\d{4}\b/);

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
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.route("**/googletagmanager.com/**", (route) => route.abort());

  try {
    const port = server.address().port;
    await page.goto(`http://127.0.0.1:${port}/localization/`, { waitUntil: "domcontentloaded" });
    await page.locator(".download-card").first().waitFor();

    assert.equal(await page.locator("html").getAttribute("lang"), "uk");
    assert.equal(await page.locator(".hero").count(), 0);
    assert.equal(await page.getByRole("heading", { name: "Оберіть свій сервер" }).count(), 1);
    assert.equal(await page.locator(".download-card").count(), 3);
    assert.deepEqual(
      await page.locator(".download-card h3").allInnerTexts(),
      ["Destiny 4.6", "Origin 4.6", "Riftshade 4.8"],
    );
    assert.deepEqual(
      await page.locator("[data-date]").allInnerTexts(),
      ["23.08.2026", "26.08.2026", "26.08.2026"],
    );
    assert.deepEqual(
      await page.locator("[data-download]").evaluateAll((links) => links.map((link) => ({
        host: new URL(link.href).host,
        id: new URL(link.href).searchParams.get("id"),
        download: link.getAttribute("download"),
      }))),
      [
        { host: "drive.usercontent.google.com", id: "1NAhj1MiWMqC4jLhZvS3XspmcyJsxEQvX", download: "AionDestinyUA.exe" },
        { host: "drive.usercontent.google.com", id: "10LDqBtWoOKNo02OF6nUHEJW3f8kQtdXx", download: "AionOriginUA.exe" },
        { host: "drive.usercontent.google.com", id: "13tWArR66NZehw5ylG3sw045b-As13wXa", download: "AionRiftshadeUA.exe" },
      ],
    );

    assert.deepEqual(
      await page.evaluate(() => ({
        body: getComputedStyle(document.body).backgroundColor,
        card: getComputedStyle(document.querySelector(".download-card")).backgroundColor,
        accent: getComputedStyle(document.querySelector(".section-kicker")).color,
        button: getComputedStyle(document.querySelector(".download-button")).backgroundColor,
      })),
      {
        body: "rgb(26, 26, 46)",
        card: "rgb(42, 42, 62)",
        accent: "rgb(255, 215, 0)",
        button: "rgb(139, 95, 95)",
      },
    );
    assert.deepEqual(errors, []);

    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-localization-desktop.png"), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    assert.ok(dimensions.content <= dimensions.viewport, JSON.stringify(dimensions));
    await page.screenshot({ path: path.join(os.tmpdir(), "aionua-localization-mobile.png"), fullPage: true });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
});
