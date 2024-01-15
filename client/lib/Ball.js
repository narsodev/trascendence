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

  start() {
    this.speed.x = Math.floor(Math.random() * 9) + 1;
    this.speed.y = Math.floor(Math.random() * 9) + 1;
  }

  /**
   * @param {number} width
   * @param {number} height
   * @param {Drawable[]} objects
   */

  checkCollision(width, height, objects) {
    const nextX = this.position.x + this.speed.x;
    const nextXWithWidth = nextX + this.width;
    const outOfXBounds = nextX < 0 || nextXWithWidth > width;
    if (outOfXBounds) {
      this.speed.x *= -1;
    } else {
    }
    this.position.x += this.speed.x;

    const nextY = this.position.y + this.speed.y;
    const nextYWithWidth = nextY + this.height;
    const outOfYBounds = nextY < 0 || nextYWithWidth > height;
    if (outOfYBounds) {
      this.speed.y *= -1;
    }

    if (!outOfXBounds && !outOfYBounds) {
      for (const object of objects) {
        if (object === this) {
          continue;
        }

        const nextX = this.position.x + this.speed.x;
        const nextXWithWidth = nextX + this.width;
        const nextY = this.position.y + this.speed.y;
        const nextYWithWidth = nextY + this.height;

        const collisionX =
          nextX < object.position.x + object.width &&
          nextXWithWidth > object.position.x;
        const collisionY =
          nextY < object.position.y + object.height &&
          nextYWithWidth > object.position.y;

        if (collisionX && collisionY) {
          this.speed.x *= -1;
          this.speed.y *= -1;
        }
      }
    }
    this.position.y += this.speed.y;
  }
}
