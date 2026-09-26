// Модель калькулятора стигм 4.6: слоти за рівнем, вимоги покращених стигм, ранги й код посилання.
//
// Правила взято зі старого калькулятора (stigma/js/script.js), щоб старі посилання
// відкривали ту саму збірку. Модуль не торкається сторінки: дані передаються ззовні,
// тож його можна перевіряти й у Node.

export const NORMAL = 1;
export const ADVANCED = 2;
export const SLOT_COUNT = 6;
// Рівень персонажа, з якого відкривається кожен слот.
export const NORMAL_SLOT_LEVELS = [20, 20, 30, 40, 50, 55];
export const ADVANCED_SLOT_LEVELS = [45, 45, 50, 52, 55, 58];
export const MIN_LEVEL = 20;
export const MAX_LEVEL = 65;
export const RACES = ["pc_light", "pc_dark"];
// Порядок класів у посиланні (перше число коду — індекс у цьому списку).
export const CLASS_ORDER = [
  "priest", "chanter", "fighter", "knight", "ranger", "assassin",
  "wizard", "elementalist", "gunner", "bard", "rider",
];

export function clampLevel(level) {
  const number = Number.parseInt(level, 10);
  if (!Number.isFinite(number)) return MAX_LEVEL;
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, number));
}

// Число записується цифрами за основою 26: усі, крім останньої, — великі літери.
// 65 → "Cn", 0 → "a". Так кінець числа видно без роздільників.
export function encodeNumbers(numbers) {
  return numbers.map((number) => {
    const digits = Math.max(0, Math.trunc(number)).toString(26).split("").map((digit) => Number.parseInt(digit, 26));
    return digits.map((digit, index) => {
      const letter = String.fromCharCode(97 + digit);
      return index < digits.length - 1 ? letter.toUpperCase() : letter;
    }).join("");
  }).join("");
}

export function decodeNumbers(code) {
  const numbers = [];
  let value = 0;
  for (const char of String(code)) {
    if (char >= "A" && char <= "Z") {
      value = value * 26 + (char.charCodeAt(0) - 65);
    } else if (char >= "a" && char <= "z") {
      numbers.push(value * 26 + (char.charCodeAt(0) - 97));
      value = 0;
    } else {
      return null;
    }
  }
  return numbers;
}

export class StigmaBuild {
  constructor(stigmas, { classId = CLASS_ORDER[0], race = RACES[0], level = MAX_LEVEL } = {}) {
    this.stigmas = stigmas;
    this.classId = Object.hasOwn(stigmas, classId) ? classId : CLASS_ORDER[0];
    this.race = RACES.includes(race) ? race : RACES[0];
    this.level = clampLevel(level);
    this.slots = new Array(SLOT_COUNT * 2).fill(null);
  }

  get list() {
    return this.stigmas[this.classId];
  }

  get(key) {
    return Object.hasOwn(this.list, key) ? this.list[key] : null;
  }

  allowed(type) {
    const levels = type === NORMAL ? NORMAL_SLOT_LEVELS : ADVANCED_SLOT_LEVELS;
    return levels.filter((level) => level <= this.level).length;
  }

  // Скільки рангів стигми доступно на поточному рівні персонажа.
  maxRank(key) {
    const stigma = this.get(key);
    if (!stigma) return 0;
    return stigma.levels.filter((level) => level <= this.level).length;
  }

  slotOf(key) {
    return this.slots.findIndex((slot) => slot?.key === key);
  }

  has(key) {
    return this.slotOf(key) >= 0;
  }

  rankOf(key) {
    return this.slots[this.slotOf(key)]?.rank ?? 0;
  }

  installed() {
    return this.slots.filter(Boolean);
  }

  fitsRace(key) {
    const stigma = this.get(key);
    return Boolean(stigma) && (!stigma.race || stigma.race === this.race);
  }

  // Вимога-масив — «будь-яка з»: зазвичай варіанти для двох рас.
  resolveRequirement(requirement) {
    if (!Array.isArray(requirement)) return requirement;
    return requirement.find((key) => this.fitsRace(key)) ?? requirement[0];
  }

  requirementsMet(key) {
    return (this.get(key)?.require ?? []).every((requirement) => (
      Array.isArray(requirement) ? requirement.some((option) => this.has(option)) : this.has(requirement)
    ));
  }

  // Сама стигма й усе, що для неї потрібно, з урахуванням раси.
  required(key, found = new Set()) {
    if (found.has(key) || !this.get(key)) return found;
    found.add(key);
    for (const requirement of this.get(key).require ?? []) this.required(this.resolveRequirement(requirement), found);
    return found;
  }

