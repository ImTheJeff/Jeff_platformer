class Enemy extends Player {
    constructor(width, height, color, x, y, type) {
        super(width, height, color, x, y, type)
        this.gravity = 0.001;
        this.gravitySpeed = 0;
    }

    move() {
        this.x -= 0.5;
    }

    enemyRender() {
        let ctx = Engine.ctx;
        if (this.type == 'image') {
          ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    enemyNewPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY += this.gravitySpeed; 
        if (this.speedY != 0) {
          this.canJump = false;
        }
        if ((this.x < 0) || (this.x + this.width > 854)) {
            this.x = 0;
            this.speedX = 0;
          }
        if (Engine.player && this.isColliding(Engine.player)) {
            Engine.player = null;
            Engine.gameObjects.splice(Engine.gameObjects.find(Engine.player));
        }
        this.checkCollisions();
    }
}