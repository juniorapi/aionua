// Модель калькулятора стигм 4.8: слоти, рівень, заточка, прихована стигма й код посилання.
// Без DOM, тож її можна перевіряти в Node. Правила — зі старого калькулятора (stigmas/js/handlers.min.js).
//
// Стигми класу нумеруються, як у старому калькуляторі: 1–2 головні (золоті), 3–8 великі (сині),
// 9–17 звичайні (зелені), 18–20 — три приховані. Номер мінус один — індекс у масиві skill класу.

export const MAJOR = 3;
export const GREATER = 2;
export const NORMAL = 1;
export const HIDDEN = 4;

export const MIN_LEVEL = 20;
export const MAX_LEVEL = 65;
export const MAX_ENCHANT = 10;
export const STIGMA_COUNT = 17;

// Порядок слотів — порядок у коді посилання. Звичайна стигма стає в будь-який слот,
// велика — у великий чи головний, головна — лише в головний.
export const SLOTS = [
  { id: "gold1", grade: MAJOR, level: 55 },
  { id: "blue1", grade: GREATER, level: 50 },
  { id: "blue2", grade: GREATER, level: 45 },
  { id: "green1", grade: NORMAL, level: 40 },
  { id: "green2", grade: NORMAL, level: 30 },
  { id: "green3", grade: NORMAL, level: 20 },
];

// З якого рівня персонажа стигму можна носити.
export const GRADE_LEVEL = { [MAJOR]: 55, [GREATER]: 45, [NORMAL]: 20, [HIDDEN]: 55 };

export const CLASS_ORDER = [
  "cleric", "chanter", "gladiator", "templar", "ranger", "assassin",
  "sorcerer", "spiritmaster", "gunner", "songweaver", "aethertech",
];

// Приховані стигми 18 і 19: головна стигма й будь-які дві великі з трьох; усе інше дає 20.
// preset — які дві великі ставить кнопка «Зібрати», як у старому калькуляторі.
export const LINKS = {
  templar: [{ gold: 2, blues: [4, 5, 7], preset: [4, 5] }, { gold: 1, blues: [3, 6, 8], preset: [3, 8] }],
  gladiator: [{ gold: 2, blues: [3, 5, 8], preset: [3, 5] }, { gold: 1, blues: [4, 6, 7], preset: [4, 6] }],
  ranger: [{ gold: 1, blues: [4, 5, 8], preset: [4, 5] }, { gold: 2, blues: [3, 6, 7], preset: [3, 6] }],
  assassin: [{ gold: 1, blues: [4, 5, 7], preset: [7, 5] }, { gold: 2, blues: [3, 6, 8], preset: [8, 6] }],
  sorcerer: [{ gold: 1, blues: [3, 4, 5], preset: [3, 4] }, { gold: 2, blues: [6, 7, 8], preset: [8, 6] }],
  spiritmaster: [{ gold: 1, blues: [3, 4, 5], preset: [4, 3] }, { gold: 2, blues: [6, 7, 8], preset: [8, 7] }],
  chanter: [{ gold: 1, blues: [5, 6, 7], preset: [5, 6] }, { gold: 2, blues: [3, 4, 8], preset: [8, 4] }],
  cleric: [{ gold: 2, blues: [4, 5, 6], preset: [6, 4] }, { gold: 1, blues: [3, 7, 8], preset: [3, 7] }],
  gunner: [{ gold: 1, blues: [4, 5, 7], preset: [4, 7] }, { gold: 2, blues: [3, 6, 8], preset: [3, 6] }],
  aethertech: [{ gold: 2, blues: [6, 7, 8], preset: [7, 8] }, { gold: 1, blues: [3, 4, 5], preset: [5, 3] }],
  songweaver: [{ gold: 1, blues: [4, 5, 7], preset: [4, 5] }, { gold: 2, blues: [3, 6, 8], preset: [3, 6] }],
};

