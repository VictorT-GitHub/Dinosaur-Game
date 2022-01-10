import { resizeGame } from "./gameSize.js";
import { resetScore, updateScore } from "./score.js";
import { setupGrounds, updateGround } from "./ground.js";
import { setupDino, updateDino, getDinoZone, setDinoLose } from "./dino.js";
import { setupCactus, updateCactus, getCactusZones } from "./cactus.js";

// ------------ INITIALISATION ------------
let lastFrameTime;
let gameSpeed;

// GAME SIZE
resizeGame();
window.addEventListener("resize", resizeGame);

// GAME START
document.addEventListener("keydown", handleStart, { once: true });

// ------------ APP (functions) ------------
// --- HANDLE START GAME ---
function handleStart() {
  document.querySelector(".start-screen").classList.add("hide");

  lastFrameTime = null;
  gameSpeed = 2;

  resetScore();
  setupGrounds();
  setupDino();
  setupCactus();

  window.requestAnimationFrame(gameUpdate);
}

// --- GAME UPDATE LOOP ---
function gameUpdate(frameTime) {
  // INIT
  if (lastFrameTime == null) {
    lastFrameTime = frameTime;
    window.requestAnimationFrame(gameUpdate);
    return;
  }

  const timeBetweenFrames = frameTime - lastFrameTime;

  gameSpeed += timeBetweenFrames * 0.00001;

  updateGround(timeBetweenFrames, gameSpeed);
  updateScore(timeBetweenFrames);
  updateDino(timeBetweenFrames, gameSpeed);
  updateCactus(timeBetweenFrames, gameSpeed);

  if (checkGameOver()) return handleGameOver(); // stop la boucle

  lastFrameTime = frameTime;
  window.requestAnimationFrame(gameUpdate);
}

// --- CHECKING IF GAME OVER ---
function checkGameOver() {
  const dinoZone = getDinoZone();

  return getCactusZones().some((cactusZone) => isconflit(dinoZone, cactusZone));
}

// --- HANDLE GAME OVER ---
function handleGameOver() {
  setDinoLose();
  // timeout pour pas que ça relance direct si user spam spacebar quand gameover
  setTimeout(() => {
    document.querySelector(".start-screen").classList.remove("hide");
    document.addEventListener("keydown", handleStart, { once: true });
  }, 200);
}

function isconflit(dinoZone, cactusZone) {
  return (
    dinoZone.right > cactusZone.left &&
    dinoZone.left < cactusZone.right &&
    dinoZone.bottom > cactusZone.top
  );
}
