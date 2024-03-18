import { closeHandle, body } from "./menu.js";

export const anchorHandle = async (e) => {
  const element = body.querySelector(`${e.target.dataset.anchor}`);
  e.preventDefault();

  await closeHandle();

  element.scrollIntoView({
    behavior: "smooth",
  });
};
