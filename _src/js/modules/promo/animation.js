import gsap from "gsap";
import { body } from "../header/menu.js";
import { sliderPromo } from "../sliders/promo.js";

export let tlPromo = gsap.timeline({
  paused: true,
});

const animationPromo = () => {
  const promoSlide = body.querySelector(".promo-slide--0");
  const text = promoSlide.querySelector(".promo-title--0");
  const block = promoSlide.querySelector(".promo-slide__block");
  const label = promoSlide.querySelector(".promo-slide__label");

  tlPromo
    .fromTo(
      text,
      {
        autoAlpha: 0,
        y: "-100%",
      },
      { autoAlpha: 1, y: 0, duration: 1 },
    )
    .fromTo(
      block,
      { autoAlpha: 0, y: "50%" },
      { autoAlpha: 1, y: 0, duration: 1 },
      "<",
    )
    .fromTo(
      label,
      {
        scale: 0,
      },
      { scale: 1, duration: 1 },
    );
};

animationPromo();