const LETTERS = ["z", "l", "j", "a", "g", "i", "b", "c", "o", "d", "f", "h", "n", "e", "m", "k", "p", "q"];
const ENCHANT_LETTERS = ["z", "w", "t", "s", "x", "v", "u", "q", "n", "r", "y"];

export function gradeOf(number) {
  if (number > STIGMA_COUNT) return HIDDEN;
  if (number <= 2) return MAJOR;
  return number <= 8 ? GREATER : NORMAL;
}

export function clampLevel(value) {
  const level = Math.round(Number(value));
  if (!Number.isFinite(level)) return MAX_LEVEL;
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, level));
}

function clampEnchant(value) {
  const enchant = Math.round(Number(value));
  return Number.isFinite(enchant) ? Math.min(MAX_ENCHANT, Math.max(0, enchant)) : 0;
}

export class StigmaBuild48 {
  constructor({ classId = CLASS_ORDER[0], level = MAX_LEVEL } = {}) {
    this.classId = LINKS[classId] ? classId : CLASS_ORDER[0];
    this.level = clampLevel(level);
    this.slots = SLOTS.map(() => null);
  }

  isOpen(index) {
    return this.level >= SLOTS[index].level;
  }

  // Стигму дозволяє носити рівень персонажа.
  fits(number) {
    return this.level >= GRADE_LEVEL[gradeOf(number)];
  }

  accepts(index, number) {
    return this.isOpen(index) && gradeOf(number) <= SLOTS[index].grade;
  }

  slotOf(number) {
    return this.slots.findIndex((slot) => slot?.number === number);
  }

  has(number) {
    return this.slotOf(number) !== -1;
  }

  enchantOf(number) {
    return this.slots[this.slotOf(number)]?.enchant ?? 0;
  }

  installed() {
    return this.slots.flatMap((slot, index) => (slot ? [{ ...slot, index }] : []));
  }

  // Як у старому калькуляторі: найнижчий вільний слот, що приймає стигму, —
  // вищі лишаються для стигм вищого рангу.
  freeSlotFor(number) {
    for (let index = SLOTS.length - 1; index >= 0; index -= 1) {
      if (!this.slots[index] && this.accepts(index, number)) return index;
    }
    return -1;
  }

  canAdd(number) {
    return !this.has(number) && this.fits(number) && this.freeSlotFor(number) !== -1;
  }

  add(number, enchant = 0) {
    if (this.has(number)) return { ok: false, reason: "installed" };
    if (!this.fits(number)) return { ok: false, reason: "level" };
    const index = this.freeSlotFor(number);
    if (index === -1) return { ok: false, reason: "slots" };
    this.slots[index] = { number, enchant: clampEnchant(enchant) };
    return { ok: true, index };
  }

  remove(number) {
    const index = this.slotOf(number);
    if (index === -1) return false;
    this.slots[index] = null;
    return true;
  }

  setEnchant(number, value) {
    const slot = this.slots[this.slotOf(number)];
    if (slot) slot.enchant = clampEnchant(value);
  }

  // Стигми лишаються на місцях, поки слот відкритий; зі слота, що закрився, стигма переходить
  // у вільний відкритий, а якщо місця чи рівня бракує — знімається. Повертає зняті.
  setLevel(value) {
    this.level = clampLevel(value);
    const moving = [];
    this.slots.forEach((slot, index) => {
      if (slot && (!this.isOpen(index) || !this.fits(slot.number))) {
        moving.push(slot);
        this.slots[index] = null;
      }
    });
    return moving.filter((slot) => !this.add(slot.number, slot.enchant).ok).map((slot) => slot.number);
  }

  setClass(classId) {
    if (!LINKS[classId]) return;
    this.classId = classId;
    this.reset();
  }

  reset() {
    this.slots = SLOTS.map(() => null);
  }

  counts() {
    return {
      used: this.slots.filter(Boolean).length,
      open: SLOTS.filter((_, index) => this.isOpen(index)).length,
    };
  }

