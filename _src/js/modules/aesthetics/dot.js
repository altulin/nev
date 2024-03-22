import { body } from "../header/menu.js";
import { width } from "../sliders/dubrovka.js";
export const aesthetics = body.querySelector(".aesthetics-touch");
export const listBlocks = Array.from(
  body.querySelectorAll(".aesthetics-touch"),
);

export const createAestheticsDots = () => {
  if (width < 769) return;
  if (!aesthetics) return;

  const blocks = listBlocks
    .map((item) => {
      return Array.from(item.querySelectorAll(".aesthetics-touch__block"));
    })
    .flat();

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
      btn.classList.add("aesthetics-touch__btn--active");

      mouseX = e.offsetX - 95;
      mouseY = e.offsetY - 95;
    });

    element.addEventListener("mouseleave", function (e) {
      btn.classList.remove("aesthetics-touch__btn--active");
    });
  });
};
