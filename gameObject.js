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

    if (!((Controls.keys['Up']) && (Controls.keys['Down']))) {
      if (Controls.keys['Up']) {
        this.y -= 4;
      }
      if (Controls.keys['Down']) {
        this.y += 1;
      }
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

  // stopAtBottom() {
  //   this.bottomPoint = Engine.ground.y - this.height;
  //   if (this.y > this.bottomPoint) {
  //     this.y = this.bottomPoint;
  //     this.gravitySpeed = 0;
  //     this.speedY = 0;
  //   }
  // }

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
        } else {
          this.y = obj.y + obj.heighy;
        }
        this.speedY = 0;
      }
    }



  playerNewPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY += this.gravitySpeed; 
    this.checkCollisions();
  }
}