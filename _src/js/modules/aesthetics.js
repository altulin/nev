import Tabby from "tabbyjs";
import { width } from "./sliders/dubrovka.js";
import { makeCover } from "./sliders/aesthetics.js";

const tabs = new Tabby(".aesthetics-head");
tabs.toggle("#exit");

// document.addEventListener("tabby", function (event) {
//   if (width < 769) return;
//   var content = event.detail.content;

//   if (!content.classList.contains("aesthetics-tab__swiper")) return;
//   const list = Array.from(content.querySelectorAll(".aesthetics-tab__slide"));

//   // makeCover(list);
// });
