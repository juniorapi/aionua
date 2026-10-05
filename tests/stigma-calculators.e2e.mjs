// Сторінки стигм 4.6 (stigma/) і 4.8 (stigmas/) з оригінальними калькуляторами в рамці
// (stigma/calculator/ і stigmas/<клас>/) та перенаправлення зі старих адрес.
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

  async function open(pagePath, { viewport = { width: 1280, height: 950 } } = {}) {
    const context = await browser.newContext({ viewport, locale: "uk-UA" });
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

// Рамка з калькулятором: для evaluate потрібен сам фрейм, а не локатор.
async function calculatorFrame(page) {
  await page.locator('[data-viewport][data-state="ready"]').waitFor();
  return page.locator("[data-viewport] iframe").contentFrame();
}

async function skillTooltip(page, calc, name) {
  const frame = await (await page.locator("[data-viewport] iframe").elementHandle()).contentFrame();
  const index = await frame.evaluate((skillName) => window.skill.findIndex((item) => item.name === skillName), name);
  await calc.locator("#stigma_info").hover();
  await calc.locator(`#right_stigma div.stigma[data-stigma="${String(index + 1).padStart(2, "0")}"]`).hover();
  return calc.locator("#tooltip").innerText();
}

test("stigma page 4.6 shows the original calculator in the site design and keeps the build in its address", async () => {
  await withSite(async (open) => {
    const { page, context, errors, origin } = await open("stigma/");
    const base = `${origin}/aionua/stigma/`;
    const calc = await calculatorFrame(page);
    assert.equal(await page.locator("h1").innerText(), "Стигми 4.6");
    assert.equal(await page.locator('.site-nav a[aria-current="true"]').innerText(), "Калькулятори");
    assert.equal(await page.getByRole("link", { name: "Патч 4.6" }).getAttribute("aria-current"), "page");

    // Калькулятор — оригінальний, але без власного фону, кнопки «Назад» і підвалу; у куті — «4.6».
    await calc.locator(".stigma-free").first().waitFor();
    assert.equal(await calc.locator(".back-button").isVisible(), false);
    assert.equal(await calc.locator(".footer-text").isVisible(), false);
    assert.equal(await calc.locator("body").evaluate((body) => getComputedStyle(body).backgroundImage), "none");
    assert.equal(await calc.locator("#version_layer").evaluate((layer) => getComputedStyle(layer, "::before").content), '"4.6"');
    assert.equal(await calc.locator("#stigma_link").inputValue(), base);

    // Збірка йде в адресу сторінки, і поле з посиланням показує саме її; порожня збірка — чиста адреса.
    await calc.locator(".stigma-free").first().click();
    await page.waitForURL(/\/aionua\/stigma\/#[a-zA-Z]+$/);
    assert.equal(await calc.locator("#stigma_link").inputValue(), page.url());
    await calc.locator("#stigma_nor_1").hover();
    await calc.locator("#stigma_nor_1 .stigma-delete").click();
    await page.waitForURL(base);

    // Посилання на збірку відкриває її, а новий код в адресі — нову збірку.
    const active = () => calc.locator(".stigma-slot-active, .stigma-slot-advance-active").count();
    await page.goto(`${base}#aCnahasgxaqgwaffBeecd`);
    await calc.locator("#stigma_nor_1.stigma-slot-active").waitFor();
    assert.equal(await active(), 8);
    await page.evaluate(() => { window.location.hash = "fBybdeBbakaib"; });
    await page.waitForFunction(() => document.querySelector('[data-viewport][data-state="ready"] iframe')?.contentDocument
      ?.querySelectorAll(".stigma-slot-active, .stigma-slot-advance-active").length === 4);
    assert.equal(page.url(), `${base}#fBybdeBbakaib`);

    // Мова перемикається на сторінці, збірка лишається.
    await page.getByRole("button", { name: "English" }).click();
    await page.waitForFunction(() => /lang=en/.test(document.querySelector('[data-viewport][data-state="ready"] iframe')?.src ?? ""));
    await calc.locator("#stigma_nor_1.stigma-slot-active").waitFor();
    assert.equal(await active(), 4);
    assert.equal(await page.getByRole("button", { name: "English" }).getAttribute("aria-pressed"), "true");
    assert.equal(page.url(), `${base}#fBybdeBbakaib`);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("stigma page 4.8 switches classes, charges stigmas and shares links to itself", async () => {
  await withSite(async (open) => {
    const { page, context, errors, origin } = await open("stigmas/#cleric/jbghfd:65");
    const base = `${origin}/aionua/stigmas/`;
    const calc = await calculatorFrame(page);
    await calc.locator('#hidden_stigma[data-stigma="001"]').waitFor();
    assert.equal(await page.locator('[data-class="cleric"]').getAttribute("aria-current"), "page");
    assert.match(await page.title(), /^Цілитель · Калькулятор стигм 4\.8/);
    assert.equal(await page.getByRole("link", { name: "Патч 4.8" }).getAttribute("aria-current"), "page");
    // Заголовок, ряд класів і підвал калькулятора дає сама сторінка.
    assert.equal(await calc.locator("h1").isVisible(), false);
    assert.equal(await calc.locator("#classes").isVisible(), false);
    assert.equal(await calc.locator("#footer").isVisible(), false);

    // Інший клас — у рамці його калькулятор, в адресі — його назва.
    await page.locator('[data-class="gunner"]').click();
    await page.waitForURL(`${base}#gunner`);
    await calc.locator('#hidden_stigma[data-stigma="000"]').waitFor();
    assert.match(await calc.locator(".name_class").innerText(), /Снайпер/);
    assert.equal(await page.locator('[data-class="gunner"]').getAttribute("aria-current"), "page");
    // Звичайні кліки мишею: підказка не перехоплює клік, коли стає над стигмою.
    for (const code of ["02", "03", "06", "09", "10", "11"]) await calc.locator(`#right_stigma div.stigma[data-stigma="${code}"]`).click();
    await page.waitForURL(`${base}#gunner/jbahfd:65`);
    assert.equal(await calc.locator("#hidden_stigma").getAttribute("data-stigma"), "002");

    // Кнопка заточки видна (картинка add.png знаходиться) і заряджає стигму.
    await calc.locator("section#wrap_gold1").hover();
    const plus = calc.locator("section#wrap_gold1 img.enchant");
    await plus.waitFor();
    assert.ok(await plus.evaluate((image) => image.complete && image.naturalWidth > 0));
    assert.equal(await plus.getAttribute("title"), "Зарядити стигму");
    await plus.click();
    await calc.locator('#enchant .button[data-value="5"]').click();
    await page.waitForURL(`${base}#gunner/jbahfdvzzzzz:65`);

    // Уміння із зарядкою: етапи, час і потрібна зброя — українською.
    await calc.locator("#left_stigma #gold1").hover();
    const tooltip = await calc.locator("#tooltip").innerText();
    assert.match(tooltip, /Етап 1/);
    assert.match(tooltip, /Час зарядки/);
    assert.match(tooltip, /Удар магією вітру/);
    assert.match(tooltip, /Потрібно: Ефірна гармата\./);
    assert.doesNotMatch(tooltip, /\[%/);
    // Опис, якого немає в паку, перекладено з даних калькулятора.
    const armorBreak = await skillTooltip(page, calc, "ArmorBreak");
    assert.match(armorBreak, /Удар магією вітру, завдає/);
    assert.doesNotMatch(armorBreak, /Inflicts|\[%/);

    // «Отримати посилання» дає адресу цієї сторінки.
    let shared = "";
    page.once("dialog", async (prompt) => {
      shared = prompt.defaultValue();
      await prompt.dismiss();
    });
    await calc.locator("#link_build").click();
    assert.equal(shared, `${base}#gunner/jbahfdvzzzzz:65`);

    await calc.locator("#default_build").click();
    await page.waitForURL(`${base}#gunner`);
    // Повторний клік по своєму класу нічого не скидає, а основний клас дає чисту адресу.
    await page.locator('[data-class="gunner"]').click();
    assert.equal(page.url(), `${base}#gunner`);
    await page.locator('[data-class="templar"]').click();
    await page.waitForURL(base);
    await calc.locator(".name_class").filter({ hasText: "Охоронець" }).waitFor();
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("stigma calculator 4.8 keeps zeros and percent values in Ukrainian descriptions", async () => {
  await withSite(async (open) => {
    const { page, context, errors } = await open("stigmas/#ranger");
    const calc = await calculatorFrame(page);
    await calc.locator(".name_class").filter({ hasText: "Стрілець" }).waitFor();
    // Уміння без росту за рівнем раніше перетворювали кожен нуль в описі на «NaN».
    const trap = await skillTooltip(page, calc, "Light_BlazingTrap");
    assert.match(trap, /потрібно 20 насіння трипіда/);
    assert.doesNotMatch(trap, /NaN/);

    await page.locator('[data-class="songweaver"]').click();
    await calc.locator(".name_class").filter({ hasText: "Бард" }).waitFor();
    // Ключ у даних зі знаком «%»: число підставляється, а не лишається «[%e1...]».
    const boost = await skillTooltip(page, calc, "PlayingStylesChangeB");
    assert.match(boost, /Сила магії \+\d+/);
    assert.doesNotMatch(boost, /\[%/);
    assert.deepEqual(errors, []);
    await context.close();
  });
});

test("stigma pages fit a phone screen", async () => {
  await withSite(async (open) => {
    const phone = { viewport: { width: 390, height: 844 } };
    const first = await open("stigma/#aCnahasgxaqgwaffBeecd", phone);
    await (await calculatorFrame(first.page)).locator("#stigma_nor_1.stigma-slot-active").waitFor();
    const fit46 = await first.page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      frame: document.querySelector("[data-viewport] iframe").getBoundingClientRect().width,
    }));
    assert.ok(fit46.page <= 390, JSON.stringify(fit46));
    assert.ok(fit46.frame <= 390, JSON.stringify(fit46));
    assert.deepEqual(first.errors, []);
    await first.context.close();

    // У вузькій рамці 4.8 ставить слоти над списком стигм, щоб не дрібнішати.
    const second = await open("stigmas/#cleric/jbghfd:65", phone);
    const calc = await calculatorFrame(second.page);
    await calc.locator('#hidden_stigma[data-stigma="001"]').waitFor();
    const left = await calc.locator("#left_stigma").boundingBox();
    const right = await calc.locator("#right_stigma").boundingBox();
    assert.ok(right.y > left.y + left.height, JSON.stringify({ left, right }));
    assert.ok(await second.page.evaluate(() => document.documentElement.scrollWidth <= 390));
    assert.deepEqual(second.errors, []);
    await second.context.close();
  });
});

test("old addresses of the calculators open the stigma pages with the same build", async () => {
  await withSite(async (open) => {
    const cases = [
      ["v2/stigma/#aCnahasgxaqgwaffBeecd", /\/aionua\/stigma\/#aCnahasgxaqgwaffBeecd$/],
      ["v2/stigmas/#cleric/jbghfd:65", /\/aionua\/stigmas\/#cleric\/jbghfd:65$/],
      // Калькулятор, відкритий напряму (стара закладка), веде на сторінку сайту.
      ["stigma/calculator/#aCnahasgxaqgwaffBeecd", /\/aionua\/stigma\/#aCnahasgxaqgwaffBeecd$/],
      ["stigmas/cleric/#jbghfd:65", /\/aionua\/stigmas\/#cleric\/jbghfd:65$/],
      ["stigmas/templar/", /\/aionua\/stigmas\/$/],
    ];
    for (const [from, to] of cases) {
      const { page, context } = await open(from);
      await page.waitForURL(to);
      await page.locator('[data-viewport][data-state="ready"]').waitFor();
      await context.close();
    }
    const { page, context } = await open("stigmas/cleric/#jbghfd:65");
    await page.waitForURL(/#cleric\/jbghfd:65$/);
    await (await calculatorFrame(page)).locator('#hidden_stigma[data-stigma="001"]').waitFor();
    await context.close();
  });
});
