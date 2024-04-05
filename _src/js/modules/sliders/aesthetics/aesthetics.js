import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";
import gsap from "gsap";
import { width } from "../dubrovka.js";
import { controlSlider, controlTabsStyle } from "./tabs.js";

export const makeCover = (list) => {
  if (width < 769) return;

  list.forEach((item) => {
    item.classList.add("aesthetics-tab__slide--cover");
  });

  const prev = list.filter((item) =>
    item.classList.contains("swiper-slide-prev"),
  )[0];

  const active = list.filter((item) =>
    item.classList.contains("swiper-slide-active"),
  )[0];

  if (!prev || !active) return;

  prev.classList.remove("aesthetics-tab__slide--cover");
  active.classList.remove("aesthetics-tab__slide--cover");
};

const initHandler = (s) => {
  controlSlider(s);

  if (width < 769) return;
  const activSlide = s.slides[s.realIndex];
  const previousSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-prev"),
  )[0];

  s.slides.forEach((item) => {
    gsap.set(item.querySelector(".aesthetics-tab__list"), {
      autoAlpha: 0,
      duration: 0.01,
    });
  });

  if (!activSlide) return;

  gsap
    .timeline()
    .to(activSlide, {
      width: "43.4%",
      duration: 0.1,
    })
    .to(previousSlide.querySelector(".aesthetics-tab__list"), {
      autoAlpha: 1,
      duration: 1,
    });

  makeCover(s.slides);
};

const changeHandler = (s) => {
  controlTabsStyle(s);
  if (width < 769) return;
  const previousSlide = s.slides[s.previousIndex];

  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  if (!activSlide || !previousSlide) return;

  gsap
    .timeline()
    .to(activSlide, {
      width: "42.5%",
      duration: 1,
    })
    .fromTo(
      previousSlide,
      { width: "42.5%" },
      { width: "27%", duration: 1 },
      "<",
    );

  makeCover(s.slides);
};

const slideNext = (s) => {
  // controlTabsStyle(s);

  if (width < 769) return;

  s.slides.forEach((item) => {
    gsap.set(item.querySelector(".aesthetics-tab__list"), {
      autoAlpha: 0,
      duration: 0.01,
    });
  });

  const prev = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-prev"),
  )[0];

  gsap.to(prev.querySelector(".aesthetics-tab__list"), {
    autoAlpha: 1,
    duration: 1,
  });
};

export const setAestheticsSliders = new Swiper(".js-aesthetics-tabs", {
  modules: [Navigation, Scrollbar],
  initt: false,
  speed: 1000,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 5,
  navigation: {
    enabled: true,
    nextEl: `.aesthetics-touch__block--next`,
    prevEl: `.aesthetics-touch__block--prev`,
  },
  allowTouchMove: false,
  slidesOffsetBefore: 200,
  centeredSlides: true,
  initialSlide: 1,
  scrollbar: {
    el: ".aesthetics-tab__scrollbar",
    draggable: true,
  },
  breakpoints: {
    320: {
      allowTouchMove: true,
      speed: 300,
      initialSlide: 0,
      slidesPerView: "auto",
      slidesOffsetBefore: 0,
      centeredSlides: false,
    },
    769: {
      allowTouchMove: false,
      initialSlide: 1,
      speed: 1000,
      slidesPerView: "auto",
      slidesOffsetBefore: 200,
      centeredSlides: true,
    },
  },
  on: {
    slideChangeTransitionStart: changeHandler,
    afterInit: initHandler,

    slideNextTransitionEnd: slideNext,
    slidePrevTransitionEnd: slideNext,
  },
});
