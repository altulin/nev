import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Splitting from "splitting";
gsap.registerPlugin(ScrollTrigger);
import { width } from "../sliders/dubrovka.js";

const developer = body.querySelector(".developer");

export const animationDeveloper = () => {
  if (!developer) return;

  const title = developer.querySelector(
    `.developer__title--${width < 769 ? "tb" : "dt"}`,
  );
  const logo = developer.querySelector(".developer-info__logo");
  const cover = developer.querySelector(".developer__figure-cover");
  const infoBock = developer.querySelector(".info-block");
  const infoList = developer.querySelector(".info-list");

  const animationCover = gsap
    .timeline({ paused: true })

    .fromTo(cover, { y: 0 }, { y: "-100%", duration: 0.5 })

    .fromTo(
      infoList,
      { y: 0, autoAlpha: 1 },
      { y: 100, autoAlpha: 0, duration: 1 },
    )
    .fromTo(
      infoBock,
      { y: 0, autoAlpha: 1 },
      { y: 100, autoAlpha: 0, duration: 1 },
      "<",
    );

  const animationTitle = gsap
    .timeline({ paused: true })
    .fromTo(
      title,
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: 100, duration: 0.5 },
    )
    .fromTo(logo, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 }, "<");

  animationTitle.play();
  animationCover.play();

  gsap.to(title, {
    scrollTrigger: {
      trigger: developer,
      toggleActions: "play none none pause",
      start: `${width < 769 ? "top 100%" : "top 60%"}`,
      end: `${width < 769 ? "+=200" : "+=300"}`,
      once: true,
      // markers: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          animationTitle.reverse();
        }
      },
    },
  });

  gsap.to(infoBock, {
    scrollTrigger: {
      trigger: developer,
      toggleActions: "play none none pause",
      start: `${width < 769 ? "top 80%" : "top 60%"}`,
      end: `${width < 769 ? "+=200" : "+=300"}`,
      // markers: true,
      once: true,
      onToggle: ({ isActive }) => {
        if (!isActive) {
          animationCover.reverse();
        }
      },
    },
  });
};
