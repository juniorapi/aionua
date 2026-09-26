import { initHeader } from "./header.js";
import { initOnline } from "./online.js";
import { initEvents } from "./events.js";
import { initSearch } from "./search.js";

initHeader();
initSearch(document.querySelector("[data-search]"));
initOnline(document.querySelector("[data-servers]"));
initEvents(document.querySelector("[data-events]"));
