import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";
import gsap from "gsap";
import { changeTab } from "../dubrovka/changeTab.js";

export const width = window.innerWidth;

const initHandler = (s) => {
  if (width < 769) return;
  const activSlide = s.slides[s.realIndex];

  if (!activSlide) return;

  gsap
    .timeline()
    .to(activSlide, {
      width: "43.4%",
      duration: 0.5,
    })
    .to(
      activSlide.querySelector(".dubrovka-slide__figure"),
      { height: "100%", duration: 0.5 },
      "<",
    )
    .to(activSlide.querySelector(".dubrovka-slide__text"), {
      autoAlpha: 1,
      duration: 0.1,
    });
};

const changeHandler = (s) => {
  changeTab("dubrovka", s);

  if (width < 769) return;
  s.navigation.disable();
  const previousSlide = s.slides[s.previousIndex];

  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  if (!activSlide || !previousSlide) return;

  s.slides.forEach((element) => {
    gsap.set(element.querySelector(".dubrovka-slide__text"), { autoAlpha: 0 });
  });

  gsap
    .timeline()
    .fromTo(
      previousSlide.querySelector(".dubrovka-slide__text"),
      {
        autoAlpha: 1,
      },
      { autoAlpha: 0, duration: 0.01 },
    )
    .to(
      activSlide,
      {
        width: "43.4%",
        duration: 1,
      },
      "<",
    )
    .to(
      activSlide.querySelector(".dubrovka-slide__figure"),
      { height: "100%", duration: 1 },
      "<",
    )

    .fromTo(
      previousSlide,
      { width: "43.4%" },
      { width: "35.4%", duration: 1 },
      "<",
    )
    .fromTo(
      previousSlide.querySelector(".dubrovka-slide__figure"),
      { height: "100%" },
      { height: "64%", duration: 1 },
      "<",
    )
    .to(activSlide.querySelector(".dubrovka-slide__text"), {
      autoAlpha: 1,
      duration: 0.1,
    })
    .then(() => {
      s.navigation.enable();
    });
};

const clickHandler = (s, e) => {
  const index = e.target.dataset.swiperSlideIndex;
  s.slideToLoop(index, 1000);
};

export const sliderDubrovka = new Swiper(".tabs-block__slider", {
  modules: [Navigation, Scrollbar],
  speed: 500,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 5,
  allowTouchMove: false,
  scrollbar: {
    el: ".tabs-slider__scrollbar",
    draggable: true,
  },
  navigation: {
    nextEl: `.tabs-block__btn--next`,
    prevEl: `.tabs-block__btn--prev`,
  },
  on: {
    afterInit: initHandler,
    slideChangeTransitionStart: changeHandler,
    click: (s, e) => clickHandler(s, e),
  },
  breakpoints: {
    320: {
      allowTouchMove: true,
      speed: 300,
      slidesPerView: "auto",
    },
    769: {
      speed: 500,
      allowTouchMove: false,
      slidesPerView: "auto",
    },
  },
});
