import { body } from "../header/menu.js";
const footer = body.querySelector(".footer");

export const targetWa = () => {
  if (!footer) return;

  const target = footer.querySelector(".soc__link--wa");

  target.addEventListener("click", (e) => {
    window.ym(96902955, "reachGoal", "WhatsApp_lid");
  });
};
