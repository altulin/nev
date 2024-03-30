import { setSticky } from "./modules/header/header.js";
import { controlMenu } from "./modules/header/menu.js";
import { sliderPromo } from "./modules/sliders/promo.js";
import { setDubrovkaSliders, width } from "./modules/sliders/dubrovka.js";
import { sliderCircle } from "./modules/sliders/circle.js";
import { setAestheticsSliders } from "./modules/sliders/aesthetics.js";
import { setToTop } from "./modules/header/toTop.js";
import { anchorPromoOrder } from "./modules/promo/anchor.js";
import { tlPromo } from "./modules/promo/animation.js";
import { animationDubrovka } from "./modules/dubrovka/animation.js";
import {
  animationLine,
  animationNearTitle,
  animationSection,
} from "./modules/near/animation.js";
import { animationPins } from "./modules/location/location.js";
import { animationAbout } from "./modules/about/animation.js";
import { createCircleDots } from "./modules/circle/dot.js";
import { animationCircle } from "./modules/circle/title.js";
import { animationYard } from "./modules/yard/animation.js";
import { createYardDots } from "./modules/yard/dot.js";
import { createAestheticsDots } from "./modules/aesthetics/dot.js";
import { createChooseDots } from "./modules/choose/dot.js";
import { animationDeveloper } from "./modules/developer/animation.js";
import { infoVisible } from "./modules/aesthetics/info.js";
import { animationAesthetics } from "./modules/aesthetics/animation.js";
import { animationChoose } from "./modules/choose/animation.js";
import { createTabs } from "./modules/dubrovka/tabs.js";
import { createMap } from "./modules/near/map.js";
import { chooseLink } from "./modules/choose/link.js";
import { makeAccordionHeder } from "./modules/header/accordion.js";
import { topBtnAnimation } from "./modules/footer/top.js";

const handler = () => {
  tlPromo.play().then(() => {
    sliderPromo.init();
    sliderPromo.enable();
  });
  createTabs(".dubrovka");
  createTabs(".aesthetics");
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
  animationCircle();
  animationYard();
  createYardDots();
  createAestheticsDots();
  createChooseDots();
  animationDeveloper();
  infoVisible();
  animationAesthetics();
  animationChoose();
  ymaps.ready(createMap);
  animationSection();
  chooseLink();
  animationNearTitle();
  makeAccordionHeder();
  // topBtnAnimation();

  if (width < 769) return;
};

document.addEventListener("DOMContentLoaded", handler);
