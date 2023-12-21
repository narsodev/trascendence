/** @typedef {import('./Game').Drawable} Drawable */

import Point from "./Point.js";
import Vector2 from "./Vector2.js";

/** @implements {Drawable} */
export default class Player {
  /** @type {Point} */
  position;
  /** @type {Vector2} */
  speed = new Vector2(0, 0);

  width;
  height;
  #image = new Image();

  /**
   *
   * @param {number} width
   * @param {number} height
   * @param {number} x
   * @param {number} y
   */
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.position = new Point(x, y);
    this.#image.src =
      "https://www.giantbomb.com/a/uploads/scale_small/8/87790/1637684-blinkysprite.png";
  }

  start() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
          this.speed.y = 5;
          break;
        case "ArrowUp":
          this.speed.y = -5;
          break;
        case "ArrowLeft":
          this.speed.x = -5;
          break;
        case "ArrowRight":
          this.speed.x = 5;
          break;
      }
    });
    document.addEventListener("keyup", () => {
      this.speed.x = 0;
      this.speed.y = 0;
    });
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      this.#image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
