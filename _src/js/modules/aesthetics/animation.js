import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

const aesthetics = body.querySelector(".aesthetics");

import { width } from "../sliders/dubrovka.js";

export const animationAesthetics = () => {
  if (!aesthetics) return;
  const title = aesthetics.querySelector(".aesthetics__title");

  const animationTitle = gsap
    .timeline({ paused: true })
    .fromTo(
      title,
      { backgroundPositionY: "100%" },
      { backgroundPositionY: "200%", duration: 1 },
    )
    .fromTo(title, { y: 0 }, { y: "100%", duration: 1 }, "<");

  animationTitle.play();

  gsap.to(title, {
    scrollTrigger: {
      trigger: title,
      toggleActions: "play pause reverse pause",
      start: `${width < 769 ? "top 100%" : "top 90%"}`,
      end: `${width < 769 ? "+=200" : "+=100"}`,
      once: true,
      // markers: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          animationTitle.reverse();
        }
      },
    },

    duration: 1,
  });
};
