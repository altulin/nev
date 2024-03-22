import { body } from "../header/menu.js";

export const infoVisible = () => {
  const aesthetics = body.querySelector(".aesthetics");
  if (!aesthetics) return;
  const listInfo = Array.from(
    aesthetics.querySelectorAll(".aesthetics-head__info"),
  );

  listInfo.forEach((element) => {
    const mark = element.querySelector(".aesthetics-head__mark");
    const text = element.querySelector(".aesthetics-head__text");

    mark.addEventListener("mousemove", function () {
      text.classList.add("aesthetics-head__text--visible");
    });

    mark.addEventListener("mouseleave", function () {
      text.classList.remove("aesthetics-head__text--visible");
    });
  });
};
