import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const sliderCircle = new Swiper(".circle__slider", {
  enabled: false,
  modules: [Navigation, Pagination],
  loop: true,
  speed: 1000,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 5,
  navigation: {
    nextEl: `.circle-control__block--right`,
    prevEl: `.circle-control__block--left`,
  },
  pagination: {
    enabled: false,
    el: ".circle__pagination",
    type: "progressbar",
  },
});
