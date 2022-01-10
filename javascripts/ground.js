const groundElems = document.querySelectorAll(".ground");

const GROUND_SPEED = 0.012;

let firstGround;
let secondGround;

export function setupGrounds() {
  firstGround = 0;
  secondGround = 300;
}

export function updateGround(timeBetweenFrames, gameSpeed) {
  groundElems[0].style.left = `${firstGround}%`;
  groundElems[1].style.left = `${secondGround}%`;

  if (firstGround <= -300) {
    firstGround += 600;
  }
  if (secondGround <= -300) {
    secondGround += 600;
  }

  firstGround -= timeBetweenFrames * GROUND_SPEED * gameSpeed;
  secondGround -= timeBetweenFrames * GROUND_SPEED * gameSpeed;
}
