export class Enemy {
  constructor(gameWidth, gameHeight, debugEnabled = false) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 160;
    this.height = 119;
    this.image = document.getElementById("enemyImage");
    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;
    this.maxFrame = 5;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.vx = 8;
    this.markedForDeletion = false;
    this.debugEnabled = debugEnabled;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.debugEnabled) {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2 - 20, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  }

  update(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    this.x -= this.vx;
    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
    }
  }
}
