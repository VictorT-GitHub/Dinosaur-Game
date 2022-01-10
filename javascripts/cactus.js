const GAME = document.querySelector(".game");

const CACTUS_SPEED = 0.012;
const CACTUS_MIN_TIMEOUT = 1000;
const CACTUS_MAX_TIMEOUT = 3500;

let nextCactusTime;

export function setupCactus() {
  nextCactusTime = CACTUS_MIN_TIMEOUT;

  document.querySelectorAll(".cactus").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(timeBetweenFrames, gameSpeed) {
  // DEPLACEMENT CACTUS
  document.querySelectorAll(".cactus").forEach((cactus) => {
    // get current position
    let cactusX = parseFloat(
      getComputedStyle(cactus).getPropertyValue("--left")
    );
    // calcul new position
    cactusX -= timeBetweenFrames * gameSpeed * CACTUS_SPEED;
    // remove if not anymore on the screen
    if (cactusX < -5) cactus.remove();
    // move cactus to new position
    cactus.style.setProperty("--left", cactusX);
  });

  // CREATION CACTUS
  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_MIN_TIMEOUT, CACTUS_MAX_TIMEOUT) / gameSpeed;
  }
  nextCactusTime -= timeBetweenFrames;
}

export function getCactusZones() {
  return [...document.querySelectorAll(".cactus")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.src = "../images/cactus.png";
  cactus.classList.add("cactus");
  GAME.appendChild(cactus);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
