import Swiper from "swiper";
import { body } from "../header/menu.js";
import { Navigation } from "swiper/modules";
import gsap from "gsap";

export const width = window.innerWidth;

const nextHandler = (s) => {
  // const activSlide = s.slides.filter((slide) =>
  //   slide.classList.contains("swiper-slide-active"),
  // )[0];

  // const nextSlide = s.slides.filter((slide) =>
  //   slide.classList.contains("swiper-slide-next"),
  // )[0];

  const activSlide = s.slides[s.realIndex];
  const nextSlide = s.slides[s.realIndex + 1];

  gsap
    .timeline()

    // .set(activSlide.querySelector(".dubrovka-slide__text"), {
    //   autoAlpha: 0,
    // })
    // .to(nextSlide, { width: "43.4%", duration: 0.01 })
    // .to(
    //   nextSlide.querySelector(".dubrovka-slide__figure"),
    //   { height: "100%", duration: 0.5 },
    //   "<",
    // )
    // .to(activSlide, { width: "35.4%", duration: 0.01 }, "<")
    // .to(
    //   activSlide.querySelector(".dubrovka-slide__figure"),
    //   { height: "64%", duration: 0.5 },
    //   "<",
    // )
    .call(() => s.slideNext(1000));
};

const prevHandler = (s) => {
  // const activSlide = s.slides.filter((slide) =>
  //   slide.classList.contains("swiper-slide-active"),
  // )[0];

  // const prevSlide =
  //   s.slides.filter((slide) =>
  //     slide.classList.contains("swiper-slide-prev"),
  //   )[0] || s.slides[s.slides.length - 1];
  // const activSlide = s.slides[s.realIndex];
  console.log(s.realIndex);

  gsap
    .timeline()
    // .set(activSlide.querySelector(".dubrovka-slide__text"), {
    //   autoAlpha: 0,
    // })
    // .to(prevSlide, { width: "43.4%", duration: 0.5 })
    // .to(
    //   prevSlide.querySelector(".dubrovka-slide__figure"),
    //   { height: "100%", duration: 0.5 },
    //   "<",
    // )
    // .to(activSlide, { width: "35.4%", duration: 0.5 }, "<")
    // .to(
    //   activSlide.querySelector(".dubrovka-slide__figure"),
    //   { height: "64%", duration: 0.5 },
    //   "<",
    // )
    .call(() => s.slidePrev(1000));
};

const textHandler = (s) => {
  // const activSlide =
  //   s.slides.filter((slide) =>
  //     slide.classList.contains("swiper-slide-active"),
  //   )[0] || s.slides[0];
  // if (!activSlide) return;
  // gsap.to(activSlide.querySelector(".dubrovka-slide__text"), { autoAlpha: 1 });
};

const createAnimation = (s, i) => {
  const next = body.querySelector(`.tabs-block__btn--next-${i}`);
  const prev = body.querySelector(`.tabs-block__btn--prev-${i}`);

  // s.slides.forEach((slide) => {
  //   gsap.set(slide.querySelector(".dubrovka-slide__text"), { autoAlpha: 0 });
  // });

  // s.on("slideChangeTransitionEnd", textHandler);

  next.addEventListener("click", () => nextHandler(s));
  prev.addEventListener("click", () => prevHandler(s));
  // textHandler(s);
};

const initHandler = (s) => {
  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

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
    );
};

const changeHandler = (s) => {
  // const activSlide = s.slides[s.realIndex];
  const previousSlide = s.slides[s.previousIndex];

  const activSlide = s.slides.filter((slide) =>
    slide.classList.contains("swiper-slide-active"),
  )[0];

  if (!activSlide || !previousSlide) return;

  gsap
    .timeline()
    .to(activSlide, {
      width: "43.4%",
      duration: 1,
    })
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
    );
};

export const setDubrovkaSliders = () => {
  const list = Array.from(body.querySelectorAll(".js-tabs-slider"));

  const slides = list.map((item, i) => {
    return new Swiper(item, {
      modules: [Navigation],
      speed: 500,
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 5,
      navigation: {
        enabled: false,
        nextEl: `.tabs-block__btn--next-${i}`,
        prevEl: `.tabs-block__btn--prev-${i}`,
      },
      allowTouchMove: false,
      on: {
        afterInit: initHandler,
        slideChangeTransitionStart: changeHandler,
      },
      breakpoints: {
        320: {
          allowTouchMove: true,
          navigation: { enabled: true },

          slidesPerView: 1,
        },
        769: {
          allowTouchMove: false,
          navigation: { enabled: false },
          slidesPerView: "auto",
        },
      },
    });
  });

  slides.forEach((item, i) => {
    if (width < 769) return;
    createAnimation(item, i);
  });
};
