import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import gsap from "gsap";
// import { tlPromo } from "../promo/animation.js";

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
      .set(bullets[i], { width: "1rem", marginRight: 0 })
      .to(bullets[i], { marginRight: "4.6rem", duration: 0.01 })
      .add("clear", "<")
      .set(s.pagination.el, { autoAlpha: 1 })
      .to(bullets[i], {
        width: "5.6rem",
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
  modules: [Pagination, Autoplay],
  autoplay: {
    delay: progressTime * 1000,
  },
  loop: true,
  pagination: {
    el: ".promo-swiper__pagination",
    bulletClass: "pagination-bar__bullet",
    bulletActiveClass: "pagination-bar__bullet--active",
  },
  speed: 2000,
  on: {
    init: (s) => initHandle(s),
    realIndexChange: (s) => changeHandle(s),
    slideChangeTransitionEnd: (s) => transitionHandle(s),
  },
});
