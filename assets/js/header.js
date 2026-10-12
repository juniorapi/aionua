// Шапка: переклад сторінки, перемикач мови й меню розділів на вузьких екранах.
import { initLanguageSwitch, localizePage, tr } from "./i18n.js";

export function initHeader() {
  localizePage();
  initLanguageSwitch();

  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? tr("Закрити меню", "Close menu") : tr("Меню", "Menu"));
  }

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}
