import { header, body } from "./menu.js";

export const toTopHandle = (e) => {
  e.preventDefault();

  body.querySelector(".promo").scrollIntoView({
    behavior: "smooth",
  });
};

export const setToTop = () => {
  if (!header) return;
  const links = Array.from(body.querySelectorAll(".js-top"));
  links.forEach((link) => {
    link.addEventListener("click", toTopHandle);
  });
};
