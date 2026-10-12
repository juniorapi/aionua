// Мова до першого малювання: англійська сторінка не має блимнути українським текстом.
// Звичайний (не модульний) скрипт у <head>; переклад робить i18n.js, а він знімає i18n-pending.
(function () {
  var lang = null;
  try {
    lang = new URLSearchParams(location.search).get("lang");
    if (lang !== "en" && lang !== "uk") lang = localStorage.getItem("aionua:lang");
  } catch (error) {
    lang = null;
  }
  if (lang !== "en") return;
  var root = document.documentElement;
  root.lang = "en";
  root.classList.add("i18n-pending");
  // Якщо модуль сторінки не завантажився, показуємо хоч українську, ніж порожню сторінку.
  setTimeout(function () { root.classList.remove("i18n-pending"); }, 2500);
})();
