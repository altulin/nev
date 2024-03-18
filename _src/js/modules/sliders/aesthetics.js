import Swiper from "swiper";
import { body } from "../header/menu.js";
import { Navigation } from "swiper/modules";
import gsap from "gsap";

export const setAestheticsSliders = () => {
  const list = Array.from(body.querySelectorAll(".js-aesthetics-tabs"));

  const slides = list.map((item, i) => {
    return new Swiper(item, {
      modules: [Navigation],
      speed: 500,
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 5,
      navigation: {
        enabled: true,
        nextEl: `.aesthetics__btn--next-${i}`,
        prevEl: `.aesthetics__btn--prev-${i}`,
      },
      allowTouchMove: false,
      on: {
        // init: textHandler,
      },
      centeredSlides: true,
      initialSlide: 3,
      breakpoints: {
        320: {
          allowTouchMove: true,
          navigation: { enabled: true },

          slidesPerView: 1,
        },
        769: {
          allowTouchMove: true,
          navigation: { enabled: false },
          slidesPerView: "auto",
        },
      },
    });
  });

  // slides.forEach((item, i) => {
  //   if (width < 769) return;
  //   createAnimation(item, i);
  // });
};
