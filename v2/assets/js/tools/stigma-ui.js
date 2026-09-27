// Спільне для калькуляторів стигм 4.6 і 4.8: повідомлення, підказка біля курсора,
// перехід до списку й фокус клавіатури після перемальовування.

// Миша: клік одразу ставить чи прибирає стигму, наведення показує підказку.
// Дотик: натискання відкриває картку з описом і кнопкою.
export const POINTER = window.matchMedia("(hover: hover) and (pointer: fine)");

// Повідомлення спливає внизу екрана, тож його видно й далеко від слотів; у відкритій картці — в ній.
export function createAnnouncer(nodes) {
  let timer = 0;
  return function announce(message, isError = false) {
    window.clearTimeout(timer);
    for (const node of nodes) {
      node.textContent = message;
      node.classList.toggle("is-error", isError);
    }
    timer = window.setTimeout(() => nodes.forEach((node) => { node.textContent = ""; }), 6000);
  };
}

// З клавіатури фокус переходить у список, щоб одразу вибрати стигму.
export function jumpTo(section, moveFocus) {
  const smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  section.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  if (moveFocus) section.querySelector('[data-state="available"]')?.focus({ preventScroll: true });
}

// Перемальовування замінює кнопки, тож фокус клавіатури повертаємо на те саме місце:
// на ту саму стигму (одна стигма буває в кількох місцях, тому спершу — на тій самій позиції),
// а якщо її там уже немає — на сусідню кнопку.
const controlsIn = (zone) => [...zone.querySelectorAll("button:not(:disabled), select:not(:disabled)")];

export function focusedControl(root, zones) {
  const active = document.activeElement;
  const zone = active?.closest?.(zones);
  if (!zone || !root.contains(zone)) return null;
  return { zone, key: active.dataset.key, index: controlsIn(zone).indexOf(active) };
}

export function refocus(focus) {
  if (!focus) return;
  const controls = controlsIn(focus.zone);
  const same = controls[focus.index];
  const target = (same?.dataset.key === focus.key ? same : null)
    ?? (focus.key && focus.zone.querySelector(`[data-key="${focus.key}"]`))
    ?? controls[Math.min(focus.index, controls.length - 1)];
  target?.focus({ preventScroll: true });
}

// Підказка до будь-якого елемента з data-key: під мишею чи фокусом клавіатури.
// У панелі з data-tip-panel вона стає збоку від панелі, щоб не закривати сусідні стигми;
// після перемальовування повертається до того, що тепер під курсором.
export function createTooltip({ root, node, render }) {
  let target = null;
  let pointer = null;

  function place(element) {
    const box = element.getBoundingClientRect();
    const tip = node.getBoundingClientRect();
    const panel = element.closest("[data-tip-panel]")?.getBoundingClientRect();
    const fitsRight = (edge) => edge + 12 + tip.width <= window.innerWidth - 8;
    const fitsLeft = (edge) => edge - 12 - tip.width >= 8;
    let left;
    if (panel && fitsRight(panel.right)) left = panel.right + 12;
    else if (panel && fitsLeft(panel.left)) left = panel.left - 12 - tip.width;
    else if (fitsRight(box.right)) left = box.right + 12;
    else left = box.left - 12 - tip.width;
    let top = box.top;
    if (top + tip.height > window.innerHeight - 8) top = window.innerHeight - tip.height - 8;
    node.style.left = `${Math.max(8, left)}px`;
    node.style.top = `${Math.max(8, top)}px`;
  }

  function show(element) {
    target = element;
    render(node, element.dataset.key);
    node.hidden = false;
    place(element);
  }

  function hide() {
    target = null;
    node.hidden = true;
  }

  function restore() {
    if (!pointer || !POINTER.matches) return;
    const element = document.elementFromPoint(pointer.x, pointer.y)?.closest("[data-key]");
    if (element && root.contains(element)) show(element);
  }

  // Сторінка прокрутилася під курсором: підказка йде за стигмою, поки курсор на ній.
  function follow() {
    if (!target) return;
    if (target.isConnected && (target.matches(":hover") || target === document.activeElement)) place(target);
    else hide();
  }

  root.addEventListener("pointermove", (event) => {
    pointer = event.pointerType === "mouse" ? { x: event.clientX, y: event.clientY } : null;
  }, { passive: true });
  root.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse" || !POINTER.matches) return;
    const element = event.target.closest("[data-key]");
    if (element && element !== target) show(element);
  });
  root.addEventListener("pointerout", (event) => {
    const element = event.target.closest("[data-key]");
    if (element && !element.contains(event.relatedTarget)) hide();
  });
  // Лише фокус з клавіатури: після кліку мишею підказку веде курсор.
  root.addEventListener("focusin", (event) => {
    const element = event.target.closest?.("[data-key]");
    if (element && POINTER.matches && element.matches(":focus-visible")) show(element);
  });
  root.addEventListener("focusout", hide);
  window.addEventListener("scroll", follow, { passive: true });

  return {
    hide,
    restore,
    get active() { return target !== null; },
  };
}
