import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
const about = body.querySelector(".about");

const tlAbout = gsap
  .timeline({
    paused: true,
  })
  .fromTo(
    about.querySelector(".about__subtitle"),
    { autoAlpha: 0, y: "-10%" },
    { autoAlpha: 1, y: "0" },
  )
  .fromTo(
    about.querySelector(".about__text"),
    { autoAlpha: 0, y: "-10%" },
    { autoAlpha: 1, y: "0" },
  )
  .fromTo(
    about.querySelector(".about__list"),
    { autoAlpha: 0, y: "-10%" },
    { autoAlpha: 1, y: "0" },
  )
  .fromTo(
    about.querySelector(".about__link"),
    { autoAlpha: 0, y: "-10%" },
    { autoAlpha: 1, y: "0" },
  )
  .fromTo(
    about.querySelector(".about__picture"),
    { autoAlpha: 0, x: "50%" },
    { autoAlpha: 1, x: 0 },
  );

export const animationAbout = () => {
  gsap.to(about.querySelector(".about__title"), {
    scrollTrigger: {
      trigger: about,
      toggleActions: "play none none pause",
      start: `top 60%`,
      end: "+=300",
      // markers: true,
      // once: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          tlAbout.play();
        }
      },
    },
    autoAlpha: 1,
    duration: 1,
  });
};
