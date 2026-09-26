// Тексти стигм: назви, описи з числами рангу, вартість, час використання й відкат.
//
// Шаблони описів лежать у stigma/js/lang_*.js, а числа для них — у stigma/js/vals.js:
// [%e1.SpellATK_Instant.FixDamage] замінюється значенням поточного рангу.

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function roman(rank) {
  return ROMAN[rank] ?? String(rank);
}

export function createText(lang, values) {
  function word(section, key, ...args) {
    let text = lang?.[section]?.[key];
    if (typeof text !== "string") return key;
    args.forEach((arg, index) => {
      text = text.replace(new RegExp(`%${index + 1}`, "g"), String(arg));
    });
    return text;
  }

  // 90 → «1 хв 30 с»; без одиниць — для випадкової тривалості, де одиниці вже в шаблоні.
  function duration(seconds, withUnits = true) {
    if (!/^[\d.]+$/.test(String(seconds))) return String(seconds);
    let rest = Number(seconds);
    const hours = Math.floor(rest / 3600);
    rest -= hours * 3600;
    const minutes = Math.floor(rest / 60);
    rest = Math.round((rest - minutes * 60) * 100) / 100;
    const parts = [];
    if (hours) parts.push(withUnits ? `${hours} ${word("base", "hour")}` : String(hours));
    if (minutes) parts.push(withUnits ? `${minutes} ${word("base", "min")}` : String(minutes));
    if (rest || parts.length === 0) parts.push(withUnits ? `${rest} ${word("base", "sec")}` : String(rest));
    return parts.join(" ");
  }

  function value(data, id) {
    const raw = data[id];
    if (raw === undefined || raw === "") return word("base", "novalue");
    if (/(remaintime|checktime)$/.test(id)) return duration(raw);
    if (/randomtime$/.test(id)) return duration(raw, false);
    const lower = String(raw).toLowerCase();
    if (lang.bonusnames?.[lower]) return lang.bonusnames[lower];
    if (lang.other?.[lower]) return lang.other[lower];
    return String(raw);
  }

  // Ранги лежать частинами: наступний ранг повторює лише те, що змінилося.
  function rankData(stageValues, rank) {
    return Object.keys(stageValues)
      .map(Number)
      .filter((key) => key <= rank)
      .sort((a, b) => a - b)
      .reduce((data, key) => ({ ...data, ...stageValues[key] }), {});
  }

  function costRows(data, first) {
    const rows = [];
    if (data.cost) {
      const every = data.costtime ? ` кожні ${duration(data.costtime)}` : "";
      rows.push({ label: word("base", "cost"), value: `${data.cost}${every}` });
    }
    const cast = Number(data.casttime);
    rows.push({
      label: word("base", "casttime"),
      value: cast < 0 ? word("base", "instant") : duration(Number.isFinite(cast) ? cast : 0),
    });
    // Відкат спільний для всього ланцюжка, тож показуємо його лише в першому етапі.
    if (first && data.cooltime) rows.push({ label: word("base", "cooltime"), value: duration(data.cooltime) });
    return rows;
  }

  // Етапи ланцюжка: друге вміння з'являється лише на старших рангах.
  function stages(key, rank) {
    const result = [];
    for (let number = 1; ; number += 1) {
      const id = number === 1 ? key : `${key}_${number}`;
      const stageValues = values?.[id];
      if (!stageValues) break;
      if (number > 1 && !Object.hasOwn(stageValues, String(rank))) continue;
      const data = rankData(stageValues, rank);
      const template = lang.skilldesc?.[id] ?? word("base", "nodesc");
      const text = String(template)
        .replace(/\[%(.*?)\]%?/g, (match, name) => value(data, name.toLowerCase()))
        .replace(/%%/g, "%")
        .replace(/\.\./g, ".");
      result.push({ number, text, rows: costRows(data, number === 1) });
    }
    return result;
  }

  return {
    word,
    name: (key) => lang.skillnames?.[key] ?? key,
    className: (classId) => lang.classes?.[classId] ?? classId,
    stages,
  };
}
