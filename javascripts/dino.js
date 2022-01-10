const dinoElem = document.querySelector(".dino");

const JUMP_SPEED = 0.55;
const GRAVITY = 0.0015;
const FRAME_TIME = 170;

let isJumping;
let currentFrameTime;
let velocity;
let y;

export function setupDino() {
  isJumping = false;
  currentFrameTime = 0;
  y = 0;

  dinoElem.style.bottom = "0";

  document.addEventListener("keydown", dinoJump);
}

export function updateDino(timeBetweenFrames, gameSpeed) {
  handleImg(timeBetweenFrames, gameSpeed);
  handleJump(timeBetweenFrames);
}

export function getDinoZone() {
  return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
  dinoElem.src = "./images/dino-lose.png";
}

function handleImg(timeBetweenFrames, gameSpeed) {
  if (isJumping == true) {
    dinoElem.src = "./images/dino-stationary.png";
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    if (dinoElem.src.slice(-5) == "0.png") {
      dinoElem.src = "./images/dino-run-1.png";
    } else {
      dinoElem.src = "./images/dino-run-0.png";
    }
    currentFrameTime -= FRAME_TIME;
  }

  currentFrameTime += timeBetweenFrames * gameSpeed;
}

function handleJump(timeBetweenFrames) {
  if (isJumping == false) {
    return;
  }

  y += velocity * timeBetweenFrames;

  if (y <= 0) {
    y = 0;
    isJumping = false;
  }

  dinoElem.style.bottom = `${y}%`;

  velocity -= GRAVITY * timeBetweenFrames;
}

function dinoJump(e) {
  if (isJumping == true || e.code !== "Space") return;

  velocity = JUMP_SPEED;
  isJumping = true;
}
