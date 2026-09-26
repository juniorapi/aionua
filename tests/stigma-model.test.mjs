// Модель калькулятора стигм 4.6 на справжніх даних старого калькулятора.
//
// Запуск: node --test tests/stigma-model.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

import { StigmaBuild, decodeNumbers, encodeNumbers } from "../v2/assets/js/tools/stigma-model.js";
import { createText } from "../v2/assets/js/tools/stigma-text.js";

const root = path.resolve(import.meta.dirname, "..");

// Дані підключаються так само, як на сторінці: заглушка, потім файли старого калькулятора.
function loadData() {
  const context = {};
  context.window = context;
  vm.createContext(context);
  const files = [
    "v2/assets/js/tools/legacy-shim.js",
    "stigma/js/data.js",
    "stigma/js/lang_enn.js",
    "stigma/js/lang_en.js",
    "stigma/js/lang_uk.js",
    "stigma/js/vals.js",
  ];
  for (const file of files) vm.runInContext(readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  return { stigmas: context.stigmas, values: context.stigmaValues, lang: context.lang };
}

const { stigmas, values, lang } = loadData();

// Коди зняті зі старого калькулятора (stigma/) тими самими діями.
const OLD_LINKS = [
  { classId: "priest", race: "pc_light", level: 65, add: ["pr_calllightning"], code: "aCnahasgxaqgwaffBeecd" },
  { classId: "assassin", race: "pc_dark", level: 50, add: ["as_blindside", "as_explosionpoison"], code: "fBybdeBbakaib" },
  {
    classId: "fighter", race: "pc_light", level: 65,
    add: ["fi_potentialhealth", "p_equip_dual", "fi_cripplingcut", "fi_enfeeblehit", "fi_anklegrab", "fi_revengeslash", "fi_lockdownimpact", "fi_howling"],
    code: "cCnaqaBgbhhjgaasgoflc",
  },
];

function buildWith({ classId, race, level, add }) {
  const build = new StigmaBuild(stigmas, { classId, race, level });
  add.forEach((key) => build.add(key));
  return build;
}

test("links are the same as in the old calculator", () => {
  for (const link of OLD_LINKS) {
    assert.equal(buildWith(link).encode(), link.code, link.classId);
    assert.equal(StigmaBuild.decode(stigmas, link.code).encode(), link.code, `${link.classId} round trip`);
  }
});

test("numbers are written in base 26 with capitals for leading digits", () => {
  assert.equal(encodeNumbers([0, 65, 0]), "aCna");
  assert.deepEqual(decodeNumbers("aCna"), [0, 65, 0]);
  assert.equal(decodeNumbers("aC1a"), null);
  assert.equal(StigmaBuild.decode(stigmas, "zz"), null);
  assert.equal(StigmaBuild.decode(stigmas, ""), null);
});

test("an advanced stigma brings every stigma it needs", () => {
  const build = new StigmaBuild(stigmas, { classId: "priest" });
  const result = build.add("pr_calllightning");
  assert.equal(result.ok, true);
  assert.deepEqual(new Set(result.added), build.required("pr_calllightning"));
  for (const { key } of build.installed()) assert.equal(build.requirementsMet(key), true, key);
  assert.deepEqual(build.counts(), { normal: { used: 3, allowed: 6 }, advanced: { used: 5, allowed: 6 } });
});

test("normal stigmas overflow into advanced slots and move back when a normal slot frees up", () => {
  const build = buildWith(OLD_LINKS[2]);
  assert.deepEqual(build.counts(), { normal: { used: 6, allowed: 6 }, advanced: { used: 2, allowed: 6 } });
  build.remove("fi_potentialhealth");
  assert.deepEqual(build.counts(), { normal: { used: 6, allowed: 6 }, advanced: { used: 1, allowed: 6 } });
});

test("removing a required stigma removes everything built on it", () => {
  const build = new StigmaBuild(stigmas, { classId: "priest" });
  build.add("pr_calllightning");
  const [firstNormal] = [...build.required("pr_calllightning")].filter((key) => build.get(key).type === 1);
  const removed = build.remove(firstNormal);
  assert.ok(removed.includes("pr_calllightning"), removed.join(", "));
  for (const { key } of build.installed()) assert.equal(build.requirementsMet(key), true, key);
});

test("level decides open slots and ranks; max ranks follow the level back up", () => {
  const build = new StigmaBuild(stigmas, { classId: "priest" });
  build.add("pr_calllightning");
  build.add("pr_bindingheal");
  build.setRank("pr_bindingheal", 1);
  build.setLevel(44);
  assert.deepEqual(build.counts().advanced, { used: 0, allowed: 0 });
  for (const { key, rank } of build.installed()) assert.ok(rank <= build.maxRank(key), key);
  const chainNormal = build.installed().find(({ key }) => build.get(key).levels.length > 1);
  build.setLevel(65);
  assert.equal(chainNormal.rank, build.maxRank(chainNormal.key), "max rank grows with level");
  assert.equal(build.has("pr_bindingheal"), false, "48-level stigma is gone at 44");
});

test("switching race swaps race-specific stigmas for their counterparts", () => {
  const build = new StigmaBuild(stigmas, { classId: "priest", race: "pc_light" });
  assert.equal(build.add("pr_stigma_divinesanctuary_light").ok, true);
  build.setRace("pc_dark");
  assert.equal(build.has("pr_stigma_divinesanctuary_light"), false);
  assert.equal(build.has("pr_stigma_abysalsanctuary_dark"), true);
});

test("adding explains why it cannot", () => {
  const low = new StigmaBuild(stigmas, { classId: "priest", level: 20 });
  assert.equal(low.add("pr_bindingheal").reason, "level");
  const full = buildWith(OLD_LINKS[2]);
  const spare = full.normalKeys().filter((key) => !full.has(key));
  spare.slice(0, 4).forEach((key) => full.add(key));
  assert.equal(full.add(spare[4]).reason, "slots");
});

test("descriptions get the numbers of the chosen rank", () => {
  const text = createText(lang, values);
  const [stage] = text.stages("pr_calllightning", 2);
  assert.match(stage.text, /2445/);
  assert.match(stage.text, /25 м/);
  assert.deepEqual(stage.rows.map((row) => row.value), ["420 MP", "3 с", "2 хв"]);
  assert.equal(text.name("pr_calllightning"), "Розкати грому");
  // Ланцюжок: друге вміння з'являється лише на старших рангах.
  assert.equal(text.stages("as_stunburst", 2).length, 1);
  assert.equal(text.stages("as_stunburst", 4).length, 2);
});
