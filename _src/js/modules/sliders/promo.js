import Swiper from "swiper";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import gsap from "gsap";
import { width } from "./dubrovka.js";

let tlList;
const progressTime = 4.5;

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
      .set(s.pagination.el, { autoAlpha: 1 })
      .to(bullets[i], {
        width: `${width < 769 ? "2.5rem" : "5.6rem"}`,
        marginRight: 0,
        duration: progressTime,
      })
      .add("ready", "<");
  });

  requestAnimationFrame(() => {
    tlList[s.realIndex].play();
  });
};

export const sliderPromo = new Swiper(".promo__swiper", {
  enabled: false,
  init: false,
  modules: [Pagination, Autoplay, EffectFade],
  autoplay: {
    delay: progressTime * 1000,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  pagination: {
    el: ".promo-swiper__pagination",
    bulletClass: "pagination-bar__bullet",
    bulletActiveClass: "pagination-bar__bullet--active",
    clickable: true,
  },
  speed: 500,
  on: {
    init: (s) => initHandle(s),
    realIndexChange: (s) => changeHandle(s),
    slideChangeTransitionEnd: (s) => transitionHandle(s),
  },
});