  // Прихована стигма з'являється, коли зайняті всі шість слотів, а діє — коли всі шість заряджені
  // (+1 і вище). Її заточка — найменша з шести.
  linked() {
    if (this.slots.some((slot) => !slot)) return null;
    const top = [0, 1, 2].map((index) => this.slots[index].number).sort((a, b) => a - b).join(",");
    const variant = LINKS[this.classId].findIndex((combo) =>
      [[combo.blues[0], combo.blues[1]], [combo.blues[0], combo.blues[2]], [combo.blues[1], combo.blues[2]]]
        .some((pair) => [combo.gold, ...pair].sort((a, b) => a - b).join(",") === top));
    const enchant = Math.min(...this.slots.map((slot) => slot.enchant));
    const number = variant === -1 ? 20 : 18 + variant;
    return { number, variant: number - 17, enchant, charged: enchant >= 1 };
  }

  // Ставить головну й дві великі стигми для прихованої 18 чи 19, як кнопка старого калькулятора:
  // головна — у головний слот, великі — у великі. Звичайні лишаються в зелених слотах,
  // а ті, що стояли вище, займають вільні зелені; кому місця нема — знімаються.
  applyCombo(variant) {
    const combo = LINKS[this.classId][variant - 1];
    if (!combo) return { ok: false, reason: "unknown" };
    if (!this.fits(combo.gold)) return { ok: false, reason: "level" };
    const wanted = [combo.gold, ...combo.preset];
    const before = this.installed();
    const enchant = new Map(before.map((slot) => [slot.number, slot.enchant]));
    const removed = before.filter((slot) => gradeOf(slot.number) !== NORMAL && !wanted.includes(slot.number)).map((slot) => slot.number);
    const normals = before.filter((slot) => gradeOf(slot.number) === NORMAL).sort((a, b) => b.index - a.index);
    this.reset();
    this.slots[0] = { number: combo.gold, enchant: enchant.get(combo.gold) ?? 0 };
    this.slots[2] = { number: combo.preset[0], enchant: enchant.get(combo.preset[0]) ?? 0 };
    this.slots[1] = { number: combo.preset[1], enchant: enchant.get(combo.preset[1]) ?? 0 };
    for (const slot of normals) {
      const index = slot.index >= 3 ? slot.index : [5, 4, 3].find((candidate) => !this.slots[candidate]);
      if (index === undefined || this.slots[index]) removed.push(slot.number);
      else this.slots[index] = { number: slot.number, enchant: slot.enchant };
    }
    return { ok: true, removed, added: wanted.filter((number) => !enchant.has(number)) };
  }

  encode() {
    const numbers = this.slots.map((slot) => LETTERS[slot?.number ?? 0]).join("");
    const enchants = this.slots.some((slot) => slot?.enchant)
      ? this.slots.map((slot) => ENCHANT_LETTERS[slot?.enchant ?? 0]).join("")
      : "";
    return `${numbers}${enchants}:${this.level}`;
  }

  // Код старого калькулятора: шість літер слотів, за потреби шість літер заточки й «:рівень».
  static decode(code, { classId } = {}) {
    const match = /^([a-z]{6})([a-z]{6})?(?::(\d{2}))?$/.exec(String(code ?? "").trim());
    if (!match) return null;
    const build = new StigmaBuild48({ classId, level: match[3] ?? MAX_LEVEL });
    const numbers = [...match[1]].map((letter) => LETTERS.indexOf(letter));
    const enchants = match[2] ? [...match[2]].map((letter) => ENCHANT_LETTERS.indexOf(letter)) : numbers.map(() => 0);
    if (numbers.some((number) => number === -1) || enchants.some((enchant) => enchant === -1)) return null;
    numbers.forEach((number, index) => {
      if (!number || build.has(number) || !build.accepts(index, number) || !build.fits(number)) return;
      build.slots[index] = { number, enchant: enchants[index] };
    });
    return build;
  }
}
