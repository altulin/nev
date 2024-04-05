import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
import Splitting from "splitting";

import { width } from "../sliders/dubrovka.js";
const near = body.querySelector(".near");

export const animationNearTitle = () => {
  if (width < 769) return;
  if (!near) return;
  const title = near.querySelector(".near-title");
  Splitting({ target: title, whitespace: true, by: "chars" });

  const word = title.querySelector(".word");

  gsap.timeline().set(word, { flexGrow: 1 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: title,
        toggleActions: "restart pause reverse pause",
        start: "top 90%",
        end: "bottom 60%",
        scrub: 2,
        // markers: true,
      },
    })
    .to(word, { flexGrow: 0, duration: 1 });
};

animationNearTitle();

export const animationLine = () => {
  const list = Array.from(body.querySelectorAll(".near-indication__line"));

  list.forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        toggleActions: "restart none reverse none",
        start: "top 90%",
        end: "top 89%",
        // scrub: 1,
        // markers: true,
      },
      width: "100%",
      duration: 0.5 + i * 0.2,
    });
  });
};

export const animationSection = () => {
  if (!near) return;
  const el = near.querySelector(".near__inner");
  if (!el) return;

  gsap.set(el, { autoAlpha: 0 });

  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      toggleActions: "play none none none",
      start: "top 70%",
      end: "30% 70%",
      once: true,
      scrub: true,
    },
    autoAlpha: 1,
    duration: 1,
  });
};
