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

  gsap.set(cover, { y: "-100%" });
  gsap.set(infoList, { y: 100, autoAlpha: 0 });
  gsap.set(infoBock, { y: 100, autoAlpha: 0 });

  gsap
    .timeline()
    .fromTo(
      title,
      { autoAlpha: 1, y: 0 },
      { autoAlpha: 0, y: 100, duration: 0.5 },
    )
    .fromTo(logo, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 }, "<")
    .play();

  gsap
    .timeline({
      scrollTrigger: {
        trigger: developer,
        toggleActions: "play none none none",
        start: `${width < 769 ? "top 100%" : "top 60%"}`,
        end: `${width < 769 ? "+=200" : "+=300"}`,
        once: true,
      },
    })
    .to(title, { autoAlpha: 1, y: 0, duration: 0.5 })
    .to(logo, { autoAlpha: 1, duration: 0.5 }, "<");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: developer,
        toggleActions: "play none none none",
        start: `${width < 769 ? "top 80%" : "top 80%"}`,
        end: `${width < 769 ? "+=200" : "+=200"}`,
        once: true,
      },
    })

    .to(infoList, { y: 0, autoAlpha: 1, duration: 0.5 })
    .to(infoBock, { y: 0, autoAlpha: 1, duration: 0.5 }, "<")
    .to(cover, { y: 0, duration: 1 });
};
