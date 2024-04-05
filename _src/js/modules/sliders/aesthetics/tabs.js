import { body } from "../../header/menu.js";

const tabsHandle = (s, e) => {
  const selectedTabId = e.target.dataset.tabContentId;
  const slides = s.slides;

  const index = slides.find(
    (item) => item.dataset.slide === `${selectedTabId}-0`,
  ).dataset.swiperSlideIndex;

  if (!index) return;

  s.slideToLoop(index, 1000);
};

export const controlSlider = (s) => {
  const aesthetics = body.querySelector(".aesthetics");

  if (!aesthetics) return;

  const tabs = Array.from(aesthetics.querySelectorAll(".tab-btn"));

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => tabsHandle(s, e));
  });
};

export const controlTabsStyle = (s) => {
  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  if (!activSlide) return;

  const id = activSlide.dataset.slide;

  const tabs = Array.from(aesthetics.querySelectorAll(".tab-btn"));

  tabs.forEach((tab) => {
    tab.classList.remove("selected");

    if (tab.dataset.tabContentId === id.split("-")[0]) {
      tab.classList.add("selected");
    }
  });
};
