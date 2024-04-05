import gsap from "gsap";
import { anchorHandle } from "./anchor.js";
export const body = document.querySelector("body");
export const header = body.querySelector(".header");

export const btnMenu = header.querySelector(".header-left__btn");
const anchorList = Array.from(body.querySelectorAll(".js-anchor"));

export const menuTl = gsap
  .timeline({ paused: true })
  .fromTo(
    header.querySelector(".menu"),
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.3 },
  )
  .fromTo(
    header.querySelector(".menu__figure"),
    { x: 50, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: 0.3 },
    "<",
  )
  .fromTo(
    header.querySelector(".menu-contetnt__wrap"),
    { y: -30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.3 },
    "<",
  );

const openHandle = async () => {
  btnMenu.classList.add("menu-icon--active");
  header.classList.add("header--menu-active");
  body.classList.add("scroll-lock");
  await menuTl.play();

  anchorList.forEach((element) => {
    element.addEventListener("click", (e) => anchorHandle(element, e));
  });
};

export const closeHandle = async () => {
  btnMenu.classList.remove("menu-icon--active");
  body.classList.remove("scroll-lock");

  await menuTl.reverse();
  header.classList.remove("header--menu-active");

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
