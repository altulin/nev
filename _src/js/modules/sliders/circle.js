import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

export const sliderCircle = new Swiper(".circle__slider", {
  enabled: false,
  modules: [Navigation, Pagination, Scrollbar],
  loop: true,
  speed: 1000,
  centeredSlides: true,
  slidesPerView: "auto",
  // cssMode: true,
  // spaceBetween: 5,
  navigation: {
    nextEl: `.circle-control__block--right`,
    prevEl: `.circle-control__block--left`,
  },
  scrollbar: {
    enabled: false,
    el: ".circle-slider__scrollbar",
  },

  breakpoints: {
    320: {
      scrollbar: {
        enabled: true,
        el: ".circle-slider__scrollbar",
      },
      allowTouchMove: true,
      // navigation: { enabled: true },
      slidesPerView: "auto",
    },
    769: {
      allowTouchMove: false,
      // navigation: { enabled: false },
      slidesPerView: "auto",
      scrollbar: {
        enabled: false,
        el: ".circle-slider__scrollbar",
      },
    },
  },
});
