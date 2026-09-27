// Модель калькулятора стигм 4.8. Коди зняті зі старого калькулятора (stigmas/) тими самими діями:
// його ж функціями вибору, заточки й кнопки прихованої стигми.
//
// Запуск: node --test tests/stigma48-model.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { CLASS_ORDER, HIDDEN, LINKS, StigmaBuild48, gradeOf, MAJOR, GREATER, NORMAL } from "../v2/assets/js/tools/stigma48-model.js";
import { createText48 } from "../v2/assets/js/tools/stigma48-text.js";

const root = path.resolve(import.meta.dirname, "..");
// Файли старого калькулятора виконуються так само, як на сторінці: в окремій функції.
const read = (file) => readFileSync(path.join(root, file), "utf8");
const lang = new Function("STIGMAS_LANG", `${read("stigmas/js/lang_uk.js")}\nreturn { SKILL_UK, STAT_UK, UI_UK };`)("en");
const skillsOf = (classId) => new Function(`${read(`stigmas/js/${classId}.js`)}\nreturn skill;`)();

const SLOT_IDS = ["gold1", "blue1", "blue2", "green1", "green2", "green3"];

// slots — стигми в слотах gold1, blue1, blue2, green1, green2, green3; hidden — номер прихованої (0 — нема).
const OLD = [
  { cls: "cleric", clicks: [9, 10, 11], code: "zzzhfd:65", slots: [0, 0, 0, 11, 10, 9], hidden: 0 },
  { cls: "cleric", clicks: [2, 4, 6, 9, 10, 11], code: "jbghfd:65", slots: [2, 6, 4, 11, 10, 9], hidden: 18 },
  { cls: "cleric", clicks: [2, 4, 6, 9, 10, 11], enchant: [["gold1", 3], ["green3", 10]], code: "jbghfdszzzzy:65", slots: [2, 6, 4, 11, 10, 9], hidden: 18 },
  {
    cls: "templar", clicks: [1, 3, 8, 12, 13, 14],
    enchant: [["gold1", 1], ["blue1", 2], ["blue2", 3], ["green1", 4], ["green2", 5], ["green3", 6]],
    code: "loamenwtsxvu:65", slots: [1, 8, 3, 14, 13, 12], hidden: 19,
  },
  { cls: "templar", clicks: [1, 3, 4, 12, 13, 14], code: "lgamen:65", slots: [1, 4, 3, 14, 13, 12], hidden: 20 },
  { cls: "gladiator", clicks: [3, 4, 5], code: "igazzz:65", slots: [5, 4, 3, 0, 0, 0], hidden: 0 },
  { cls: "ranger", clicks: [9, 10, 11, 12, 13], code: "zenhfd:65", slots: [0, 13, 12, 11, 10, 9], hidden: 0 },
  { cls: "assassin", level: 50, clicks: [3, 4, 9, 10, 11], code: "zgahfd:50", slots: [0, 4, 3, 11, 10, 9], hidden: 0 },
  { cls: "songweaver", level: 44, clicks: [9, 10, 11, 12], code: "zzzhfd:44", slots: [0, 0, 0, 11, 10, 9], hidden: 0 },
  { cls: "aethertech", clicks: [2, 7, 8, 15, 16, 17], enchant: [["blue2", 7]], code: "jocqpkzzqzzz:65", slots: [2, 8, 7, 17, 16, 15], hidden: 18 },
  {
    cls: "chanter", clicks: [1, 3, 4, 9, 10, 11],
    enchant: SLOT_IDS.map((id) => [id, 10]), code: "lgahfdyyyyyy:65", slots: [1, 4, 3, 11, 10, 9], hidden: 20,
  },
  { cls: "sorcerer", clicks: [9, 10, 11, 12, 13, 14], code: "menhfd:65", slots: [14, 13, 12, 11, 10, 9], hidden: 20 },
  { cls: "gunner", clicks: [2, 3, 6, 9, 10, 11], code: "jbahfd:65", slots: [2, 6, 3, 11, 10, 9], hidden: 19 },
  { cls: "spiritmaster", clicks: [1, 5, 4, 16, 17, 9], code: "lgidqp:65", slots: [1, 4, 5, 9, 17, 16], hidden: 18 },
  { cls: "gladiator", clicks: [1, 4, 7, 9, 10, 11], enchant: [["green2", 2]], code: "lcghfdzzzztz:65", slots: [1, 7, 4, 11, 10, 9], hidden: 19 },
  { cls: "ranger", clicks: [1, 5, 8, 9, 10, 11], code: "loihfd:65", slots: [1, 8, 5, 11, 10, 9], hidden: 18 },
];

