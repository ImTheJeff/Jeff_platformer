class Engine {
  static canvas = document.querySelector("canvas");
  static ctx = this.canvas.getContext("2d");
  static gameObjects = [];
  static players = [];
  static init() { //starts the window and game 
    this.canvas.width = 854;
    this.canvas.height = 480;
    this.canvas.style = 'position: absolute; top: 10%; left: 12%; border: solid blue;';

    Engine.background = new GameObject(854, 485, '../Assets/World/world_background.png', 0, 0, 'image'); 
    Engine.ground = new GameObject(854, 120, 'brown', 0, 360);
    new GameObject(150, 16, 'blue', 50, 250); //creates a platform 
    Engine.player = new Player(30, 30, 'red', 10, 120);
    Engine.enemy = new Enemy(30, 30, 'blue', 400, 120)

    Engine.gameloop(); //starts the gameloop
  }

  static clear() {
    Engine.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears the canvas
  }

  static fps = 30; 
  static interval = 1000 / Engine.fps; //frameate

  static gameloop() {
    let start = Date.now();
    Engine.clear();
    Engine.superUpdate();
    let end = Date.now();
    let d_time = end - start;
    setTimeout(Engine.gameloop, this.interval - d_time); //fixed framerate for different computers
  }

  static superUpdate() { //updates every game object

    if (Engine.player) { // if the player exists
      Engine.player.move(); 
      Engine.player.playerNewPos(); 
      Engine.player.playerRender();
    } 

    if (Engine.enemy) { // if the enemy exists
    Engine.enemy.move();
    Engine.enemy.enemyNewPos();
    Engine.enemy.enemyRender();
    }
    
    Engine.gameObjects.forEach(gameObject => { //loops and updates every object 
      gameObject.newPos();
      gameObject.render();  
    })                                                       
  }
}


