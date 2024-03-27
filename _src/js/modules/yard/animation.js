import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { sliderYard } from "../sliders/yard.js";
import { width } from "../sliders/dubrovka.js";
gsap.registerPlugin(ScrollTrigger);

export const animationYard = () => {
  const yard = body.querySelector(".yard");
  if (!yard) return;
  const title = yard.querySelector(".yard__title");
  const text = yard.querySelector(".yard__text");
  const cover = yard.querySelector(".yard__cover");
  const bar = yard.querySelector(".yard__pagination");

  const tlYard = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      title,
      { autoAlpha: 0, y: "200" },
      { autoAlpha: 1, y: "0", duration: 1 },
    )
    .fromTo(
      text,
      { autoAlpha: 0, y: 200 },
      { autoAlpha: 1, y: 0, duration: 1 },
      "<",
    )
    .to(cover, { y: "100%", duration: 1 }, "<")
    .call(() => {
      sliderYard.enable();
      sliderYard.slideNext(2000);
    })
    .to(bar, { autoAlpha: 1 });

  const tlYardMobPic = gsap
    .timeline({
      paused: true,
    })
    .to(cover, { y: "100%", duration: 1 }, "<")
    .call(() => {
      sliderYard.enable();
      sliderYard.slideNext(2000);
    })
    .to(bar, { autoAlpha: 1 });

  const tlYartTypograthy = gsap
    .timeline({ paused: true })
    .fromTo(
      title,
      { autoAlpha: 0, y: "200" },
      { autoAlpha: 1, y: "0", duration: 1 },
    )
    .fromTo(
      text,
      { autoAlpha: 0, y: 200 },
      { autoAlpha: 1, y: 0, duration: 1 },
      "<",
    );

  if (width > 768) {
    gsap.to(title, {
      scrollTrigger: {
        trigger: yard,
        toggleActions: "play none none pause",
        start: "top 80%",
        end: "+=300",

        once: true,
        // markers: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlYard.play();
          }
        },
      },
    });
  } else {
    gsap.to(title, {
      scrollTrigger: {
        trigger: yard,
        toggleActions: "play none none pause",
        start: "top 90%",
        end: "+=200",

        once: true,
        // markers: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlYardMobPic.play();
          }
        },
      },
    });

    gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        toggleActions: "play none none pause",
        start: "top 90%",
        end: "+=50",

        once: true,
        markers: true,
        onToggle: ({ isActive }) => {
          if (!isActive) {
            tlYartTypograthy.play();
          }
        },
      },
    });
  }
};
