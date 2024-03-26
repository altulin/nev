import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
import { width } from "../sliders/dubrovka.js";

const circle = body.querySelector(".circle");

export const animationCircle = () => {
  if (!circle) return;
  const title = circle.querySelector(".title");
  if (!title) return;

  const titleTl = gsap
    .timeline({ paused: true })
    .fromTo(
      title,
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: 50, duration: 1 },
    );

  titleTl.play();

  gsap.to(title, {
    scrollTrigger: {
      trigger: circle,
      toggleActions: "play none none pause",
      // start: `top 60%`,
      start: `top 80%`,
      end: "+=100",
      // markers: true,
      once: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          titleTl.reverse();
        }
      },
    },
  });
};
