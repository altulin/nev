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
    direction === "down"
      ? header.classList.add("header--down")
      : header.classList.remove("header--down");
  }
  lastScrollY = scrollY > 0 ? scrollY : 0;
};

export const setSticky = () => {
  if (!header) return;
  window.addEventListener("scroll", updateScrollDirection);
};
