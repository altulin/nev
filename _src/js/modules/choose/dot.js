import { body } from "../header/menu.js";
import { width } from "../sliders/dubrovka.js";
const choose = body.querySelector(".choose__content");

export const createChooseDots = () => {
  if (!choose) return;
  if (width < 769) return;
  const blocks = Array.from(choose.querySelectorAll(".choose__control"));

  blocks.forEach((element) => {
    let mouseX = 0;
    let mouseY = 0;

    let ballX = 0;
    let ballY = 0;

    let speed = 0.2;

    const btn = element.querySelector(".control");

    function animate() {
      let distX = mouseX - ballX;
      let distY = mouseY - ballY;

      ballX = ballX + distX * speed;
      ballY = ballY + distY * speed;

      btn.style.left = ballX + "px";
      btn.style.top = ballY + "px";

      requestAnimationFrame(animate);
    }

    animate();

    element.addEventListener("mousemove", function (e) {
      btn.classList.add("choose__circle--active");
      element.classList.add("choose__control--active");
      const delta = btn.offsetWidth / 2;

      mouseX = e.offsetX - delta;
      mouseY = e.offsetY - delta;
    });

    element.addEventListener("mouseleave", function (e) {
      btn.classList.remove("choose__circle--active");
      element.classList.remove("choose__control--active");
    });
  });
};
