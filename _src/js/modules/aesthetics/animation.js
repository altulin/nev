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
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: 100, duration: 0.5 },
    );

  animationTitle.play();

  gsap.to(title, {
    scrollTrigger: {
      trigger: title,
      toggleActions: "play pause reverce pause",
      start: "top 70%",
      end: `${width < 769 ? "+=200" : "+=300"}`,
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