  dependents(key) {
    return this.installed().map((slot) => slot.key).filter((candidate) => (
      (this.get(candidate)?.require ?? []).some((requirement) => (
        Array.isArray(requirement) ? requirement.includes(key) : requirement === key
      ))
    ));
  }

  // Звичайна стигма йде в звичайний слот, а коли їх забракне — у вільний покращений.
  freeSlot(key) {
    const current = this.slotOf(key);
    if (current >= 0) return current;
    const stigma = this.get(key);
    if (!stigma) return -1;
    if (stigma.type === NORMAL) {
      for (let index = 0; index < this.allowed(NORMAL); index += 1) {
        if (!this.slots[index]) return index;
      }
    }
    for (let index = 0; index < this.allowed(ADVANCED); index += 1) {
      if (!this.slots[SLOT_COUNT + index]) return SLOT_COUNT + index;
    }
    return -1;
  }

  canInsert(key) {
    if (!this.maxRank(key)) return false;
    const free = { normal: 0, advanced: 0 };
    for (let index = 0; index < this.allowed(NORMAL); index += 1) if (!this.slots[index]) free.normal += 1;
    for (let index = 0; index < this.allowed(ADVANCED); index += 1) if (!this.slots[SLOT_COUNT + index]) free.advanced += 1;
    const need = { normal: 0, advanced: 0 };
    for (const requiredKey of this.required(key)) {
      if (this.has(requiredKey)) continue;
      // Потрібна стигма ще недоступна на цьому рівні — збірка вийшла б неповною.
      if (!this.maxRank(requiredKey)) return false;
      if (this.get(requiredKey).type === NORMAL) need.normal += 1;
      else need.advanced += 1;
    }
    return need.advanced <= free.advanced && need.normal <= free.normal + free.advanced - need.advanced;
  }

  place(key, slot, rank) {
    if (slot < 0) return;
    const max = this.maxRank(key);
    const wanted = Number.isFinite(rank) ? rank : this.get(key).levels.length;
    this.slots[slot] = { key, rank: Math.min(max, Math.max(1, wanted)) };
  }

  // Ставить стигму; для покращеної спершу докладає все, чого їй бракує.
  // Повертає, що саме додалося, або причину відмови: level, slots, unknown.
  add(key, rank) {
    const stigma = this.get(key);
    if (!stigma) return { ok: false, reason: "unknown", added: [] };
    if (!this.maxRank(key)) return { ok: false, reason: "level", added: [] };
    if (this.has(key)) {
      this.setRank(key, rank ?? this.rankOf(key));
      return { ok: true, added: [] };
    }
    const slot = this.freeSlot(key);
    if (this.requirementsMet(key)) {
      if (slot < 0) return { ok: false, reason: "slots", added: [] };
      this.place(key, slot, rank);
      return { ok: true, added: [key] };
    }
    if (!this.canInsert(key)) return { ok: false, reason: "slots", added: [] };

    const missing = [...this.required(key)].filter((requiredKey) => !this.has(requiredKey));
    const normals = missing.filter((requiredKey) => this.get(requiredKey).type === NORMAL);
    const advanced = missing
      .filter((requiredKey) => this.get(requiredKey).type === ADVANCED)
      .sort((a, b) => this.get(a).levels[0] - this.get(b).levels[0]);
    for (const requiredKey of [...normals, ...advanced]) {
      this.place(requiredKey, this.freeSlot(requiredKey), requiredKey === key ? rank : undefined);
    }
    return { ok: true, added: [...normals, ...advanced] };
  }

  // Прибирає стигму й усе, що без неї втрачає сенс. Повертає прибрані ключі.
  remove(key) {
    const slot = this.slotOf(key);
    if (slot < 0) return [];
    this.slots[slot] = null;
    const removed = [key];
    for (const dependent of this.dependents(key)) removed.push(...this.remove(dependent));
    this.compactNormals();
    return removed;
  }

  // Звичайні стигми з покращених слотів повертаються в звичайні, щойно ті звільняться.
  compactNormals() {
    const waiting = [];
    for (let index = this.allowed(ADVANCED) - 1; index >= 0; index -= 1) {
      const slot = this.slots[SLOT_COUNT + index];
      if (slot && this.get(slot.key)?.type === NORMAL) waiting.push(SLOT_COUNT + index);
    }
    for (let index = 0; index < this.allowed(NORMAL) && waiting.length; index += 1) {
      if (this.slots[index]) continue;
      const from = waiting.shift();
      this.slots[index] = this.slots[from];
      this.slots[from] = null;
    }
  }

  setRank(key, rank) {
    const slot = this.slotOf(key);
    if (slot < 0) return;
    this.slots[slot].rank = Math.min(this.maxRank(key), Math.max(1, Number.parseInt(rank, 10) || 1));
  }

