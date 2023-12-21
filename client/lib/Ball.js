/** @typedef {import('./Game').Drawable} Drawable */

import Point from "./Point.js";
import Vector2 from "./Vector2.js";

export default class Ball {
  /** @type {Point} */
  position;
  /** @type {Vector2} */
  speed = new Vector2(0, 0);

  width;
  height;

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
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  start() {}
}
