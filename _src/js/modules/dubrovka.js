import gsap from "gsap";
import Tabby from "tabbyjs";
import { width } from "./sliders/dubrovka.js";

const tabs = new Tabby(".tabs-head");
tabs.toggle("#shore");

document.addEventListener(
  "tabby",
  function (event) {
    if (width < 769) return;
    const tab = event.target;

    if (!tab.classList.contains("tabs-head__link")) return;
    let slideActive;
    const content = event.detail.content;
    slideActive = content.querySelector(".swiper-slide-active");

    if (!slideActive) {
      slideActive = Array.from(content.querySelectorAll(".swiper-slide"))[0];
    }

    gsap.to(slideActive, { width: "43.4%" });
  },
  false,
);
