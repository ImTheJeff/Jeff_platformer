class Player extends GameObject{
constructor(width, height, color, x, y, type) {
    super(width, height, color, x, y, type)
    this.gravity = 0.001;
    this.gravitySpeed = 0;
    this.canJump = true; //variable to disable double/triple jumping 
    this.playerDie = false; //variable to enable the player to die under certain conditions 

    Engine.players.push(this);
}

move() {
    if (!((Controls.keys['Left']) && (Controls.keys['Right']))) { //if both keys aren't pressed at the same time
    if (Controls.keys['Left']) { 
        this.x -= 1;
    }
    if (Controls.keys['Right']) {
        this.x += 1;
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

    checkCollisions() { //checks if the player is colliding with an object
    Engine.gameObjects.forEach(obj => {
        if (obj !== this && this.isColliding(obj)) { //!== this means checks all gameobjects except itself 
            this.resolveCollision(obj); 
        }
    });
    }

    isColliding(obj) { //every time it is executed it returns the distance between objects to detect if they are colliding 
    return (
        this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + this.height && 
        this.y + this.height > obj.y 
    );
    }

    resolveCollision(obj) {
    //find the collision 
    let collisionX = Math.min( //Math.min returns the smallest value 
        this.x + this.width - obj.x, 
        obj.x + obj.width - this.x
    );

    let collisionY = Math.min(
        this.y + this.height - obj.y,
        obj.y + obj.height - this.y
    );

    if (collisionX < collisionY) { //find the collision direction 
        this.playerDie = true;
        if (this.x < obj.x) { 
        this.x = obj.x - this.width; //stops the objects 
        } else {
        this.x = obj.x + obj.width;
        }
        this.speedX = 0;
    } else { 
        if (this.y < obj.y) {
        this.y = obj.y - this.height;
        this.gravitySpeed = 0;
        if (this.speedY > 0) { 
        this.canJump = true; //the player can jump if it's not midair 
        }
        this.speedY = 0;
        } else {
        this.y = obj.y + obj.height;
        this.gravitySpeed = 0.8;
        }
    }
    }



playerNewPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY += this.gravitySpeed; 
    if (this.speedY != 0) { //if the player is in midair 
    this.canJump = false; //then the player can't jump anymore 
    }

    if ((this.x < 0) || (this.x + this.width > 854)) { //prevents the player from going outside the window horizontally 
    this.x = 0;
    this.speedX = 0;
    }

    if (Engine.enemy && this.isColliding(Engine.enemy) && (this.playerDie === true)) {
    Engine.gameObjects.splice(Engine.gameObjects.find(Engine.player)); //stops the game if the enemy collides with the player horizontally
    }
    this.checkCollisions();
}
}