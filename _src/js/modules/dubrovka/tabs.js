import { body } from "../header/menu.js";

export const createTabs = (selector) => {
  const parent = body.querySelector(selector);
  if (!parent) return;

  const tabButtons = parent.querySelectorAll(".tab-btn");
  const tabs = parent.querySelectorAll(".tab-content");

  tabButtons.forEach((tabButton) => {
    tabButton.addEventListener("click", (e) => {
      Array.from(tabButtons).forEach((tabBtn) => {
        tabBtn.classList.remove("selected");
      });
      e.target.classList.add("selected");

      const selectedTabId = e.target.dataset.tabContentId;
      const selectedTab = document.getElementById(selectedTabId);

      Array.from(tabs).forEach((tab) => {
        tab.classList.add("hidden");
      });
      selectedTab.classList.remove("hidden");
    });
  });
};
