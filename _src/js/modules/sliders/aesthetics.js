import Swiper from "swiper";
import { body } from "../header/menu.js";
import { Navigation, Scrollbar } from "swiper/modules";
import gsap from "gsap";
import { width } from "./dubrovka.js";

const initHandler = (s) => {
  if (width < 769) return;
  const activSlide = s.slides[s.realIndex];
  const previousSlide = s.slides[s.previousIndex];

  if (!activSlide) return;

  gsap.timeline().to(activSlide, {
    width: "43.4%",
    duration: 0.1,
  });
  // .to(previousSlide.querySelector(".aesthetics-tab__list"), {
  //   autoAlpha: 1,
  //   duration: 0.1,
  // });
};

const changeHandler = (s) => {
  if (width < 769) return;
  const previousSlide = s.slides[s.previousIndex];

  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  if (!activSlide || !previousSlide) return;

  gsap
    .timeline()
    // .fromTo(
    //   previousSlide.querySelector(".aesthetics-tab__list"),
    //   {
    //     autoAlpha: 1,
    //   },
    //   { autoAlpha: 0, duration: 0.01 },
    // )
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
  // .to(activSlide.querySelector(".aesthetics-tab__list"), {
  //   autoAlpha: 1,
  //   duration: 0.1,
  // });
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
        nextEl: `.aesthetics-touch__block--next`,
        prevEl: `.aesthetics-touch__block--prev`,
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
          slidesPerView: 1,
          // slidesPerView: "auto",
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
        afterInit: initHandler,
        slideChangeTransitionStart: changeHandler,
      },
    });
  });

  // slides.forEach((item, i) => {
  // if (width < 769) return;

  // createAnimation(item, i);
  // });
};
