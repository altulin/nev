import { body } from "../header/menu.js";
import { width } from "../sliders/dubrovka.js";
const circle = body.querySelector(".circle-cover__block--center");

export const createCircleDots = () => {
  if (!circle) return;
  if (width < 769) return;

  const blocks = Array.from(circle.querySelectorAll(".circle-control__block"));

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
      btn.classList.add("circle-control__btn--active");

      mouseX = e.offsetX - 95;
      mouseY = e.offsetY - 95;
    });

    element.addEventListener("mouseleave", function (e) {
      btn.classList.remove("circle-control__btn--active");
    });
  });
};
