import { body } from "../header/menu.js";
import gsap from "gsap";

export const topBtnAnimation = () => {
  const footer = body.querySelector(".footer");
  if (!footer) return;
  const btnAbsolute = footer.querySelector(".footer__top--absolute");
  const btnFixed = footer.querySelector(".footer__top--fixed");
  if (!btnFixed || !btnAbsolute) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: btnAbsolute,
      start: "top bottom",
      end: "bottom 40%",
      markers: true,
    },
  });
};
