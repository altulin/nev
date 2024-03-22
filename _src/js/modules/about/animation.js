import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Splitting from "splitting";
gsap.registerPlugin(ScrollTrigger);
const about = body.querySelector(".about");
const title = about.querySelector(".about__title");

const tlAbout = gsap
  .timeline({
    paused: true,
  })
  .fromTo(
    about.querySelector(".about__subtitle"),
    { autoAlpha: 0, y: "-100" },
    { autoAlpha: 1, y: "0" },
  )
  .fromTo(
    about.querySelector(".about__text"),
    { autoAlpha: 0, y: "-100" },
    { autoAlpha: 1, y: "0" },
    "<",
  )
  .fromTo(
    about.querySelector(".about__list"),
    { autoAlpha: 0, y: "-100" },
    { autoAlpha: 1, y: "0" },
  )
  .fromTo(
    about.querySelector(".about__link"),
    { autoAlpha: 0, y: "-100" },
    { autoAlpha: 1, y: "0" },
    "<",
  )
  .fromTo(
    about.querySelector(".about__picture"),
    { autoAlpha: 0, x: "300" },
    { autoAlpha: 1, x: 0 },
    "<",
  );

export const animationAbout = () => {
  Splitting({ target: title, whitespace: true, by: "chars" });
  const word = title.querySelector(".word");

  gsap.to(title, {
    scrollTrigger: {
      trigger: about,
      toggleActions: "play none none pause",
      start: `top 60%`,
      end: "+=300",
      // markers: true,
      once: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          tlAbout.play();
        }
      },
    },
    autoAlpha: 1,
    duration: 1,
  });

  gsap.to(word, {
    scrollTrigger: {
      trigger: title,
      toggleActions: "play pause reverce pause",
      start: "top 70%",
      once: true,
    },
    flexGrow: 0,
    duration: 1,
  });
};
