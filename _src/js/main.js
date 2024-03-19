import { setSticky } from "./modules/header/header.js";
import { controlMenu } from "./modules/header/menu.js";
import { sliderPromo } from "./modules/sliders/promo.js";
import "./modules/dubrovka.js";
import "./modules/aesthetics.js";
import { setDubrovkaSliders } from "./modules/sliders/dubrovka.js";
import { sliderCircle } from "./modules/sliders/circle.js";
import { sliderYard } from "./modules/sliders/yard.js";
import { setAestheticsSliders } from "./modules/sliders/aesthetics.js";
import { setToTop } from "./modules/header/toTop.js";
import { anchorPromoOrder } from "./modules/promo/anchor.js";
import { tlPromo } from "./modules/promo/animation.js";

const handler = () => {
  tlPromo.play().then(() => {
    sliderPromo.init();
    sliderPromo.enable();
  });
  controlMenu();
  setSticky();
  setDubrovkaSliders();
  sliderCircle.enable();
  sliderYard.enable();
  setAestheticsSliders();
  setToTop();
  anchorPromoOrder();
};

document.addEventListener("DOMContentLoaded", handler);
