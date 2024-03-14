export const addEvent = (selector, type, callback) => {
  const element = document.querySelector(selector);
  if (element !== null) {
    element.addEventListener(type, callback, false);
  }
};

export const rmEvent = (selector, type, callback) => {
  const element = document.querySelector(selector);
  if (element !== null) {
    element.removeEventListener(type, callback, false);
  }
};
