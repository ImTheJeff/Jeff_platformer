<<<<<<< HEAD:Objects/gameObject.js
 class GameObject { 
  constructor(width, height, color, x, y, type) {
    this.type = type; //parameter for triggering different lines of code for images 
    if (type == 'image') {  
      this.image = new Image();
      this.image.src = color; //the image URL corresponds the color parameter
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y;
    this.color = color;
    
    Engine.gameObjects.push(this); 
  }

  render() { //places/draws gameobjects with the appropriate functions 
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

  newPos() { //calculates the new position 
    this.x += this.speedX;
    this.y += this.speedY; 
  }
}

=======
 class GameObject {
  constructor(width, height, color, x, y, type) {
    this.type = type;
    if (type == 'image') {
      this.image = new Image();
      this.image.src = color; //the image URL corresponds the color parameter
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y;
    this.color = color;
    
    Engine.gameObjects.push(this); 
  }

  render() {
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

  newPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY; 
  }
}

class Player extends GameObject{
  constructor(width, height, color, x, y, type) {
    super(width, height, color, x, y, type)
    this.gravity = 0.001;
    this.gravitySpeed = 0;
    this.canJump = true;

    Engine.players.push(this);
  }

  move() {
    if (!((Controls.keys['Left']) && (Controls.keys['Right']))) {
      if (Controls.keys['Left']) {
        this.x -= 1;
      }
      if (Controls.keys['Right']) {
        this.x += 1;
      }
    }

    if (Controls.keys['Up'] && this.canJump) {
      this.speedY = -2.5;
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
      //find the collision 
      let collisionX = Math.min( //Math.min returns the smallest value 
          this.x + this.width - obj.x, 
          obj.x + obj.width - this.x
      );

      let collisionY = Math.min(
        this.y + this.height - obj.y,
        obj.y + obj.height - this.y
      );

      //find the collision direction
      if (collisionX < collisionY) {
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
          this.gravity = 0.001;
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

    if ((this.x < 0) || (this.x + this.width > 854)) {
      this.x = 0;
      this.speedX = 0;
    }
    this.checkCollisions();
  }
}
>>>>>>> parent of 38f6c1a (notes and some fixing):gameObject.js
