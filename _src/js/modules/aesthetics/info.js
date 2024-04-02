import gsap from "gsap";
import { body } from "../header/menu.js";

export const infoVisible = () => {
  const aesthetics = body.querySelector(".aesthetics");
  if (!aesthetics) return;

  const listInfo = Array.from(
    aesthetics.querySelectorAll(".aesthetics-head__info"),
  );

  listInfo.forEach((element) => {
    const mark = element.querySelector(".aesthetics-head__mark");
    if (!mark) return;
    const block = mark.parentNode;

    const text = element.querySelector(".aesthetics-head__text");

    const tl = gsap
      .timeline({ paused: true })
      .fromTo(
        text,
        { width: `${text.clientWidth}px` },
        { width: "0", duration: 0.5 },
      );
    tl.play();

    mark.addEventListener("mousemove", function () {
      // text.classList.add("aesthetics-head__text--visible");
      block.classList.add("aesthetics-head__info--active");
      tl.reverse();
    });

    mark.addEventListener("mouseleave", function () {
      // text.classList.remove("aesthetics-head__text--visible");
      block.classList.remove("aesthetics-head__info--active");
      tl.play();
    });
  });
};
