 class GameObject { 
  constructor(width, height, color, x, y, type) {
    this.type = type;  
    if (type == 'image') {  
      this.image = new Image();
      this.image.src = color; 
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
    this.x += this.speedX;
    this.y += this.speedY; 
  }
}

