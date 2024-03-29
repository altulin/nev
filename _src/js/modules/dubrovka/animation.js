import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

import { width } from "../sliders/dubrovka.js";
import Splitting from "splitting";

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

  if (!title) return;

  const words = Array.from(title.querySelectorAll("span"));
  words.forEach((item) => {
    Splitting({ target: item, whitespace: true, by: "chars" });
  });

  const word = words.map((item) => item.querySelector(".word"));

  gsap
    .timeline()
    // .to(title, { width: getWidth() }, { width: "100%", duration: 1 })
    // .to(word, { flexGrow: 0 }, { flexGrow: 1, duration: 1 }, "<");
    .set(title, { width: "100%" })
    .set(word, { flexGrow: 1 });

  // tl.play();

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: title,
        toggleActions: "restart pause reverse pause",
        start: "top 60%",
        end: "bottom 40%",
        // markers: true,
        scrub: 2,
      },
    })
    .to(title, { width: getWidth(), duration: 1 })
    .to(word, { flexGrow: 0, duration: 1 }, "<");

  // gsap.to(title, {
  //   scrollTrigger: {
  //     trigger: title,
  //     toggleActions: "play pause reverse pause",
  //     start: "top 70%",
  //     end: "+=50",
  //     // markers: true,
  //     once: true,

  //     onToggle: ({ isActive }) => {
  //       if (!isActive) {
  //         tl.reverse();
  //       }
  //     },
  //   },
  // });
};
