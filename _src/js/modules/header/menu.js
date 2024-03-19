import gsap from "gsap";
import { anchorHandle } from "./anchor.js";
export const body = document.querySelector("body");
export const header = body.querySelector(".header");

const btnMenu = header.querySelector(".header-left__btn");
const anchorList = Array.from(header.querySelectorAll(".js-anchor"));

export const menuTl = gsap
  .timeline({ paused: true })
  .fromTo(header.querySelector(".menu"), { autoAlpha: 0 }, { autoAlpha: 1 })
  .fromTo(
    header.querySelector(".menu__figure"),
    { x: "20%", autoAlpha: 0 },
    { x: 0, autoAlpha: 1 },
  )
  .fromTo(
    header.querySelector(".menu-contetnt__wrap"),
    { y: "5%", autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.5, onComplete: () => {} },
    "<",
  );

const openHandle = async () => {
  btnMenu.classList.add("menu-icon--active");
  header.classList.add("header--menu-active");
  await menuTl.play();

  body.classList.add("scroll-lock");

  anchorList.forEach((element) => {
    element.addEventListener("click", anchorHandle);
  });
};

export const closeHandle = async () => {
  btnMenu.classList.remove("menu-icon--active");

  await menuTl.reverse();
  header.classList.remove("header--menu-active");

  body.classList.remove("scroll-lock");
  anchorList.forEach((element) => {
    element.removeEventListener("click", anchorHandle);
  });
};

const hadleBtn = () => {
  menuTl.progress() === 0 ? openHandle() : closeHandle();
};

export const controlMenu = () => {
  if (!btnMenu) {
    return;
  }

  btnMenu.addEventListener("click", hadleBtn);
};
