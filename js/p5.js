var canvas;
var tiles = [];
var lixo = [];
var bonequinho;
var display;


function setup() {
  canvas = createCanvas(1680, 861);
  canvas.position(0, 0);
  for (x = 0; x < 24; x++) {
    tiles[x] = [];
    for (y = 0; y < 24; y++) {
	  tiles[x][y] = [];
      tiles[x][y][0] = new Tile("test", floor((noise(x, y) * 3) + 1) );
      tiles[x][y][0].img.position(treesholdX(x, y), treesholdY(x, y, 0));
      if (floor(random(10)) < 5) {
        tiles[x][y][1] = new Tile("lixo", floor(random(5) + 1));
        tiles[x][y][1].img.position(treesholdX(x, y), treesholdY(x, y, 1));
      }
    }
  }
  bonequinho = new Boneco();
  display = createDiv("");
  bonequinho.score();
  noStroke();
  canvas.parent(document.body);
  var handler = new ButtonHandler();
  var button = createButton("UP");
  button.size(64, 64);
  button.position(0, 861);
  button.mousePressed(handler.up);
  button = createButton("DOWN");
  button.size(64, 64);
  button.mousePressed(handler.down);
  button.position(128, 861);
  button.parent(document.body);
  button = createButton("LEFT");
  button.size(64, 64);
  button.mousePressed(handler.left);
  button.position(1488, 861);
  button.parent(document.body);
  button = createButton("RIGHT");
  button.size(64, 64);
  button.mousePressed(handler.right);
  button.position(1616, 861);
  button.parent(document.body);
  button = createButton("ACTION");
  button.size(64, 64);
  button.mousePressed(handler.action);
  button.position(832, 861);
  button.parent(document.body);
  display.parent(document.body);
}

function draw() {
  clear();
  background(0, 0);
  drawbonequinho();
}

function drawbonequinho() {
  fill(0, 127, 255);
  triangle(treesholdX(bonequinho.x, bonequinho.y) + 17, treesholdY(bonequinho.x, bonequinho.y, bonequinho.z) - 17,
    treesholdX(bonequinho.x, bonequinho.y) + 47, treesholdY(bonequinho.x, bonequinho.y, bonequinho.z) - 17,
    treesholdX(bonequinho.x, bonequinho.y) + 32, treesholdY(bonequinho.x, bonequinho.y, bonequinho.z) + 8);
  fill(255, 127, 0);
  ellipse(treesholdX(bonequinho.x, bonequinho.y) + 32, treesholdY(bonequinho.x, bonequinho.y, bonequinho.z) - 30, 20, 20);
}

function keyPressed() {
  switch (keyCode) {
    case DOWN_ARROW:
      bonequinho.down();
      break;
    case UP_ARROW:
      bonequinho.up();
      break;
    case LEFT_ARROW:
      bonequinho.left();
      break;
    case RIGHT_ARROW:
      bonequinho.right();
      break;
  }
  if (key == " ") {
    bonequinho.action();
  }
}

function treesholdX(y, x) {
  return 840 - 32 * x + 32 * y;
}

function treesholdY(y, x, z) {
  return 64 + 16 * x + 16 * y - z * 27;
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
  this.tile = new Tile("player", 0 );

  this.up = function() {
    if (this.y > 0)
      this.y--;
  }
  this.down = function() {
    if (this.y < 23)
      this.y++;
  }
  this.left = function() {
    if (this.x > 0)
      this.x--;
  }
  this.right = function() {
    if (this.x < 23)
      this.x++;
  }
  this.action = function() {
    switch (tiles[this.x][this.y][this.z].tId) {
      case 1:
        this.plast++;
        tiles[this.x][this.y][this.z].remove();
        break;
      case 2:
        this.vidro++;
        tiles[this.x][this.y][this.z].remove();
        break;
      case 3:
        this.papel++;
        tiles[this.x][this.y][this.z].remove();
        break;
      case 4:
        this.metal++;
        tiles[this.x][this.y][this.z].remove();
        break;
      case 5:
        this.lixoC++;
        tiles[this.x][this.y][this.z].remove();
        break;
      default:
        tiles[this.x][this.y][this.z].remove();
        break;
    }
    this.score();
  }
  this.score = function() {
    display.html(
      "Lixo Comum: " + this.lixoC + "<br>" +
      "Plástico: " + this.plast + "<br>" +
      "Vidro: " + this.vidro + "<br>" +
      "Papel: " + this.papel + "<br>" +
      "Metal: " + this.metal);
  }
}

function ButtonHandler() {

  this.up = function() {
    bonequinho.up();
  }
  this.down = function() {
    bonequinho.down();
  }
  this.left = function() {
    bonequinho.left();
  }
  this.right = function() {
    bonequinho.right();
  }
  this.action = function() {
    bonequinho.action();
  }
}

function Tile(type, id) {
    this.tType = type;
    this.tId = id;
    this.img = createImg("img/" + this.tType + this.tId + ".png");
    
    this. remove = function(){
        this.tId = 0;
        this.img.remove();
    }
}