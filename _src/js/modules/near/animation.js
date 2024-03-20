import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

import { width } from "../sliders/dubrovka.js";

const getWidth = () => {
  if (width > 1920) {
    return "43%";
  }
  if (width > 1440) {
    return "75%";
  }

  return "100%";
};

const animationNearTitle = () => {
  if (width < 769) return;
  const title = body.querySelector(".near__title");

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

export const animationLine = () => {
  // const line = body.querySelector(".near-indication__line--0");

  const list = Array.from(body.querySelectorAll(".near-indication__line"));

  list.forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        toggleActions: "play pause none pause",
        start: `top ${80 - i * 5}%`,
        end: "+=500",
        // markers: true,
        scrub: true,
      },
      width: "100%",
      duration: 5,
    });
  });
};
