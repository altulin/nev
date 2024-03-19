import { body } from "./header/menu.js";

const observeHandleUp = (target) => {
  console.log("up");
};

const observeHandleDown = (target) => {
  console.log("down");
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.boundingClientRect.top < 0) {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          observeHandleUp(entry.target);
        });
      } else {
        requestAnimationFrame(() => {
          observeHandleDown(entry.target);
        });
      }
    }
  });
};

const options = {
  // threshold: 1,

  threshold: 0.5,
};

export const makeObserver = () => {
  const list = Array.from(body.querySelectorAll(".js-observer"));
  const observer = new IntersectionObserver(callback, options);

  list.forEach((item) => observer.observe(item));
};
