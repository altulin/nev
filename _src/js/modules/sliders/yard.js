import Swiper from "swiper";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import gsap from "gsap";
import { width } from "./dubrovka.js";

let tlList;
const progressTime = 3;

const changeHandle = (s) => {
  tlList.forEach((item) => {
    item.pause("clear");
  });

  tlList[s.realIndex].pause("ready");
};

const transitionHandle = (s) => {
  tlList[s.realIndex].play("ready");
};

const initHandle = (s) => {
  const bullets = s.pagination.bullets;

  tlList = bullets.map((item, i) => {
    return gsap
      .timeline({ paused: true })
      .set(bullets[i], {
        width: `${width < 769 ? "0.63rem" : "1rem"}`,
        marginRight: 0,
      })
      .to(bullets[i], {
        marginRight: `${width < 769 ? "1.87rem" : "4.6rem"}`,
        duration: 0.01,
      })
      .add("clear", "<")
      .to(bullets[i], {
        width: `${width < 769 ? "2.5rem" : "5.6rem"}`,
        marginRight: 0,
        duration: progressTime,
      })
      .add("ready", "<");
  });

  tlList[s.realIndex].play();
};

export const sliderYard = new Swiper(".yard__slider", {
  // enabled: false,
  init: false,
  modules: [Pagination, Autoplay, Navigation, EffectFade],
  autoplay: {
    delay: progressTime * 1000,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  spaceBetween: 5,
  pagination: {
    el: ".yard__pagination",
    bulletClass: "pagination-bar__bullet",
    bulletActiveClass: "pagination-bar__bullet--active",
  },
  navigation: {
    nextEl: `.yard-touch__block--next`,
    prevEl: `.yard-touch__block--prev`,
  },
  speed: 500,
  on: {
    afterInit: initHandle,

    realIndexChange: (s) => changeHandle(s),
    slideChangeTransitionEnd: (s) => transitionHandle(s),
  },
});
