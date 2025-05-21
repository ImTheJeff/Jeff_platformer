const game_over = document.getElementById("gameover");  

class Engine {
  static canvas = document.querySelector("canvas");
  static ctx = this.canvas.getContext("2d");
  static gameObjects = [];
  static players = [];
  static init() {  
    this.canvas.width = 854;
    this.canvas.height = 480;
    this.canvas.style = 'position: absolute; top: 10%; left: 12%; border: solid blue;';

    Engine.background = new GameObject(854, 485, 'world_background.png', 0, 0, 'image'); 
    Engine.ground = new GameObject(854, 120, 'brown', 0, 360);
    Engine.platform = new GameObject(150, 16, 'blue', 50, 250);  
    Engine.player = new Player(30, 30, 'red', 10, 120);
    Engine.enemy = new Enemy(30, 30, 'blue', 400, 120)

    Engine.gameloop(); 
  }

  static clear() {
    Engine.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
  }

  static fps = 30; 
  static interval = 1000 / Engine.fps; 

  static gameloop() {
    if (Engine.player.playerDie == false) {
      let start = Date.now();
      Engine.clear();
      Engine.superUpdate();
      let end = Date.now();
      let d_time = end - start;
      setTimeout(Engine.gameloop, this.interval - d_time); 
    } else {
      game_over.style = "display: flex;"  
    }
  }

  static superUpdate() { 

    if (Engine.player) { 
      Engine.player.move(); 
      Engine.player.playerNewPos(); 
      Engine.player.playerRender();
    } 

    if (Engine.enemy) { 
    Engine.enemy.move();
    Engine.enemy.enemyNewPos();
    Engine.enemy.enemyRender();
    }
    
    Engine.gameObjects.forEach(gameObject => { 
      gameObject.newPos();
      gameObject.render();  
    })                                                       
  }
}

Engine.init();


