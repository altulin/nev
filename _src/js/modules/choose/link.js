import gsap from "gsap";
import { body } from "../header/menu.js";
const choose = body.querySelector(".choose__content");

const location = () => {
  window.location.assign(
    "https://plan7.ru/catalog/adm/?page=zk&id=103&path=embed",
  );
};

export const chooseLink = () => {
  if (!choose) return;
  const leftLink = choose.querySelector(".choose__left");
  const rightLink = choose.querySelector(".choose__right");
  const bg = choose.querySelector(".choose__bg");

  leftLink.addEventListener("click", (e) => {
    e.preventDefault();
    gsap
      .timeline()
      .to(leftLink.querySelector(".choose-block"), {
        display: "none",
        duration: 0.1,
      })
      .to(rightLink.querySelector(".choose-block"), {
        display: "none",
        duration: 0.1,
      })
      .fromTo(leftLink, { width: "50%" }, { width: "100%", duration: 1 })
      .fromTo(rightLink, { width: "50%" }, { width: 0, duration: 1 }, "<")
      .to(bg, { scale: 1.1, duration: 1 })
      .then(() => {
        location();
      });
  });

  rightLink.addEventListener("click", (e) => {
    e.preventDefault();
    gsap
      .timeline()
      .to(leftLink.querySelector(".choose-block"), {
        display: "none",
        duration: 0.1,
      })
      .to(
        rightLink.querySelector(".choose-block"),
        {
          x: "-50%",
          left: "50%",
          duration: 1,
        },
        "<",
      )
      .fromTo(rightLink, { width: "50%" }, { width: "100%", duration: 1 }, "<")
      .fromTo(leftLink, { width: "50%" }, { width: 0, duration: 1 }, "<")
      .then(() => {
        location();
      });
  });
};
