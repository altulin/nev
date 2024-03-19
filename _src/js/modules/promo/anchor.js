import { body } from "../header/menu.js";

export const anchorPromoOrder = (e) => {
  const anchorList = Array.from(body.querySelectorAll(".promo-slide__link"));

  anchorList.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      body.querySelector(".choose").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};
