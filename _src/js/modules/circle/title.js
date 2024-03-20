import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export const animationTitle = () => {
  const circle = body.querySelector(".circle");
  const title = circle.querySelector(".title");

  gsap.to(title, {
    scrollTrigger: {
      trigger: circle,
      toggleActions: "play none none pause",
      start: `top 60%`,
      end: "+=300",
      // markers: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          gsap.to(title, { autoAlpha: 1, duration: 1 });
        }
      },
    },
  });
};
