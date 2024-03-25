import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

import { width } from "../sliders/dubrovka.js";
const choose = body.querySelector(".choose");

const getWidth = () => {
  if (width > 1920) {
    return "65%";
  }
  if (width > 1439) {
    return "80%";
  }

  return "100%";
};

export const animationChoose = () => {
  if (!choose) return;
  if (width < 769) return;
  const title = choose.querySelector(".choose__title");
  if (!title) return;

  const tlTitle = gsap
    .timeline()
    .fromTo(title, { width: getWidth() }, { width: "100%" });

  gsap.to(title, {
    scrollTrigger: {
      trigger: title,
      toggleActions: "play pause reverce pause",
      start: "top 70%",
      end: "+=100",
      // markers: true,
      once: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          tlTitle.reverse();
        }
      },
    },
  });
};
