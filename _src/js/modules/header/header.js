import { body, btnMenu, menuTl } from "./menu.js";
import gsap from "gsap";

let lastScrollY = window.scrollY;
let scrollDirection = "";
const header = body.querySelector(".header--hide");

let timer = null;
const tlHeader = gsap.timeline({ paused: true });

if (header) {
  tlHeader.fromTo(
    header,
    { y: 0 },
    { y: "-101%", duration: 0.3, ease: "none" },
  );
}

const updateScrollDirection = () => {
  if (!header) return;
  const scrollY = window.scrollY;
  const direction = scrollY > lastScrollY ? "down" : "up";

  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }

  timer = setTimeout(function () {
    if (tlHeader.progress() !== 0) return;
    if (scrollY < 50) return;
    if (btnMenu.classList.contains("menu-icon--active")) return;

    tlHeader.play();
  }, 2000);

  if (
    direction !== scrollDirection &&
    (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
  ) {
    if (direction === "down") {
      if (tlHeader.progress() === 0) {
        tlHeader.play();
      }
    }
  }
  if (direction === "up") {
    if (tlHeader.progress() === 1) {
      if (!header.classList.contains("header--up")) {
        header.classList.add("header--up");
      }

      tlHeader.reverse();
    }

    if (scrollY < 50) {
      if (header.classList.contains("header--up")) {
        header.classList.remove("header--up");
      }
    }
  }

  lastScrollY = scrollY > 0 ? scrollY : 0;
};

export const setSticky = () => {
  if (!header) return;
  window.addEventListener("scroll", updateScrollDirection);
};