// Кнопка прихованої стигми старого калькулятора на порожній збірці.
const OLD_PRESETS = [
  { cls: "cleric", variant: 1, code: "jgbzzz:65" },
  { cls: "cleric", variant: 2, code: "lcazzz:65" },
  { cls: "assassin", variant: 1, code: "liczzz:65" },
  { cls: "aethertech", variant: 2, code: "laizzz:65" },
];

function buildWith({ cls, level = 65, clicks, enchant = [] }) {
  const build = new StigmaBuild48({ classId: cls, level });
  clicks.forEach((number) => build.add(number));
  for (const [slot, value] of enchant) build.setEnchant(build.slots[SLOT_IDS.indexOf(slot)].number, value);
  return build;
}

const numbersOf = (build) => build.slots.map((slot) => slot?.number ?? 0);

test("codes, slots and the hidden stigma are the same as in the old calculator", () => {
  for (const fixture of OLD) {
    const build = buildWith(fixture);
    const label = `${fixture.cls} ${fixture.code}`;
    assert.equal(build.encode(), fixture.code, label);
    assert.deepEqual(numbersOf(build), fixture.slots, label);
    assert.equal(build.linked()?.number ?? 0, fixture.hidden, label);
  }
});

test("old codes open with the same slots and enchantment", () => {
  for (const fixture of OLD) {
    const build = StigmaBuild48.decode(fixture.code, { classId: fixture.cls });
    assert.equal(build.encode(), fixture.code, fixture.code);
    assert.deepEqual(numbersOf(build), fixture.slots, fixture.code);
  }
  assert.equal(StigmaBuild48.decode("", {}), null);
  assert.equal(StigmaBuild48.decode("abc", {}), null);
  assert.equal(StigmaBuild48.decode("zzzzz1:65", {}), null);
  // Головна стигма в зеленому слоті — такого не буває, тож слот лишається порожнім.
  assert.deepEqual(numbersOf(StigmaBuild48.decode("zzzzzl:65", { classId: "cleric" })), [0, 0, 0, 0, 0, 0]);
});

test("the hidden stigma button fills the same slots as the old one and keeps normal stigmas", () => {
  for (const { cls, variant, code } of OLD_PRESETS) {
    const build = new StigmaBuild48({ classId: cls });
    assert.equal(build.applyCombo(variant).ok, true);
    assert.equal(build.encode(), code, `${cls} ${variant}`);
  }
  const build = buildWith({ cls: "cleric", clicks: [9, 10, 11, 12, 3] });
  build.setEnchant(10, 5);
  const result = build.applyCombo(1);
  assert.deepEqual(numbersOf(build), [2, 4, 6, 11, 10, 9]);
  assert.equal(build.enchantOf(10), 5);
  assert.deepEqual(result.removed.sort((a, b) => a - b), [3, 12]);
  assert.equal(build.linked().number, 18);
  assert.equal(new StigmaBuild48({ classId: "cleric", level: 50 }).applyCombo(1).reason, "level");
});

test("level opens slots and grades; a lower level keeps what still fits", () => {
  const low = new StigmaBuild48({ classId: "cleric", level: 44 });
  assert.equal(low.add(3).reason, "level");
  assert.equal(low.add(1).reason, "level");
  assert.deepEqual(low.counts(), { used: 0, open: 3 });
  [9, 10, 11].forEach((number) => low.add(number));
  assert.equal(low.add(12).reason, "slots");

  const full = buildWith({ cls: "sorcerer", clicks: [1, 3, 4, 9, 10, 11] });
  full.setEnchant(9, 4);
  assert.deepEqual(full.setLevel(50), [1]);
  assert.deepEqual(numbersOf(full), [0, 4, 3, 11, 10, 9]);
  assert.equal(full.enchantOf(9), 4);
  // Звичайна стигма з головного слота переходить у вільний слот, коли головний закривається.
  const greens = buildWith({ cls: "sorcerer", clicks: [9, 10, 11, 12, 13, 14] });
  greens.remove(10);
  assert.deepEqual(greens.setLevel(50), []);
  assert.deepEqual(numbersOf(greens), [0, 13, 12, 11, 14, 9]);
  // На 20 рівні відкритий лише один слот: решта знімаються в порядку слотів.
  assert.deepEqual(greens.setLevel(20), [13, 12, 11, 14]);
  assert.deepEqual(numbersOf(greens), [0, 0, 0, 0, 0, 9]);
});

