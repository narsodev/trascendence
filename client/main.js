"use strict";
// @ts-check
import Player from "./lib/Player.js";
import Ball from "./lib/Ball.js";
import Game from "./lib/Game.js";

const $ = (selector) => document.querySelector(selector);

const $canvas = $("#game");
const ctx = $canvas.getContext("2d");

const canvasTickTime = 1000 / 60;

const canvasWidth = 800;
const canvasHeight = 600;

const ballWidth = 20;
const ballHeight = 20;
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
  canvasWidth - playerWidth * 2,
  canvasHeight / 2 - playerHeight / 2
);
const player2 = new Player(
  playerWidth,
  playerHeight,
  playerWidth,
  canvasHeight / 2 - playerHeight / 2
);
const game = new Game(ctx, canvasWidth, canvasHeight, canvasTickTime);
game.addObject(ball);
game.addObject(player);
game.addObject(player2);

const $startButton = $("#start");
$startButton.addEventListener("click", () => {
  game.start();
});
