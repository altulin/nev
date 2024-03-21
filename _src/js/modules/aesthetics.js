import Tabby from "tabbyjs";
import { createAestheticsDots } from "./aesthetics/dot.js";

const tabs = new Tabby(".aesthetics-head");
tabs.toggle("#exit");

document.addEventListener(
  "tabby",
  function (event) {
    var tab = event.target;
    var content = event.detail.content;
    // createAestheticsDots();
  },
  false,
);
