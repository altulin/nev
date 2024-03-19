import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

import { width } from "../sliders/dubrovka.js";

const getWidth = () => {
  if (width > 1920) {
    return "68%";
  }
  if (width > 1440) {
    return "90%";
  }

  return "100%";
};

export const animationDubrovka = () => {
  if (width < 769) return;
  const title = body.querySelector(".dubrovka__title");

  gsap.to(title, {
    scrollTrigger: {
      trigger: title,
      toggleActions: "play pause reverce pause",
      start: "top 70%",
    },
    width: getWidth(),
    duration: 1,
  });
};
