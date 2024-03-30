import gsap from "gsap";
import { body } from "../header/menu.js";
import { sliderPromo } from "../sliders/promo.js";
import { width } from "../sliders/dubrovka.js";

export let tlPromo = gsap.timeline({
  paused: true,
});

const animationPromo = () => {
  const promoSlide = body.querySelector(".promo-slide--0");
  if (!promoSlide) return;
  const line = body.querySelector(".header__line");
  const linesMiddle = Array.from(body.querySelectorAll(".header__line-middle"));
  const elements = Array.from(body.querySelectorAll(".js-header"));

  const text = Array.from(
    promoSlide.querySelectorAll(".promo-title--0 .promo-title__text"),
  );
  const block = promoSlide.querySelector(".promo-slide__block");
  const label = promoSlide.querySelector(".promo-slide__label");

  tlPromo

    .fromTo(
      line,
      { width: "0%" },
      { width: "100%", duration: width > 768 ? 2 : 1 },
    )
    .fromTo(linesMiddle, { height: 0 }, { height: "100%", duration: 1 })
    .fromTo(elements, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "<")

    .fromTo(
      text,
      { backgroundPositionY: "200%" },
      { backgroundPositionY: "100%", duration: 2 },
      "<",
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
      "<50%",
    );
};

requestAnimationFrame(animationPromo);
