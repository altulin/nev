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

  gsap
    .timeline()
    .set(title, { autoAlpha: 0, y: "200" })
    .set(text, { autoAlpha: 0, y: "200" });

  if (width > 768) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: yard,
          toggleActions: "play none none none",
          start: "top 80%",
          end: "+=300",
          // once: true,
        },
      })
      .call(() => {
        sliderYard.init();
      })
      .to(title, { autoAlpha: 1, y: 0, duration: 1 })
      .to(text, { autoAlpha: 1, y: 0, duration: 1 }, "<")
      .to(cover, { y: "100%", duration: 1 }, "<")
      .to(bar, { autoAlpha: 1 });
  } else {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: yard,
          toggleActions: "play none none none",
          start: "top 90%",
          end: "+=200",
          once: true,
        },
      })
      .to(cover, { y: "100%", duration: 1 }, "<")
      .call(() => {
        sliderYard.init();
      })
      .to(bar, { autoAlpha: 1 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: title,
          toggleActions: "play none none none",
          start: "top 90%",
          end: "+=50",
          once: true,
        },
      })
      .to(title, { autoAlpha: 1, y: 0, duration: 1 })
      .to(text, { autoAlpha: 1, y: 0, duration: 1 }, "<");
  }
};