test("the hidden stigma works only with all six stigmas charged; its enchantment is the lowest", () => {
  const build = buildWith({ cls: "templar", clicks: [1, 3, 8, 12, 13, 14] });
  assert.deepEqual(build.linked(), { number: 19, variant: 2, enchant: 0, charged: false });
  build.installed().forEach(({ number }, index) => build.setEnchant(number, index + 2));
  build.setEnchant(13, 1);
  assert.deepEqual(build.linked(), { number: 19, variant: 2, enchant: 1, charged: true });
});

test("grades and combos cover every class", () => {
  assert.deepEqual([1, 2, 3, 8, 9, 17].map(gradeOf), [MAJOR, MAJOR, GREATER, GREATER, NORMAL, NORMAL]);
  for (const classId of CLASS_ORDER) {
    const [first, second] = LINKS[classId];
    assert.notEqual(first.gold, second.gold, classId);
    for (const combo of [first, second]) {
      assert.ok(combo.blues.every((number) => gradeOf(number) === GREATER), classId);
      assert.ok(combo.preset.every((number) => combo.blues.includes(number)), classId);
    }
  }
});

test("descriptions get the numbers the old calculator shows", () => {
  const text = createText48(lang);
  const rows = (stage) => Object.fromEntries(stage.rows.map((row) => [row.label, row.value]));
  const cleric = skillsOf("cleric");

  // «Розгортання грому», головна: на 65 рівні ранг 3; заточка +10 знімає з відкату 6 с.
  let info = text.details(cleric[1], { grade: MAJOR, level: 65, enchant: 0 });
  assert.equal(info.name, "Розгортання грому");
  assert.deepEqual([info.rank, info.max, info.level, info.available], [3, 3, 63, true]);
  assert.match(info.stages[0].lines.join(" "), /3\s190 од\. шкоди/);
  assert.deepEqual(rows(info.stages[0]), { "Ціль": "Обрана ціль", "Вартість": "598 MP", "Час використання": "3 с", "Відкат": "1 хв" });
  assert.equal(info.effect, "відкат −0,6 с");
  assert.equal(rows(text.details(cleric[1], { grade: MAJOR, level: 65, enchant: 10 }).stages[0])["Відкат"], "54 с");

  // Велика на 47 рівні — перший ранг із шести.
  info = text.details(cleric[3], { grade: GREATER, level: 47, enchant: 2 });
  assert.deepEqual([info.rank, info.max, info.level], [1, 6, 45]);
  assert.equal(rows(info.stages[0])["Відкат"], "1 хв 28,2 с");
  assert.equal(text.details(cleric[3], { grade: GREATER, level: 44 }).available, false);

  // Уміння із зарядкою: три етапи зі своєю вартістю й часом, відкат спільний.
  info = text.details(skillsOf("gunner")[1], { grade: MAJOR, level: 65, enchant: 3 });
  assert.deepEqual(info.stages.map((stage) => rows(stage)["Вартість"]), ["395 MP", "424 MP", "452 MP"]);
  assert.equal(rows(info.stages[2])["Час утримання"], "7 с");
  assert.deepEqual(info.rows, [{ label: "Відкат", value: "24 с" }]);
  assert.equal(info.condition, "Потрібно: Ефірна гармата.");

  // Опис із клієнта від іншої версії вміння — тоді англійський, зате з усіма числами.
  info = text.details(cleric[17], { grade: HIDDEN, level: 65, enchant: 3 });
  assert.equal(info.english, true);
  assert.match(info.stages[0].lines.join(" "), /by 200 and 450/);
  assert.doesNotMatch(info.stages[0].lines.join(" "), /\[%/);
});
