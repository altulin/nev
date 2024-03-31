import gsap from "gsap";
import { closeHandle, body } from "./menu.js";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin.js";

gsap.registerPlugin(ScrollToPlugin);

export const anchorHandle = async (e) => {
  const element = body.querySelector(`${e.target.dataset.anchor}`);

  e.preventDefault();

  await closeHandle();

  if (!element) {
    window.location.assign(`/index.html${e.target.dataset.anchor}`);
    return;
  }

  // console.log(window);

  // gsap.to(window, { scrollTo: element, duration: 10 });

  element.scrollIntoView({
    behavior: "smooth",
  });
};

// Detect if a link's href goes to the current page
// function getSamePageAnchor(link) {
//   if (
//     link.protocol !== window.location.protocol ||
//     link.host !== window.location.host ||
//     link.pathname !== window.location.pathname ||
//     link.search !== window.location.search
//   ) {
//     return false;
//   }

//   return link.hash;
// }

// // Scroll to a given hash, preventing the event given if there is one
// function scrollToHash(hash, e) {
//   const elem = hash ? document.querySelector(hash) : false;
//   if (elem) {
//     if (e) e.preventDefault();
//     gsap.to(window, { scrollTo: elem });
//   }
// }

// // If a link's href is within the current page, scroll to it instead
// document.querySelectorAll("a[href]").forEach((a) => {
//   a.addEventListener("click", (e) => {
//     scrollToHash(getSamePageAnchor(a), e);
//   });
// });

// // Scroll to the element in the URL's hash on load
// scrollToHash(window.location.hash);
