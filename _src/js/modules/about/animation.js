import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Splitting from "splitting";
gsap.registerPlugin(ScrollTrigger);

let title, subTitle, text, list, link, img, about;

let tlAboutSubtitle, tlAboutText, tlAboutList, tlAboutLink, tlAboutImg;

const createAnimation = () => {
  about = body.querySelector(".about");

  if (!about) return;

  title = about.querySelector(".about__title");
  subTitle = about.querySelector(".about__subtitle");
  text = about.querySelector(".about__text");
  list = about.querySelector(".about__list");
  link = about.querySelector(".about__link");
  img = about.querySelector(".picture__img");

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

  tlAboutList = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      list,
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
      {
        scale: 1,
      },
      { scale: 0.9, duration: 1 },
    );
};

createAnimation();

export const animationAbout = () => {
  let word;
  if (title) {
    Splitting({ target: title, whitespace: true, by: "chars" });
    word = title.querySelector(".word");
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
        once: true,
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
        once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutText.reverse();
          }
        },
      },
    });
  }
  if (tlAboutList) {
    tlAboutList.play();
    gsap.to(list, {
      scrollTrigger: {
        trigger: list,
        toggleActions: "play none none pause",
        start: `top 100%`,
        end: "+=100",
        // markers: true,
        once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutList.reverse();
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
        once: true,
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
        start: `bottom 100%`,
        end: "+=100",
        // markers: true,
        once: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlAboutImg.reverse();
          }
        },
      },
    });
  }

  if (word) {
    gsap.to(word, {
      scrollTrigger: {
        trigger: title,
        toggleActions: "play pause reverce pause",
        start: "top 70%",
        once: true,
        // markers: true,
      },
      flexGrow: 0,
      duration: 1,
    });
  }
};
