// Тексти стигм 4.8: назва, опис із числами рангу й заточки, вартість, час використання й відкат.
//
// Дані — масив skill класу зі старого калькулятора (stigmas/js/<клас>.js), переклад — словники
// SKILL_UK і STAT_UK з stigmas/js/lang_uk.js. Ранг уміння залежить від рівня персонажа,
// заточка змінює одне число рангу (вартість, відкат чи силу ефекту), як у старому калькуляторі.
import { formatNumber } from "../format.js";
import { GRADE_LEVEL, GREATER, HIDDEN, MAJOR, NORMAL } from "./stigma48-model.js";

export const GRADE_NAMES = { [MAJOR]: "Головна", [GREATER]: "Велика", [NORMAL]: "Звичайна", [HIDDEN]: "Прихована" };

const TAGS = {
  Attack: "Атака", Buff: "Підсилення", Debuff: "Послаблення", Healing: "Зцілення", Special: "Особливе",
  Summon: "Призов", Stun: "Оглушення", Sleep: "Сон", Trap: "Пастка", Stealth: "Непомітність", Dispel: "Зняття ефектів",
  "Rune Engraving": "Нанесення клейма", "Abnormal Condition": "Негативний стан", "Area of Effect": "Область дії",
  "Pistol Shot": "Постріл із пістолета", "Aethercannon Shot": "Постріл з ефірної гармати",
};
const TYPES = { Magical: "Магічне", Physical: "Фізичне" };
const SUBTYPES = {
  Attack: "атака", Buff: "підсилення", Debuff: "послаблення", Heal: "зцілення", None: "уміння",
  Summon: "призов", SummonTrap: "пастка", SummonHoming: "самонавідний призов",
};
const ACTIONS = {
  self: "На себе", target: "Обрана ціль", selfortarget: "На себе або обрану ціль", around: "Область навколо себе",
  point: "Вказане місце", party: "Член групи", zone: "Область навколо цілі", summon: "Вихованець",
  partywithpet: "Група й вихованці",
};
const CONDITIONS = {
  sword: "меч", mace: "булава", dagger: "кинджал", "2hsword": "дворучний меч", polearm: "древкова зброя",
  harp: "арфа", bow: "лук", orb: "орб", book: "книга заклинань", gun: "пістолет", cannon: "ефірна гармата",
  keyblade: "шифр-клинок", shield: "щит", melee: "зброя ближнього бою", ride_robot: "у бойовому механізмі",
};
const MELEE = ["sword", "mace", "dagger", "2hsword", "polearm"];
// Що підсилює одна заточка, коли це не вартість і не відкат.
const EFFECTS = {
  dmg: "шкода", GateCrush: "додаткова шкода", reflector: "відбита шкода", dodge: "ухилення",
  HealSkillBoost: "сила зцілення", physicalDefend: "фіз. захист", MagicalHitAccuracy: "маг. точність",
};

function levelCount(skill) {
  return Array.isArray(skill.lvls) ? skill.lvls.length : Object.keys(skill.lvls ?? {}).length;
}

function levelData(skill, rank) {
  return Array.isArray(skill.lvls) ? skill.lvls[rank - 1] : skill.lvls?.[`lvl_${rank}`];
}

function toNumber(value) {
  if (typeof value === "number") return value;
  const text = String(value ?? "").replace(/[\s  ]/g, "");
  return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : null;
}

const signed = (value) => `${value > 0 ? "+" : "−"}${formatNumber(Math.abs(value))}`;

// 90000 → «1 хв 30 с», 1500 → «1,5 с».
export function duration(ms) {
  const total = Number(ms) / 1000;
  if (!Number.isFinite(total) || total < 0) return "—";
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total - hours * 3600) / 60);
  const seconds = Math.round((total - hours * 3600 - minutes * 60) * 10) / 10;
  const parts = [];
  if (hours) parts.push(`${hours} год`);
  if (minutes) parts.push(`${minutes} хв`);
  if (seconds || !parts.length) parts.push(`${formatNumber(seconds)} с`);
  return parts.join(" ");
}

