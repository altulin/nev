import { header, body } from "./menu.js";

export const toTopHandle = (e) => {
  e.preventDefault();

  body.querySelector(".promo").scrollIntoView({
    behavior: "smooth",
  });
};

export const setToTop = () => {
  if (!header) return;
  const logoLink = header.querySelector(".header-middle__logo");
  logoLink.addEventListener("click", toTopHandle);
};
