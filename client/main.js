// @ts-check

class Point {
  /** @type {number} */
  x;
  /** @type {number} */
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Vector2 {
  /** @type {number} */
  x;
  /** @type {number} */
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * @typedef Drawable
 * @prop {(ctx: CanvasRenderingContext2D) => void} draw
 * @prop {() => void} start
 * @prop {Point} position
 * @prop {Vector2} speed
 */

/** @implements {Drawable} */
class Ball {
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

/** @implements {Drawable} */
class Player {
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
      console.log(this.speed);
      switch (event.key) {
        case "ArrowDown":
          this.speed.x = 1;
          break;
        case "ArrowUp":
          this.speed.y = -1;
          break;
        case "ArrowLeft":
          this.speed.x = -1;
          break;
        case "ArrowRight":
          this.speed.y = 1;
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

class Game {
  /** @type {CanvasRenderingContext2D} */
  #canvasCtx;

  #intervalTime = 100;
  #intervalId;

  /** @type {Drawable[]} */
  #objects = [];

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
   * @param {number} intervalTime
   */
  constructor(canvasCtx, width, height, intervalTime) {
    this.#canvasCtx = canvasCtx;
    this.#width = width;
    this.#height = height;
    this.#intervalTime = intervalTime;
  }

  /** @param {Drawable} object */
  addObject(object) {
    this.#objects.push(object);
  }

  start() {
    this.#objects.forEach((o) => o.start());
    this.render();
    this.#intervalId = setInterval(() => {
      this.#objects.forEach((object) => {
        object.position.x += object.speed.x;
        object.position.y += object.speed.y;
      });
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

const canvasTickTime = 100;

const canvasWidth = 800;
const canvasHeight = 600;

const ballWidth = 50;
const ballHeight = 50;
const ball = new Ball(
  ballWidth,
  ballHeight,
  canvasWidth / 2 - ballWidth / 2,
  canvasHeight / 2 - ballHeight / 2
);

const playerWidth = 50;
const playerHeight = 50;
const player = new Player(
  playerWidth,
  playerHeight,
  canvasWidth / 2 - playerWidth / 2,
  canvasHeight - playerHeight
);
const game = new Game(ctx, canvasWidth, canvasHeight, canvasTickTime);
game.addObject(ball);
game.addObject(player);
game.start();
