import gsap from "gsap";
import { closeHandle, body } from "./menu.js";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin.js";
import { width } from "../sliders/dubrovka.js";

gsap.registerPlugin(ScrollToPlugin);

export const anchorHandle = async (element, e) => {
  scrollToHash(getSamePageAnchor(element), e);
  closeHandle();
};

// Detect if a link's href goes to the current page
const getSamePageAnchor = (link) => {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
};

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    // const yOffset = width < 769 ? -30 : -100;
    // const y = elem.getBoundingClientRect().top + window.scrollY + yOffset;
    // gsap.to(window, { scrollTo: elem, duration: 0.5 });
    elem.scrollIntoView({
      behavior: "smooth",
    });
  }
}

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);
