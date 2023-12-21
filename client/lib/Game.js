export default class Game {
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
        const nextX = object.position.x + object.speed.x;
        const nextXWithWidth = nextX + object.width;
        if (nextX < 0 || nextXWithWidth > this.#width) {
          object.speed.x *= -1;
        }
        object.position.x += object.speed.x;

        const nextY = object.position.y + object.speed.y;
        const nextYWithWidth = nextY + object.height;
        if (nextY < 0 || nextYWithWidth > this.#height) {
          object.speed.y *= -1;
        }
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

/**
 * @typedef Drawable
 * @prop {(ctx: CanvasRenderingContext2D) => void} draw
 * @prop {() => void} start
 * @prop {Point} position
 * @prop {Vector2} speed
 * @prop {number} width
 * @prop {number} height
 */
