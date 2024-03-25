import Tabby from "tabbyjs";

try {
  const tabs = new Tabby(".tabs-head");
  const el = document.querySelector('[href*="#shore"]');
  el.addEventListener("click", (e) => e.preventDefault());

  tabs.toggle(el);
} catch (error) {}
