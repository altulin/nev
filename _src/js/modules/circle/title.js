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

  const words = Array.from(title.querySelectorAll("span"));

  words.forEach((item) => {
    const animationTitle = gsap
      .timeline({ paused: true })
      .fromTo(
        item,
        { backgroundPositionY: "100%" },
        { backgroundPositionY: "200%", duration: 1 },
      )
      .fromTo(item, { y: 0 }, { y: "100%", duration: 1 }, "<");

    animationTitle.play();

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
            animationTitle.reverse();
          }
        },
      },
    });
  });
};
