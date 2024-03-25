import Tabby from "tabbyjs";

try {
  const tabs = new Tabby(".aesthetics-head");
  const el = document.querySelector('[href*="#exit"]');
  // console.log(el);
  el.addEventListener("click", (e) => e.preventDefault());

  tabs.toggle(el);
} catch (error) {}