// Ранг уміння за рівнем персонажа: головні й приховані — з 55 кожні 4 рівні, великі — з 45
// кожні 4, звичайні — з 20 кожні 6 (кожні 5, якщо рангів більше восьми).
export function rankFor(skill, grade, level) {
  const max = levelCount(skill);
  const base = GRADE_LEVEL[grade];
  const step = grade === NORMAL ? ((Number(skill.lvl) || max) > 8 ? 5 : 6) : 4;
  if (level < base) return { rank: 1, max, level: base, available: false };
  const rank = Math.max(1, Math.min(Math.floor((level - base) / step) + 1, max));
  return { rank, max, level: base + step * (rank - 1), available: true };
}

export function createText48({ SKILL_UK = {}, STAT_UK = {} } = {}) {
  function name(skill) {
    return SKILL_UK[skill?.name]?.n ?? String(skill?.name_l10n ?? skill?.name ?? "").trim();
  }

  function ruleValue(raw) {
    const number = toNumber(raw);
    if (number !== null) return formatNumber(number);
    const text = String(raw ?? "").trim();
    const time = /^(\d+(?:\.\d+)?)\s*(sec|min|hour)$/.exec(text);
    if (time) return `${formatNumber(Number(time[1]))} ${{ sec: "с", min: "хв", hour: "год" }[time[2]]}`;
    return STAT_UK[text] ?? text;
  }

  // Плейсхолдери замінюються всі, без огляду на регістр: у перекладі й у rules він буває різний.
  function substitute(source, rules) {
    let text = String(source ?? "");
    for (const key of Object.keys(rules).sort((a, b) => b.length - a.length)) {
      const pattern = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      text = text.replace(pattern, () => ruleValue(rules[key]));
    }
    return text;
  }

  const unresolved = (source, rules) => (substitute(source, rules).match(/\[%[^\]]*\]/g) ?? []).length;

  // Деякі описи з клієнта належать іншій версії вміння, і чисел для них у даних 4.8 немає.
  // Тоді беремо англійський опис, що точно відповідає даним, — краще, ніж порожні місця.
  function template(uk, english, rules) {
    if (!uk) return english;
    if (!english || !unresolved(uk, rules)) return uk;
    return unresolved(english, rules) < unresolved(uk, rules) ? english : uk;
  }

  function fill(text, rules) {
    return substitute(text, rules)
      .replace(/\[%[^\]]*\]%?/g, "—")
      .replace(/%%%/g, "%")
      .replace(/%%/g, "%")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function costText(cost, value) {
    if (!cost || cost === "none" || !cost.type) return "Немає";
    const every = Number(cost.timer) ? ` кожні ${duration(cost.timer)}` : "";
    const type = String(cost.type).toUpperCase();
    if (type === "MP_RATIO") return `${formatNumber(value)}% MP${every}`;
    if (type === "HP") return `${formatNumber(value)} HP${every}`;
    return `${formatNumber(value)} MP${every}`;
  }

  // Заточка +N множить приріст на N + 1: так у даних закладено базове значення (див. getSkill старого калькулятора).
  function enchanted(part, enchant) {
    const times = enchant + 1;
    const rules = { ...(part?.rules ?? {}) };
    let cost = toNumber(part?.cost?.value) ?? 0;
    let cooldown = 0;
    let effect = null;
    const up = part?.lv_up;
    const step = toNumber(up?.value);
    if (up && step !== null && step !== 0) {
      if (up.type === "MP") {
        cost += step * times;
        effect = `вартість ${signed(step)} MP`;
      } else if (up.type === "cd") {
        cooldown = step * times;
        effect = `відкат ${signed(step / 1000)} с`;
      } else {
        for (const key of Array.isArray(up.param) ? up.param : [up.param]) {
          const base = toNumber(rules[key]);
          if (base !== null) rules[key] = base + step * times;
        }
        effect = `${EFFECTS[up.type] ?? "сила ефекту"} ${signed(step)}`;
      }
    }
    return { rules, cost, cooldown, effect };
  }

  function pvpRows(source) {
    const rows = [];
    if (source?.pvp_time !== undefined) rows.push({ label: "PvP: тривалість", value: `${source.pvp_time}%` });
    if (source?.pvp_damage !== undefined) rows.push({ label: "PvP: шкода", value: `${source.pvp_damage}%` });
    return rows;
  }

  function condition(skill) {
    let parts = String(skill.condition ?? "").split(";").map((item) => item.trim()).filter((item) => CONDITIONS[item]);
    if (MELEE.every((item) => parts.includes(item))) parts = ["melee", ...parts.filter((item) => !MELEE.includes(item))];
    if (!parts.length) return null;
    const text = parts.map((item) => CONDITIONS[item]).join(" / ");
    return `Потрібно: ${text.charAt(0).toUpperCase()}${text.slice(1)}.`;
  }

  const castTime = (prepare) => (prepare === undefined || prepare === "instance" ? "Миттєво" : duration(prepare));

  function details(skill, { grade, level, enchant = 0 }) {
    const rank = rankFor(skill, grade, level);
    const data = levelData(skill, rank.rank) ?? {};
    const uk = SKILL_UK[skill.name]?.d;
    const result = {
      name: name(skill),
      grade,
      enchant,
      ...rank,
      tag: TAGS[skill.skill_tag] ?? skill.skill_tag,
      kind: [TYPES[skill.skill_type] ?? skill.skill_type, SUBTYPES[skill.skill_sub_type] ?? skill.skill_sub_type].filter(Boolean).join(" · "),
      condition: condition(skill),
      stages: [],
      rows: [],
      effect: null,
      // Опис узято з англійських даних: український у клієнті — від іншої версії вміння.
      english: false,
    };
    const describe = (english, rules) => {
      const chosen = template(uk, english, rules);
      if (uk && chosen !== uk) result.english = true;
      return fill(chosen, rules);
    };

    if (skill.type !== "charge") {
      const part = enchanted(data, enchant);
      result.effect = part.effect;
      result.stages.push({
        title: null,
        lines: describe(skill.desc, part.rules),
        rows: [
          { label: "Ціль", value: ACTIONS[skill.action] ?? skill.action },
          { label: "Вартість", value: costText(data.cost, part.cost) },
          { label: "Час використання", value: castTime(skill.prepare) },
          { label: "Відкат", value: duration(toNumber(skill.cd) + part.cooldown) },
          ...pvpRows(skill),
        ],
      });
      return result;
    }

    // Уміння із зарядкою: кожен етап має свій опис, вартість і час; відкат спільний,
    // і заточка змінює його лише через перший етап, як у старому калькуляторі.
    const count = [1, 2, 3].filter((number) => skill[`stage_${number}`]).length;
    let cooldown = toNumber(skill.cd) ?? 0;
    for (let number = 1; number <= count; number += 1) {
      const stage = skill[`stage_${number}`];
      const part = enchanted(data[`stage_${number}`], enchant);
      if (number === 1) {
        cooldown += part.cooldown;
        result.effect = part.effect;
      }
      result.stages.push({
        title: `Етап ${number}`,
        lines: describe(stage.desc, part.rules),
        rows: [
          { label: "Ціль", value: ACTIONS[stage.action] ?? stage.action },
          { label: "Вартість", value: costText(data[`stage_${number}`]?.cost, part.cost) },
          { label: number === count ? "Час утримання" : "Час зарядки", value: castTime(stage.prepare) },
          ...pvpRows(stage),
        ],
      });
    }
    result.rows.push({ label: "Відкат", value: duration(cooldown) });
    return result;
  }

  return { name, details };
}
