// Заглушки для даних старого калькулятора стигм (stigma/js/*.js): мовні файли
// зливаються через $.extend з jQuery і пишуть у глобальний Calc. Цілий jQuery
// заради цього не тягнемо — вистачає цих двох імен.
(function () {
  function isPlain(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function extend() {
    var args = Array.prototype.slice.call(arguments);
    var deep = false;
    if (typeof args[0] === "boolean") deep = args.shift();
    var target = args.shift() || {};
    args.forEach(function (source) {
      if (!source) return;
      Object.keys(source).forEach(function (key) {
        var value = source[key];
        if (deep && isPlain(value)) target[key] = extend(true, isPlain(target[key]) ? target[key] : {}, value);
        else target[key] = value;
      });
    });
    return target;
  }

  window.$ = window.$ || { extend: extend, isArray: Array.isArray };
  window.Calc = window.Calc || {};
})();
