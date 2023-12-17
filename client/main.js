// @ts-check

/**
 * @typedef Drawable
 * @prop {(ctx: CanvasRenderingContext2D) => void} draw
 */

/** @implements {Drawable} */
class Ball {
  /** @type {number} */
  #x;
  /** @type {number} */
  #y;
  /** @type {number} */
  #sx = 10;
  /** @type {number} */
  #sy = 10;

  #width = 100;
  #height = 100;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.#x += this.#sx;
    this.#y += this.#sy;
    ctx.fillStyle = "white";
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
  }
}

class Game {
  /** @type {CanvasRenderingContext2D} */
  #canvasCtx;

  #intervalTime = 100;
  #intervalId;

  /** @type {Drawable[]} */
  #objects;

  /** @type {number} */
  #width;
  /** @type {number} */
  #height;

  #background = "black";

  /**
   *
   * @param {CanvasRenderingContext2D} canvasCtx
   * @param {number} width
   * @param {number} height
   * @param {Drawable[]} objects
   */
  constructor(canvasCtx, width, height, intervalTime, objects = []) {
    this.#canvasCtx = canvasCtx;
    this.#width = width;
    this.#height = height;
    this.#intervalTime = intervalTime;
    this.#objects = objects;
  }

  start() {
    this.#intervalId = setInterval(() => {
      this.render();
    }, this.#intervalTime);
  }

  stop() {
    clearInterval(this.#intervalId);
  }

  render() {
    this.#canvasCtx.fillStyle = this.#background;
    this.#canvasCtx.fillRect(0, 0, this.#width, this.#height);
    this.#objects.forEach((object) => object.draw(this.#canvasCtx));
  }
}

const $ = (selector) => document.querySelector(selector);

const $canvas = $("#game");
const ctx = $canvas.getContext("2d");

const ball = new Ball(400, 300);

const game = new Game(ctx, 800, 600, [ball]);
game.start();
