import { body } from "../header/menu.js";
import { objTabs } from "./tabs.js";

export const changeTab = (section, s) => {
  const listTabs = Array.from(objTabs[`${section}`]);
  const listContents = Array.from(objTabs[`${section}-tabs`]);

  listContents.forEach((item) => {
    item.classList.add("hidden");
  });

  listTabs.forEach((tabBtn) => {
    tabBtn.classList.remove("selected");
  });

  const activeSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  const currentTabs = listTabs.filter(
    (item) => item.dataset.tabContentId === activeSlide.dataset.slide,
  );

  currentTabs.forEach((item) => {
    item.classList.add("selected");
  });

  const selectedTab = body.querySelector(`#${activeSlide.dataset.slide}`);
  selectedTab.classList.remove("hidden");
};
