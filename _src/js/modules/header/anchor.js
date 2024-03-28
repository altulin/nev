import { closeHandle, body } from "./menu.js";

export const anchorHandle = async (e) => {
  const element = body.querySelector(`${e.target.dataset.anchor}`);

  e.preventDefault();

  await closeHandle();

  if (!element) {
    window.location.assign(`/index.html${e.target.dataset.anchor}`);
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
  });
};
