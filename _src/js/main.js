import { setSticky } from "./modules/header/header.js";
import { controlMenu } from "./modules/header/menu.js";
import { sliderPromo } from "./modules/sliders/promo.js";
import "./modules/dubrovka.js";
import "./modules/aesthetics.js";
import { setDubrovkaSliders, width } from "./modules/sliders/dubrovka.js";
import { sliderCircle } from "./modules/sliders/circle.js";
import { setAestheticsSliders } from "./modules/sliders/aesthetics.js";
import { setToTop } from "./modules/header/toTop.js";
import { anchorPromoOrder } from "./modules/promo/anchor.js";
import { tlPromo } from "./modules/promo/animation.js";
import { animationDubrovka } from "./modules/dubrovka/animation.js";
import { animationLine } from "./modules/near/animation.js";
import { animationPins } from "./modules/location/location.js";
import { animationAbout } from "./modules/about/animation.js";
import { createCircleDots } from "./modules/circle/dot.js";
import { animationTitle } from "./modules/circle/title.js";
import { animationYard } from "./modules/yard/animation.js";
import Splitting from "splitting";
import { createYardDots } from "./modules/yard/dot.js";
import { createAestheticsDots } from "./modules/aesthetics/dot.js";
import { createChooseDots } from "./modules/choose/dot.js";
import { animationDevelop } from "./modules/developer/animation.js";

const handler = () => {
  tlPromo.play().then(() => {
    sliderPromo.init();
    sliderPromo.enable();
  });
  controlMenu();
  setSticky();
  setDubrovkaSliders();
  sliderCircle.enable();
  setAestheticsSliders();
  setToTop();
  anchorPromoOrder();
  animationDubrovka();
  animationLine();
  animationPins();
  animationAbout();
  createCircleDots();
  animationTitle();
  animationYard();
  createYardDots();
  createAestheticsDots();
  createChooseDots();
  // animationDevelop();

  if (width < 769) return;
};

document.addEventListener("DOMContentLoaded", handler);
