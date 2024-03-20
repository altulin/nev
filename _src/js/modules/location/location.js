import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export const animationPins = () => {
  const list = Array.from(body.querySelectorAll(".location-flag__line"));

  const location = body.querySelector(".location");

  list.forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: location,
        toggleActions: "play none none pause",
        start: `top 60%`,
        end: "+=300",
        onToggle: ({ isActive }) => {
          if (!isActive) {
            gsap.to(body.querySelector(`.location-flag__title--${i + 1}`), {
              autoAlpha: 1,
            });
          }
        },
      },
      height: "100%",
      duration: 1,
    });
  });
};
