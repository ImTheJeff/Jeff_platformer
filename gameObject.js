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

