export class Player {
  constructor(gameWidth, gameHeight, debugEnabled = false) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 100;
    this.y = this.gameHeight - this.height;
    this.image = document.getElementById("playerImage");
    this.frameX = 0;
    this.maxFrame = 8;
    this.frameY = 0;
    this.fps = 30;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.vx = 0;
    this.vy = 0;
    this.weight = 1;
    this.dead = false;
    this.debugEnabled = debugEnabled;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
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
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 20, this.width / 3, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  }

  update(input, deltaTime, enemies) {
    //collision detecton
    enemies.forEach((enemy) => {
      const dx = enemy.x + enemy.width / 2 - 20 - (this.x + this.width / 2);
      const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2 + 20);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.width / 3 + this.width / 3) {
        this.dead = true;
      }
    });

    //sprite animation
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime;

    //controls
    if (input.keys.indexOf("ArrowRight") > -1) this.vx = 5;
    else if (input.keys.indexOf("ArrowLeft") > -1) this.vx = -5;
    else if ((input.keys.indexOf("ArrowUp") > -1 || input.keys.indexOf("swipe up") > -1) && this.onGround())
      this.vy -= 32;
    else this.vx = 0;

    //horizontal movement
    this.x += this.vx;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

    //vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
      this.maxFrame = 5;
      this.frameY = 1;
    } else {
      this.vy = 0;
      this.maxFrame = 8;
      this.frameY = 0;
    }

    if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
  }

  reset() {
    this.x = 100;
    this.y = this.gameHeight - this.height;
    this.maxFrame = 8;
    this.frameX = 0;
    this.frameY = 0;
    this.vx = 0;
    this.vy = 0;
    this.dead = false;
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
