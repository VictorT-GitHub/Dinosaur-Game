// GAME SIZE
const GAME = document.querySelector(".game");

resizeGame();
window.addEventListener("resize", resizeGame);

function resizeGame() {
  if (window.innerWidth / window.innerHeight < 3.3) {
    GAME.style.width = `${window.innerWidth}px`;
    GAME.style.height = `${window.innerWidth * 0.3}px`;
  } else {
    GAME.style.width = `${window.innerHeight * 3.3}px`;
    GAME.style.height = `${window.innerHeight}px`;
  }
}
