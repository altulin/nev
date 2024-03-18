import gsap from "gsap";

const locationTl = gsap.timeline({ pause: true });

const getEl = () => {
  const el = document.querySelector(".location");
  if (el) {
    return el;
  }
};

locationTl.fromTo();

export default locationTl;
