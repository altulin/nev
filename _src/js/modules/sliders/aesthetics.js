import Swiper from "swiper";
import { body } from "../header/menu.js";
import { Navigation, Scrollbar } from "swiper/modules";
import gsap from "gsap";
import { width } from "./dubrovka.js";

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
  if (width < 769) return;
  const activSlide = s.slides[s.realIndex];

  if (!activSlide) return;

  gsap.timeline().to(activSlide, {
    width: "43.4%",
    duration: 0.1,
  });

  makeCover(s.slides);
};

const changeHandler = (s) => {
  if (width < 769) return;
  const previousSlide = s.slides[s.previousIndex];

  s.slides.forEach((item) => {
    gsap.to(item.querySelector(".aesthetics-tab__list"), { autoAlpha: 0 });
  });

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
  if (width < 769) return;

  s.slides.forEach((item) => {
    gsap.set(item.querySelector(".aesthetics-tab__list"), { autoAlpha: 0 });
  });

  const prev = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-prev"),
  )[0];

  gsap.to(prev.querySelector(".aesthetics-tab__list"), {
    autoAlpha: 1,
    duration: 1,
  });
};

export const setAestheticsSliders = () => {
  const list = Array.from(body.querySelectorAll(".js-aesthetics-tabs"));

  const slides = list.map((item, i) => {
    return new Swiper(item, {
      modules: [Navigation, Scrollbar],
      speed: 1000,
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 5,
      navigation: {
        enabled: true,
        nextEl: `.aesthetics-touch__block--next-${i}`,
        prevEl: `.aesthetics-touch__block--prev-${i}`,
      },
      allowTouchMove: false,
      slidesOffsetBefore: 200,
      centeredSlides: true,
      initialSlide: 3,
      scrollbar: {
        el: ".aesthetics-tab__scrollbar",
        draggable: true,
      },
      breakpoints: {
        320: {
          allowTouchMove: true,
          //     navigation: { enabled: true },
          initialSlide: 0,
          // slidesPerView: 1,
          slidesPerView: "auto",
          slidesOffsetBefore: 0,
          centeredSlides: false,
          //   },
        },
        769: {
          allowTouchMove: false,
          initialSlide: 3,
          //     navigation: { enabled: false },
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
  });
};
