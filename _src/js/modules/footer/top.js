import { body } from "../header/menu.js";
import gsap from "gsap";
import { width } from "../sliders/dubrovka.js";

export const topBtnAnimation = () => {
  if (width < 769) return;
  const footer = body.querySelector(".footer");
  if (!footer) return;
  const btnAbsolute = footer.querySelector(".footer__top--absolute");
  const btnFixed = footer.querySelector(".footer__top--fixed");
  if (!btnFixed || !btnAbsolute) return;
  const content = body.querySelector(".dubrovka__content");

  const data = btnFixed.getBoundingClientRect();
  gsap.set(btnAbsolute, { autoAlpha: 0 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: btnAbsolute,
        start: `top ${data.top}px`,
        end: `top ${data.top}px`,
        // markers: true,
        toggleActions: "play none none reverse",
      },
    })
    .set(btnFixed, { autoAlpha: 0 })
    .set(btnAbsolute, { autoAlpha: 1 });

  if (content) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: content,
          toggleActions: "restart none reverse none",
          start: "top 100%",
          end: "+=100",
        },
      })
      .fromTo(btnFixed, { autoAlpha: 0 }, { autoAlpha: 1 });
  }
};
