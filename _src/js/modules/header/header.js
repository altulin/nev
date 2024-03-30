import { header } from "./menu.js";

let lastScrollY = window.scrollY;
let scrollDirection = "";

const updateScrollDirection = () => {
  const scrollY = window.scrollY;
  const direction = scrollY > lastScrollY ? "down" : "up";
  if (
    direction !== scrollDirection &&
    (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
  ) {
    setTimeout(() => {
      header.className = "";
      header.classList.add(`header`);

      if (scrollY > 50) {
        header.classList.add(`header--${direction}`);
      }
    }, 1000);
  }
  lastScrollY = scrollY > 0 ? scrollY : 0;
};

export const setSticky = () => {
  if (!header) return;
  window.addEventListener("scroll", updateScrollDirection);
};
