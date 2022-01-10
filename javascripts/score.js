const scoreElem = document.querySelector(".score");

let score;

export function resetScore() {
  score = 0;
}

export function updateScore(timeBetweenFrames) {
  score += timeBetweenFrames * 0.01;
  scoreElem.textContent = Math.round(score);
}
