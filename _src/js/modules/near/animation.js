import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
import Splitting from "splitting";

// import { width } from "../sliders/dubrovka.js";
const near = body.querySelector(".near");

const animationNearTitle = () => {
  if (!near) return;
  // if (width < 769) return;
  const title = near.querySelector(".near-title");
  Splitting({ target: title, whitespace: true, by: "chars" });

  const word = title.querySelector(".word");

  gsap.to(word, {
    scrollTrigger: {
      trigger: title,
      toggleActions: "play pause reverce pause",
      start: "top 70%",
    },
    flexGrow: 0,
    duration: 1,
  });
};

animationNearTitle();

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