  // Стигма на максимальному ранзі лишається на максимумі й на новому рівні,
  // а вручну знижений ранг лише обрізається, якщо став недоступним.
  setLevel(level) {
    const wasMax = new Set(this.installed().filter((slot) => slot.rank >= this.maxRank(slot.key)));
    this.level = clampLevel(level);
    const locked = [];
    for (let index = this.allowed(NORMAL); index < SLOT_COUNT; index += 1) locked.push(index);
    for (let index = this.allowed(ADVANCED); index < SLOT_COUNT; index += 1) locked.push(SLOT_COUNT + index);
    for (const index of locked) if (this.slots[index]) this.remove(this.slots[index].key);
    for (const slot of this.installed()) {
      const max = this.maxRank(slot.key);
      if (!max) this.remove(slot.key);
      else slot.rank = wasMax.has(slot) ? max : Math.min(slot.rank, max);
    }
  }

  // Расові стигми міняються на аналог іншої раси, а без аналога — прибираються.
  setRace(race) {
    if (!RACES.includes(race) || race === this.race) return;
    this.race = race;
    for (const slot of this.installed()) {
      if (!/_(light|dark)$/.test(slot.key)) continue;
      const stigma = this.get(slot.key);
      const other = stigma.alt ?? slot.key.replace(/_(light|dark)$/, race === "pc_light" ? "_light" : "_dark");
      if (this.get(other)) {
        slot.key = other;
        slot.rank = Math.min(slot.rank, this.maxRank(other)) || 1;
      } else {
        this.remove(slot.key);
      }
    }
  }

  setClass(classId) {
    if (!Object.hasOwn(this.stigmas, classId) || classId === this.classId) return;
    this.classId = classId;
    this.reset();
  }

  reset() {
    this.slots.fill(null);
  }

  counts() {
    const used = (from) => this.slots.slice(from, from + SLOT_COUNT).filter(Boolean).length;
    return {
      normal: { used: used(0), allowed: this.allowed(NORMAL) },
      advanced: { used: used(SLOT_COUNT), allowed: this.allowed(ADVANCED) },
    };
  }

  cost() {
    let shards = 0;
    let abyss = 0;
    for (const { key, rank } of this.installed()) {
      const stigma = this.get(key);
      shards += stigma.shards?.[rank - 1] ?? 0;
      abyss += stigma.abyss?.[rank - 1] ?? 0;
    }
    return { shards, abyss };
  }

  // Звичайні стигми для списку (покращені йдуть деревами), за рівнем першого рангу.
  normalKeys() {
    return Object.keys(this.list)
      .filter((key) => this.get(key).type === NORMAL && this.fitsRace(key))
      .sort((a, b) => this.get(a).levels[0] - this.get(b).levels[0]);
  }

  // Дерева покращених стигм: корінь — та, яка сама нікому не потрібна.
  trees() {
    const requiredByOthers = new Set();
    for (const stigma of Object.values(this.list)) {
      if (stigma.type !== ADVANCED) continue;
      for (const requirement of stigma.require ?? []) {
        (Array.isArray(requirement) ? requirement : [requirement]).forEach((key) => requiredByOthers.add(key));
      }
    }
    const node = (key) => ({
      key,
      children: (this.get(key).require ?? []).map((requirement) => node(this.resolveRequirement(requirement))),
    });
    return Object.keys(this.list)
      .filter((key) => this.get(key).type === ADVANCED && this.fitsRace(key) && !requiredByOthers.has(key))
      .map(node);
  }

  // Код посилання, як у старому калькуляторі: клас, рівень, раса, далі пари «стигма, ранг» за слотами.
  encode() {
    const numbers = [CLASS_ORDER.indexOf(this.classId), this.level, RACES.indexOf(this.race)];
    for (const slot of this.slots) {
      if (slot) numbers.push(this.get(slot.key).ord - 1, slot.rank - 1);
    }
    return encodeNumbers(numbers);
  }

  static decode(stigmas, code) {
    const numbers = decodeNumbers(code);
    if (!numbers || numbers.length < 3) return null;
    const [classIndex, level, race, ...pairs] = numbers;
    const classId = CLASS_ORDER[classIndex];
    if (!classId || !stigmas[classId] || race > 1) return null;
    const build = new StigmaBuild(stigmas, { classId, race: RACES[race], level });
    const byOrd = new Map(Object.entries(stigmas[classId]).map(([key, stigma]) => [stigma.ord, key]));
    for (let index = 0; index + 1 < pairs.length; index += 2) {
      const key = byOrd.get(pairs[index] + 1);
      if (key) build.add(key, pairs[index + 1] + 1);
    }
    return build;
  }
}
