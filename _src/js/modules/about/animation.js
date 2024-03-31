import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Splitting from "splitting";
gsap.registerPlugin(ScrollTrigger);
import { width } from "../sliders/dubrovka.js";

let title, subTitle, text, link, img, about, itemUp, itemDown, list;

let tlAboutSubtitle,
  tlAboutText,
  tlAboutLink,
  tlAboutImg,
  tlAboutItemUp,
  tlAboutItemDown;

const createAnimation = () => {
  about = body.querySelector(".about");

  if (!about) return;

  title = about.querySelector(".about__title");
  subTitle = about.querySelector(".about__subtitle");
  text = about.querySelector(".about__text");
  itemUp = Array.from(about.querySelectorAll(".about__item--up"));
  itemDown = Array.from(about.querySelectorAll(".about__item--down"));
  list = about.querySelectorAll(".about__list");
  link = about.querySelector(".about__link");
  img = about.querySelector(".picture__img");

  tlAboutItemUp = gsap
    .timeline({ paused: true })
    .fromTo(
      itemUp,
      { autoAlpha: 1, y: "0" },
      { autoAlpha: 0, y: "50", duration: 1 },
    );

  tlAboutItemDown = gsap
    .timeline({ paused: true })
    .fromTo(
      itemDown,
      { autoAlpha: 1, y: "0" },
      { autoAlpha: 0, y: "50", duration: 1 },
    );

  tlAboutSubtitle = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      subTitle,
      { autoAlpha: 1, y: "0" },
      { autoAlpha: 0, y: "50", duration: 1 },
    );

  tlAboutText = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      text,
      { autoAlpha: 1, y: "0" },
      { autoAlpha: 0, y: "50", duration: 1 },
    );

  tlAboutLink = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      link,
      { autoAlpha: 1, y: "0" },
      { autoAlpha: 0, y: "50", duration: 1 },
    );

  tlAboutImg = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      img,
      width < 769
        ? { autoAlpha: 1, y: 0 }
        : {
            scale: 1,
          },
      width < 769
        ? { autoAlpha: 0, y: 100, duration: 1 }
        : { scale: 0.9, duration: 1 },
    );
};

createAnimation();

export const animationAbout = () => {
  let word;
  if (title) {
    Splitting({ target: title, whitespace: true, by: "chars" });
    word = title.querySelector(".word");
  }

  if (list) {
    tlAboutItemUp.play();
    tlAboutItemDown.play();

    gsap.to(list, {
      scrollTrigger: {
        trigger: list,
        toggleActions: "play none none pause",
        start: `top 90%`,
        end: "+=100",
        // markers: true,
        // once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutItemUp.reverse();
          }
        },
      },
    });

    gsap.to(list, {
      scrollTrigger: {
        trigger: list,
        toggleActions: "play none none pause",
        start: `top 80%`,
        end: "+=100",
        // markers: true,
        // once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutItemDown.reverse();
          }
        },
      },
    });
  }

  if (subTitle) {
    tlAboutSubtitle.play();
    gsap.to(subTitle, {
      scrollTrigger: {
        trigger: subTitle,
        toggleActions: "play none none pause",
        start: `top 100%`,
        end: "+=100",
        // markers: true,
        // once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutSubtitle.reverse();
          }
        },
      },
    });
  }
  if (text) {
    tlAboutText.play();
    gsap.to(text, {
      scrollTrigger: {
        trigger: text,
        toggleActions: "play none none pause",
        start: `top 100%`,
        end: "+=100",
        // markers: true,
        // once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutText.reverse();
          }
        },
      },
    });
  }

  if (link) {
    tlAboutLink.play();
    gsap.to(link, {
      scrollTrigger: {
        trigger: link,
        toggleActions: "play none none pause",
        start: `top 100%`,
        end: "+=100",
        // markers: true,
        // once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutLink.reverse();
          }
        },
      },
    });
  }
  if (img) {
    tlAboutImg.play();
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        toggleActions: "play none none pause",
        start: `top 70%`,
        end: "+=100",
        // markers: true,
        // once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutImg.reverse();
          }
        },
      },
    });
  }

  if (word) {
    if (width < 769) {
      gsap.set(word, { flexGrow: 0 });
    } else {
      gsap.to(word, {
        scrollTrigger: {
          trigger: title,
          toggleActions: "restart pause reverse pause",
          start: "top 90%",
          end: "bottom 60%",
          scrub: 2,
          // once: true,
          // markers: true,
        },
        flexGrow: 0,
        duration: 1,
      });
    }
  }
};
