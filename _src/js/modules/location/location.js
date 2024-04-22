import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export const animationPins = () => {
  const list = Array.from(body.querySelectorAll(".location-flag__line"));
  const location = body.querySelector(".location");

  if (!location) return;

  const figure = location.querySelector(".location-logo__figure");
  const title = location.querySelector(".location-logo__title");

  list.forEach((item, i) => {
    const flag = location.querySelector(`.location-flag__title--${i + 1}`);

    gsap
      .timeline()
      .set(flag, {
        autoAlpha: 0,
      })
      .set(item, { height: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: flag,
          toggleActions: "restart none reverse none",
          start: "top 90%",
          end: "top 60%",
          scrub: 0.5,
          // markers: true,
        },
      })
      .to(item, { height: "100%" })
      .to(flag, {
        autoAlpha: 1,
      });
  });

  if (figure) {
    gsap.to(figure, {
      scrollTrigger: {
        trigger: location,
        toggleActions: "play none none pause",
        start: `top 50%`,
        end: "+=300",
      },
      scale: 1,
      duration: 1,
    });
  }

  if (title) {
    gsap.to(title, {
      scrollTrigger: {
        trigger: location,
        toggleActions: "play none none pause",
        start: `top 50%`,
        end: "+=300",
      },
      scale: 1,
      duration: 1,
    });
  }
};
