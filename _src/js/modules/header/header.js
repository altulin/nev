// import { header } from "./menu.js";
import { body } from "./menu.js";

let lastScrollY = window.scrollY;
let scrollDirection = "";
let timerId;
const header = body.querySelector(".header--hide");

const updateScrollDirection = () => {
  if (!header) return;

  const scrollY = window.scrollY;
  const direction = scrollY > lastScrollY ? "down" : "up";
  if (
    direction !== scrollDirection &&
    (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
  ) {
    if (direction === "down") {
      if (!header.classList.contains("header--down")) {
        timerId = setTimeout(() => {
          header.className = "";
          header.classList.add(`header`);

          if (scrollY > 50) {
            header.classList.add(`header--${direction}`);
          }
        }, 800);
      }
    }
    if (direction === "up") {
      clearTimeout(timerId);
      header.className = "";
      header.classList.add(`header`);

      if (scrollY > 50) {
        header.classList.add(`header--${direction}`);
      }
    }
  }
  lastScrollY = scrollY > 0 ? scrollY : 0;
};

export const setSticky = () => {
  if (!header) return;
  window.addEventListener("scroll", updateScrollDirection);
};
