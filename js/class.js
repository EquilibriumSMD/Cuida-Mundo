function treesholdX(y, x) {
  return Math.floor(window.innerWidth / 2 - tSize / 2 * x + tSize / 2 * y);
}

function treesholdY(y, x, z) {
  return Math.floor(tSize + tSize / 4 * x + tSize / 4 * y - z * tSize / 2.4);
}

function Boneco() {
  this.x = 12;
  this.y = 12;
  this.z = 1;
  this.plast = 0;
  this.vidro = 0;
  this.papel = 0;
  this.metal = 0;
  this.lixoC = 0;
  this.total = 0;
  this.tile = new Tile("player", 0);
    
//animacao    
var spritePersonagem = new createjs.SpriteSheet({
    images: [ "img/sprite-down.png", "img/sprite-left.png", "img/sprite-right.png", "img/sprite-up.png" ],
    frames: { width: 59, height: 64 },
    animations: {
				"idleD": 1,
				"down": [0, 2, "idleD", 3],
				"idleL": 4,
				"left": [3, 5, "idleL", 3],
				"idleR": 7,
				"right": [6, 8, "idleR", 3],
				"idleU": 10,
				"up": [9, 11, "idleU", 3]
    }
});

  this.tile.img = new createjs.Sprite(spritePersonagem, "idleD");
  this.tile.img.framerate = 30;
     

  this.up = function() {
    if (this.y > 0 && tiles[this.x][this.y-1][this.z-1].tType == "floor" && tiles[this.x][this.y-1][this.z].tType != "wall")
      this.y--;
      createjs.Tween.get(this.tile.img, { loop: false }).to({ x: treesholdX(this.x, this.y), y: treesholdY(this.x, this.y, this.z+0.7) }, 100, createjs.Ease.getPowInOut(4));
  }
  this.down = function() {
    if (this.y < 23 && tiles[this.x][this.y+1][this.z-1].tType == "floor" && tiles[this.x][this.y+1][this.z].tType != "wall")
      this.y++;
      createjs.Tween.get(this.tile.img, { loop: false }).to({ x: treesholdX(this.x, this.y), y: treesholdY(this.x, this.y, this.z+0.7) }, 100, createjs.Ease.getPowInOut(4));
  }
  this.left = function() {
    if (this.x > 0 && tiles[this.x-1][this.y][this.z-1].tType == "floor" && tiles[this.x-1][this.y][this.z].tType != "wall")
      this.x--;
      createjs.Tween.get(this.tile.img, { loop: false }).to({ x: treesholdX(this.x, this.y), y: treesholdY(this.x, this.y, this.z+0.7) }, 100, createjs.Ease.getPowInOut(4));
  }
  this.right = function() {
    if (this.x < 23 && tiles[this.x+1][this.y][this.z-1].tType == "floor" && tiles[this.x+1][this.y][this.z].tType != "wall")
      this.x++;
      createjs.Tween.get(this.tile.img, { loop: false }).to({ x: treesholdX(this.x, this.y), y: treesholdY(this.x, this.y, this.z+0.7) }, 100, createjs.Ease.getPowInOut(4));
  }
  this.action = function() {
    if (tiles[this.x][this.y][this.z].tType == "lixo") {
      switch (tiles[this.x][this.y][this.z].tId) {
        case 1:
          this.plast++;
          break;
        case 2:
          this.vidro++;
          break;
        case 3:
          this.papel++;
          break;
        case 4:
          this.metal++;
          break;
        case 5:
          this.lixoC++;
          break;
      }
      tiles[this.x][this.y][this.z].remove();
      this.total++;
      this.score();
    }
  }
  this.score = function() {
    lixoC.innerHTML = this.total;
  }
}

function ButtonHandler() {

  this.up = function() {
    bonequinho.up();
    bonequinho.tile.img.gotoAndPlay("up");
  }
  this.down = function() {
    bonequinho.down();
    bonequinho.tile.img.gotoAndPlay("down");
  }
  this.left = function() {
    bonequinho.left();
    bonequinho.tile.img.gotoAndPlay("left");
  }
  this.right = function() {
    bonequinho.right();
    bonequinho.tile.img.gotoAndPlay("right");
  }
  this.action = function() {
    bonequinho.action();
  }
}

function Tile(type, id) {
  this.tType = type;
  this.tId = id;
  this.img =  new createjs.Bitmap("img/" + this.tType + this.tId + ".png");
  if (this.tType == "void") {
    this.tId = 0;
  }

  this.remove = function() {
    this.tId = 0;
	this.tType = "void";
    stage.removeChild(this.img);
  }
}