import { closeHandle, body } from "./menu.js";

export const anchorHandle = async (e) => {
  const element = body.querySelector(`${e.target.dataset.anchor}`);

  e.preventDefault();

  await closeHandle();

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
  });
};
