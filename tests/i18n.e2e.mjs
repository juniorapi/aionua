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
// Оригінальні калькулятори стигм тягнуть jQuery з CDN, якого в тестах немає: віддаємо локальну копію.
const jquery = await readFile(path.join(root, "stigma", "js", "jquery.js"), "utf8");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

// Сторінки з шапкою сайту. Англійська версія не має показувати жодної української літери.
// I18N_PAGES=craft/,spc/ — лише ці.
const PAGES = [
  "", "schedule/", "schedule/?server=origin", "schedule/?server=destiny",
  "craft/", "crystal_crafting/", "spc/", "essencetapping/", "aethertapping/", "efir/",
  "aion-4.6-enchantment-calculator/", "stigma/", "stigmas/", "localization/",
  "tempering-solution-counter/", "ice-hammer-counter/",
];
const ALLOWED = [];
const CYRILLIC = /[А-ЯЁа-яёІіЇїЄєҐґ]/;

const NOW = "2026-09-26T10:04:07Z";

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
  const base = `http://127.0.0.1:${server.address().port}/aionua/`;

  async function open(context, pagePath) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(/googletagmanager\.com|fonts\.googleapis\.com|workers\.dev|api\.github\.com/, (route) => route.abort());
    await page.route(/ajax\.googleapis\.com/, (route) => route.fulfill({ contentType: "text/javascript", body: jquery }));
    await page.clock.install({ time: new Date(NOW) });
    await page.goto(`${base}${pagePath}`, { waitUntil: "networkidle" });
    return { page, errors };
  }

  async function newContext(viewport = { width: 1440, height: 1000 }) {
    return browser.newContext({ viewport, timezoneId: "Europe/Kyiv", locale: "uk-UA" });
  }

  try {
    await run({ open, newContext });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

function withLang(pagePath, lang) {
  return `${pagePath}${pagePath.includes("?") ? "&" : "?"}lang=${lang}`;
}

// Видимий текст і підписи для екранних читачів, у яких лишилась кирилиця.
async function cyrillicLeftovers(page) {
  const found = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || !node.textContent.trim()) continue;
      if (parent.closest("script, style, template, [hidden], [aria-hidden='true']")) continue;
      const style = getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden") continue;
      out.push(node.textContent.trim());
    }
    document.querySelectorAll("[aria-label], [title], [placeholder], img[alt]").forEach((node) => {
      if (node.closest("[hidden]")) return;
      ["aria-label", "title", "placeholder", "alt"].forEach((attribute) => {
        const value = node.getAttribute(attribute);
        if (value) out.push(`${attribute}: ${value}`);
      });
    });
    document.querySelectorAll("textarea, input[type='text'], input:not([type])").forEach((field) => {
      if (field.value && !field.closest("[hidden]")) out.push(`field: ${field.value.slice(0, 200)}`);
    });
    out.push(`title: ${document.title}`);
    out.push(`description: ${document.querySelector('meta[name="description"]')?.content ?? ""}`);
    return out;
  });
  for (const frame of page.frames()) {
    if (frame === page.mainFrame()) continue;
    const text = await frame.evaluate(() => document.body?.innerText ?? "").catch(() => "");
    text.split("\n").map((line) => line.trim()).filter(Boolean).forEach((line) => found.push(`frame: ${line}`));
  }
  return found.filter((text) => CYRILLIC.test(text) && !ALLOWED.includes(text));
}

test("language switch keeps the choice across pages and in the address", async () => {
  await withSite(async ({ open, newContext }) => {
    const context = await newContext();
    const { page, errors } = await open(context, "");
    assert.equal(await page.locator("html").getAttribute("lang"), "uk");
    assert.equal(await page.locator('[data-lang-link="uk"]').getAttribute("aria-current"), "true");
    assert.equal(await page.locator("#site-nav a").first().textContent(), "Розклад");

    await page.locator('[data-lang-link="en"]').click();
    await page.waitForURL(/\?lang=en/);
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator('[data-lang-link="en"]').getAttribute("aria-current"), "true");
    assert.equal(await page.locator("#site-nav a").first().textContent(), "Schedule");

    // Наступна сторінка без ?lang= відкривається англійською: вибір запам'ятовано.
    await page.locator("#site-nav a").first().click();
    await page.waitForURL(/\/schedule\//);
    await page.waitForLoadState("networkidle");
    assert.equal(await page.locator("html").getAttribute("lang"), "en");
    assert.equal(await page.locator(".skip-link").textContent(), "Skip to main content");
    // Перемикач зберігає решту адреси.
    const uaHref = await page.locator('[data-lang-link="uk"]').getAttribute("href");
    assert.match(uaHref, /\/aionua\/schedule\/\?(.*&)?lang=uk/);

    await page.locator('[data-lang-link="uk"]').click();
    await page.waitForURL(/lang=uk/);
    assert.equal(await page.locator("html").getAttribute("lang"), "uk");
    assert.equal(await page.locator(".skip-link").textContent(), "До основного вмісту");
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("stigma calculators speak the site language", async () => {
  await withSite(async ({ open, newContext }) => {
    const context = await newContext();
    // Старий запис мови калькулятора з минулих візитів нічого не важить: діє лише мова сайту.
    await context.addInitScript(() => localStorage.setItem("stigma_lang", "uk"));
    for (const [pagePath, lang] of [["stigma/?lang=en", "en"], ["stigma/?lang=uk", "uk"], ["stigmas/?lang=en", "en"], ["stigmas/?lang=uk", "uk"]]) {
      const { page, errors } = await open(context, pagePath);
      await page.waitForSelector("[data-viewport] iframe");
      assert.match(await page.locator("[data-viewport] iframe").getAttribute("src"), new RegExp(`lang=${lang}`));
      assert.equal(await page.locator("[data-lang-switch]").count(), 0);
      assert.deepEqual(errors, []);
      await page.close();
    }
    await context.close();
  });
});

const only = (process.env.I18N_PAGES || "").split(",").map((item) => item.trim()).filter(Boolean);
const pages = only.length ? PAGES.filter((page) => only.some((item) => page.startsWith(item))) : PAGES;

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`English pages show no Ukrainian text (${viewport.width}px)`, async () => {
    await withSite(async ({ open, newContext }) => {
      const problems = {};
      for (const pagePath of pages) {
        const context = await newContext(viewport);
        const { page, errors } = await open(context, withLang(pagePath, "en"));
        await page.waitForTimeout(300);
        const left = await cyrillicLeftovers(page);
        if (await page.locator("html").getAttribute("lang") !== "en") left.unshift("html lang is not en");
        if (errors.length) left.unshift(...errors.map((error) => `page error: ${error}`));
        if (left.length) problems[pagePath || "/"] = [...new Set(left)].slice(0, 40);
        await context.close();
      }
      assert.deepEqual(problems, {});
    });
  });
}
