import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { body } from "../header/menu.js";

export const makeDubrovkaSlider = () => {
  const list = Array.from(body.querySelectorAll(".js-tabs-slider"));

  const sliders = list.map((item, i) => {
    return new Swiper(item, {
      modules: [Navigation],
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 5,
      // cssMode: true,
      centeredSlides: true,
      // virtual: true,

      initialSlide: 2,
      navigation: {
        enabled: true,
        nextEl: `.tabs-block__btn--next-${i}`,
        prevEl: `.tabs-block__btn--prev-${i}`,
      },
    });
  });
};
