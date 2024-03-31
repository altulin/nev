import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

import { width } from "../sliders/dubrovka.js";
import Splitting from "splitting";
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
  // if (width < 769) return;
  const title = choose.querySelector(".choose__title");
  if (!title) return;

  const words = Array.from(title.querySelectorAll("span"));

  words.forEach((item) => {
    Splitting({ target: item, whitespace: true, by: "chars" });
  });

  const word = words.map((item) => item.querySelector(".word"));

  gsap.timeline().set(title, { width: "100%" }).set(word, { flexGrow: 1 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: title,
        toggleActions: "play pause reverse pause",
        start: "top 90%",
        end: "bottom 60%",
        // markers: true,
        scrub: 2,
      },
    })
    .to(title, { width: getWidth(), duration: 1 })
    .to(word, { flexGrow: 0, duration: 1 }, "<");
};
