// import { header } from "./menu.js";
import { body, btnMenu, menuTl } from "./menu.js";
import gsap from "gsap";

let lastScrollY = window.scrollY;
let scrollDirection = "";
// let timerId;
const header = body.querySelector(".header--hide");

let timer = null;

const tlHeader = gsap
  .timeline({ paused: true })
  .fromTo(header, { y: 0 }, { y: "-100%", duration: 0.3, ease: "none" });

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
  }, 3000);

  if (
    direction !== scrollDirection &&
    (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
  ) {
    // clearTimeout(timerId);

    if (direction === "down") {
      if (tlHeader.progress() === 0) {
        tlHeader.play();
      }

      // if (!header.classList.contains("header--down")) {
      //   if (scrollY > 50) {
      //     timerId = setTimeout(() => {
      //       header.className = "";
      //       header.classList.add(`header`);
      //       header.classList.add(`header--${direction}`);
      //       if (body.classList.contains("scroll-lock")) {
      //         body.classList.remove("scroll-lock");
      //       }
      //       if (btnMenu.classList.contains("menu-icon--active")) {
      //         btnMenu.classList.remove("menu-icon--active");
      //       }
      //       if (menuTl.progress() > 0) {
      //         menuTl.reverse();
      //       }
      //     }, 800);
      //   }
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

    //   if (timerId) {
    //     clearTimeout(timerId);
    //     timerId = 0;
    //   }
    //   header.className = "";
    //   header.classList.add(`header`);
    //   if (scrollY > 50) {
    //     header.classList.add(`header--${direction}`);
    //   }
    // }
  }

  // console.log(timer);

  lastScrollY = scrollY > 0 ? scrollY : 0;
};

// window.addEventListener('scroll', function() {

// }, false);

export const setSticky = () => {
  if (!header) return;
  window.addEventListener("scroll", updateScrollDirection);
};
