// Пошук інструментів у герої: підказки під полем, стрілки, Enter відкриває перший збіг.
import { TOOLS, plural } from "./format.js";

const LIMIT = 7;

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[’ʼ`']/g, "'")
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
}

function collectTools() {
  return [...document.querySelectorAll(".tool-link")].map((link, index) => {
    const name = link.querySelector(".tool-name")?.textContent.trim() ?? link.textContent.trim();
    const group = link.closest(".tool-group")?.querySelector("h3")?.textContent.trim() ?? "";
    return {
      index,
      href: link.getAttribute("href"),
      name,
      group,
      badge: link.querySelector(".badge")?.textContent.trim() ?? "",
      title: normalize(name),
      haystack: normalize(`${name} ${group} ${link.dataset.keywords ?? ""}`),
    };
  });
}

function score(tool, query, tokens) {
  if (!tokens.every((token) => tool.haystack.includes(token))) return 0;
  if (tool.title.startsWith(query)) return 3;
  if (tool.title.includes(query)) return 2;
  return 1;
}

export function initSearch(form) {
  if (!form) return;
  const input = form.querySelector("input[type=search]");
  const results = form.querySelector("#search-results");
  const tools = collectTools();
  const announcer = document.createElement("p");
  announcer.className = "visually-hidden";
  announcer.setAttribute("aria-live", "polite");
  form.append(announcer);

  let matches = [];

  function close() {
    results.hidden = true;
    input.setAttribute("aria-expanded", "false");
  }

  function links() {
    return [...results.querySelectorAll("a")];
  }

  function update() {
    const query = normalize(input.value);
    if (!query) {
      matches = [];
      results.replaceChildren();
      announcer.textContent = "";
      close();
      return;
    }

    const tokens = query.split(" ");
    matches = tools
      .map((tool) => ({ tool, rank: score(tool, query, tokens) }))
      .filter((entry) => entry.rank > 0)
      .sort((a, b) => b.rank - a.rank || a.tool.index - b.tool.index)
      .slice(0, LIMIT)
      .map((entry) => entry.tool);

    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "Нічого не знайдено. Спробуйте «крафт», «стігми» або «розклад».";
      results.replaceChildren(empty);
      announcer.textContent = "Нічого не знайдено";
    } else {
      results.replaceChildren(...matches.map((tool, position) => {
        const link = document.createElement("a");
        link.href = tool.href;
        if (position === 0) link.className = "is-active";
        const name = document.createElement("span");
        name.className = "result-name";
        name.textContent = tool.name;
        const group = document.createElement("span");
        group.className = "result-group";
        group.textContent = tool.group;
        link.append(name, group);
        if (tool.badge) {
          const mark = document.createElement("span");
          mark.className = "badge badge-gold";
          mark.textContent = tool.badge;
          link.append(mark);
        }
        return link;
      }));
      announcer.textContent = `Знайдено ${matches.length} ${plural(matches.length, TOOLS)}. Стрілка вниз — до списку.`;
    }
    results.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  input.addEventListener("input", update);
  input.addEventListener("focus", () => {
    if (input.value) update();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (matches.length > 0) window.location.href = matches[0].href;
  });

  form.addEventListener("keydown", (event) => {
    const items = links();
    const position = items.indexOf(document.activeElement);

    if (event.key === "Escape") {
      if (!results.hidden) {
        close();
        input.focus();
      } else if (input.value) {
        input.value = "";
        update();
      }
      return;
    }
    if (event.key === "ArrowDown" && items.length > 0) {
      event.preventDefault();
      items[Math.min(position + 1, items.length - 1)].focus();
    }
    if (event.key === "ArrowUp" && position >= 0) {
      event.preventDefault();
      if (position === 0) input.focus();
      else items[position - 1].focus();
    }
  });

  results.addEventListener("focusin", (event) => {
    links().forEach((link) => link.classList.toggle("is-active", link === event.target));
  });

  form.addEventListener("focusout", (event) => {
    if (!form.contains(event.relatedTarget)) close();
  });

  // «/» з будь-якого місця сторінки — до пошуку, як у звичних сервісах.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    event.preventDefault();
    focusSearch();
  });

  function focusSearch() {
    input.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    input.focus({ preventScroll: true });
  }

  document.querySelectorAll("[data-focus-search]").forEach((button) => {
    button.addEventListener("click", focusSearch);
  });
}
