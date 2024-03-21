import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Splitting from "splitting";
gsap.registerPlugin(ScrollTrigger);

const developer = body.querySelector(".developer");
const title = developer.querySelector(".developer__title");

const tldevelop = gsap
  .timeline({
    paused: true,
  })
  .fromTo(title, { autoAlpha: 0, y: "-100" }, { autoAlpha: 0, y: "0" });
// .fromTo(
//   develop.querySelector(".develop__text"),
//   { autoAlpha: 0, y: "-100" },
//   { autoAlpha: 1, y: "0" },
//   "<",
// )
// .fromTo(
//   develop.querySelector(".develop__list"),
//   { autoAlpha: 0, y: "-100" },
//   { autoAlpha: 1, y: "0" },
// )
// .fromTo(
//   develop.querySelector(".develop__link"),
//   { autoAlpha: 0, y: "-100" },
//   { autoAlpha: 1, y: "0" },
//   "<",
// )
// .fromTo(
//   develop.querySelector(".develop__picture"),
//   { autoAlpha: 0, x: "300" },
//   { autoAlpha: 1, x: 0 },
//   "<",
// );

export const animationDevelop = () => {
  gsap.to(title, {
    scrollTrigger: {
      trigger: developer,
      toggleActions: "play none none pause",
      start: `top 60%`,
      end: "+=300",
      markers: true,
      // once: true,

      onToggle: ({ isActive }) => {
        if (!isActive) {
          tldevelop.play();
        }
      },
    },
  });
};
