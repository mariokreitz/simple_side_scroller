import { Background } from "./classes/background.class.js";
import { Enemy } from "./classes/enemy.class.js";
import { InputHandler } from "./classes/inputHandler.class.js";
import { Player } from "./classes/player.class.js";

window.addEventListener("load", function () {
  let debugEnabled = true;

  const debugButton = document.getElementById("debugButton");
  const fullScreenButton = document.getElementById("fullScreenButton");
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1400;
  canvas.height = 720;

  let enemies = [];
  let score = 0;
  let gameOver = false;

  let enemyTimer = 0;
  let enemyInterval = 1000;
  let randomEnemyInterval = Math.random() * 1000 + 500;
  let lastTime = 0;

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height, debugEnabled);
  const background = new Background(canvas.width, canvas.height);

  input.resetGame = () => {
    if (gameOver) {
      background.reset();
      player.reset();
      enemies = [];
      score = 0;
      gameOver = false;
      enemyTimer = 0;
      randomEnemyInterval = Math.random() * 1000 + 500;
      lastTime = 0;
      animate(0);
    }
  };

  function toggleFullScreen() {
    if (!fullScreenButton) return;
    if (!document.fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  fullScreenButton.addEventListener("click", toggleFullScreen);

  function toggleDebug() {
    debugEnabled = !debugEnabled;
    player.debugEnabled = debugEnabled;
    enemies.forEach((enemy) => (enemy.debugEnabled = debugEnabled));
  }

  debugButton.addEventListener("click", toggleDebug);

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height, debugEnabled));
      enemyTimer = 0;
    } else enemyTimer += deltaTime < 1000 ? deltaTime : 0;
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
      score += enemy.markedForDeletion ? 1 : 0;
    });
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  function displayStatusText(ctx, deltaTime) {
    const scoreText = `Score: ${score}`;
    const gameOverText = "Game Over";
    const finalScoreText = `Final Score: ${score}`;
    const newGameText = "Press Enter or tap for New Game";
    if (debugEnabled) {
      ctx.font = "20px Impact";
      ctx.fillStyle = "red";
      ctx.fillText("DEBUG", canvas.width - 150, 30);
      ctx.fillStyle = "yellow";
      const fpsText = `FPS: ${(1000 / deltaTime).toFixed(1)}`;
      ctx.fillText(fpsText, canvas.width - 90, 30);
    }
    ctx.save();
    ctx.font = "40px Impact";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(scoreText, canvas.width / 2, 50);
    ctx.fillStyle = "white";
    ctx.fillText(scoreText, canvas.width / 2 + 2, 52);

    if (gameOver) {
      ctx.fillStyle = "black";
      ctx.font = "60px Impact";
      ctx.fillText(gameOverText, canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = "white";
      ctx.fillText(gameOverText, canvas.width / 2 + 2, canvas.height / 2 + 2);
      ctx.font = "40px Impact";
      ctx.fillStyle = "black";
      ctx.fillText(finalScoreText, canvas.width / 2, canvas.height / 2 + 50);
      ctx.fillStyle = "white";
      ctx.fillText(finalScoreText, canvas.width / 2 + 2, canvas.height / 2 + 52);
      ctx.fillStyle = "black";
      ctx.fillText(newGameText, canvas.width / 2, canvas.height / 2 + 150);
      ctx.fillStyle = "white";
      ctx.fillText(newGameText, canvas.width / 2 + 2, canvas.height / 2 + 152);
    }
    ctx.restore();
  }

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input, deltaTime, enemies);
    gameOver = player.dead;
    handleEnemies(deltaTime);
    displayStatusText(ctx, deltaTime);

    if (!gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});
