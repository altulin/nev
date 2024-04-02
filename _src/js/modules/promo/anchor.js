import { anchorHandle } from "../header/anchor.js";
import { body } from "../header/menu.js";

export const anchorPromoOrder = (e) => {
  const anchorList = Array.from(body.querySelectorAll(".promo-slide__link"));

  anchorList.forEach((element) => {
    element.addEventListener("click", (e) => anchorHandle(element, e));

    // element.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   body.querySelector(".choose").scrollIntoView({
    //     behavior: "smooth",
    //   });
    // });
  });
};
