export class Background {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("backgroundImage");
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 720;
    this.speed = 5;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.width) this.x = 0;
  }

  reset() {
    this.x = 0;
  }
}
