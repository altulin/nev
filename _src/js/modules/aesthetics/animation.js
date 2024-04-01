import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

const aesthetics = body.querySelector(".aesthetics");

import { width } from "../sliders/dubrovka.js";

export const animationAesthetics = () => {
  if (width < 769) return;
  if (!aesthetics) return;
  const title = aesthetics.querySelector(".aesthetics__title");

  gsap.timeline().set(title, { backgroundPositionY: "200%", y: "100%" });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: title,
        toggleActions: "play none reverse none",
        start: `${width < 769 ? "top 100%" : "top 90%"}`,
        end: `${width < 769 ? "+=200" : "+=100"}`,
      },
    })
    .to(title, { backgroundPositionY: "100%", duration: 1 })
    .to(title, { y: 0, duration: 1 }, "<");
};
