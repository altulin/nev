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

  // gsap.to(word, {
  //   scrollTrigger: {
  //     trigger: title,
  //     toggleActions: "play pause reverse pause",
  //     start: "top 70%",
  //     once: true,
  //   },
  //   flexGrow: 0,
  //   duration: 1,
  // });
};

animationNearTitle();

export const animationLine = () => {
  const list = Array.from(body.querySelectorAll(".near-indication__line"));

  list.forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        toggleActions: "restart pause reverse pause",
        // start: `top ${90 - i * 1}%`,
        // end: "+=300",
        start: "top 60%",
        end: "bottom 40%",
        // markers: true,
        // once: true,
        scrub: 3,
      },
      width: "100%",
      duration: 5,
    });
  });
};

export const animationSection = () => {
  if (!near) return;
  const el = near.querySelector(".near__inner");
  if (!el) return;

  const tlNear = gsap
    .timeline()
    .fromTo(el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 });

  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      toggleActions: "play pause none pause",
      start: "top 70%",
      end: "+=100",
      // markers: true,
      // once: true,

      onToggle: ({ isActive }) => {
        if (!isActive) {
          tlNear.reverse();
        }
      },
    },
  });
};
