import { body } from "../header/menu.js";

export let objTabs = {};

export const createTabs = (selector, swiper) => {
  const parent = body.querySelector(`.${selector}`);

  if (!parent) return;

  const tabButtons = parent.querySelectorAll(".tab-btn");
  const tabs = parent.querySelectorAll(".tab-content");

  objTabs[`${selector}`] = tabButtons;

  tabButtons.forEach((tabButton) => {
    tabButton.addEventListener("click", (e) => {
      Array.from(tabButtons).forEach((tabBtn) => {
        tabBtn.classList.remove("selected");
      });

      e.target.classList.add("selected");

      const selectedTabId = e.target.dataset.tabContentId;

      if (swiper) {
        const dataList = swiper.slides.map((item) => item.dataset.slide);

        const index = dataList.indexOf(selectedTabId);

        swiper.slideToLoop(index, 1000);
      }

      const selectedTab = document.getElementById(selectedTabId);

      if (!selectedTab) return;

      Array.from(tabs).forEach((tab) => {
        tab.classList.add("hidden");
      });
      selectedTab.classList.remove("hidden");
    });
  });
};
