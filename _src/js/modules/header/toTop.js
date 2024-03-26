import { body } from "./menu.js";
const main = body.querySelector(".page-main");

export const toTopHandle = (e) => {
  e.preventDefault();

  main.scrollIntoView({
    behavior: "smooth",
  });
};

export const setToTop = () => {
  if (!main) return;
  const links = Array.from(body.querySelectorAll(".js-top"));
  links.forEach((link) => {
    link.addEventListener("click", toTopHandle);
  });
};
