import Accordion from "accordion-js";
import { body } from "../header/menu.js";
const accordion = body.querySelector(".js-accordion");

export const makeAccordionHeder = () => {
  if (accordion.offsetHeight === 0 && accordion.offsetWidth === 0) return;
  if (!accordion) return;
  new Accordion(".js-accordion", {});
};
