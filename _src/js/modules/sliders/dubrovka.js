import Swiper from "swiper";
import { body } from "../header/menu.js";
import { Navigation, Scrollbar } from "swiper/modules";
import gsap from "gsap";

export const width = window.innerWidth;

const createAnimation = (s, i) => {
  const next = body.querySelector(`.tabs-block__btn--next-${i}`);
  const prev = body.querySelector(`.tabs-block__btn--prev-${i}`);

  next.addEventListener("click", () => s.slideNext(1000));
  prev.addEventListener("click", () => s.slidePrev(1000));
};

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
  if (width < 769) return;
  const previousSlide = s.slides[s.previousIndex];

  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  if (!activSlide || !previousSlide) return;

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
    });
};

export const setDubrovkaSliders = () => {
  const list = Array.from(body.querySelectorAll(".js-tabs-slider"));

  const slidesDubrovka = list.map((item, i) => {
    return new Swiper(item, {
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
      on: {
        afterInit: initHandler,
        slideChangeTransitionStart: changeHandler,
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
  });

  slidesDubrovka.forEach((item, i) => {
    if (width < 769) return;
    createAnimation(item, i);
  });
};
