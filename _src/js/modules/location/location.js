import gsap from "gsap";
import { body } from "../header/menu.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

export const animationPins = () => {
  const list = Array.from(body.querySelectorAll(".location-flag__line"));
  const location = body.querySelector(".location");

  if (!location) return;

  const figure = location.querySelector(".location-logo__figure");
  const logo = location.querySelector(".location-logo__link");

  list.forEach((item, i) => {
    // const tl = gsap
    //   .timeline({ paused: true })
    //   .fromTo(
    //     location.querySelector(`.location-flag__title--${i + 1}`),
    //     { autoAlpha: 1 },
    //     { autoAlpha: 0 },
    //   )
    //   .fromTo(item, { height: "100%" }, { height: 0 })
    //   .play();

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
          end: "top 10%",
          scrub: 0.5,
          // markers: true,
        },
      })
      .to(item, { height: "100%" })
      .to(flag, {
        autoAlpha: 1,
      });

    // gsap.to(item, {
    //   scrollTrigger: {
    //     trigger: location,
    //     toggleActions: "play none reverse pause",
    //     start: `top 60%`,
    //     end: "+=100",
    //     // markers: true,
    //     scrub: true,
    //     onse: true,
    //     onToggle: ({ isActive }) => {
    //       if (!isActive) {
    //         tl.reverse();
    //       }
    //     },
    //   },
    // });
  });

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

  // gsap.to(logo, {
  //   scrollTrigger: {
  //     trigger: location,
  //     toggleActions: "play none none pause",
  //     start: `top 50%`,
  //     end: "+=300",
  //   },
  //   autoAlpha: 1,
  //   duration: 1,
  // });
};
