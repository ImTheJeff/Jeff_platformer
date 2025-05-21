class Player extends GameObject{
constructor(width, height, color, x, y, type) {
    super(width, height, color, x, y, type)
    this.gravity = 0.001;
    this.gravitySpeed = 0;
    this.canJump = true;  
    this.playerDie = false;  

    Engine.players.push(this);
}

move() {
    if (!((Controls.keys['Left']) && (Controls.keys['Right']))) { 
    if (Controls.keys['Left']) { 
        this.x -= 2;
    }
    if (Controls.keys['Right']) {
        this.x += 2;
    }
    }
    if (Controls.keys['Up'] && this.canJump) {
    this.speedY = -2;
    }
    
}

playerRender() {
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

    checkCollisions() { 
    Engine.gameObjects.forEach(obj => {
        if (obj !== this && this.isColliding(obj)) { 
            this.resolveCollision(obj); 
        }
    });
    }

    isColliding(obj) {  
    return (
        this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + this.height && 
        this.y + this.height > obj.y 
    );
    }

    resolveCollision(obj) { 
    let collisionX = Math.min( 
        this.x + this.width - obj.x, 
        obj.x + obj.width - this.x
    );

    let collisionY = Math.min(
        this.y + this.height - obj.y,
        obj.y + obj.height - this.y
    );

    if (collisionX < collisionY) { 
        if (obj == Engine.enemy) { 
        this.playerDie = true; 
        }
        if (this.x < obj.x) { 
        this.x = obj.x - this.width;  
        } else {
        this.x = obj.x + obj.width;
        }
        this.speedX = 0;
    } else { 
        if (this.y < obj.y) {
        this.y = obj.y - this.height;
        this.gravitySpeed = 0;
        if (this.speedY > 0) { 
        this.canJump = true; 
        }
        this.speedY = 0;
        } else {
        this.y = obj.y + obj.height;
        this.gravitySpeed *= 1;
        }
    }
    }

playerNewPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY += this.gravitySpeed; 
    if (this.speedY != 0) {  
    this.canJump = false;  
    }

    if (this.x < 0) { 
    this.x = 0;
    this.speedX = 0;
    }

    if (this.x + this.width > 854) {  
    this.x = 854 - this.width;
    this.speedX = 0;
    }

    if (this.playerDie) {
    Engine.gameObjects.splice(Engine.gameObjects.find(Engine.player));  
    }
    this.checkCollisions();
}
}