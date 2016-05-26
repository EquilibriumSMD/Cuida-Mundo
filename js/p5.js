var canvas;
var tiles = [];
var bonequinho;
var tSize;
var handler;
var buttonUp
var buttonDown
var buttonLeft
var buttonRight
var buttonAction
var lixo1, lixo2, lixo3, lixo4;

function setup() {
  canvas = createCanvas(1680, 925);
  canvas.position(0, 0);
  tSize = floor(windowWidth / 26);
  for (x = 0; x < 24; x++) {
    tiles[x] = [];
    for (y = 0; y < 24; y++) {
      tiles[x][y] = [];
      tiles[x][y][0] = new Tile("test", floor((noise(x, y, 0) * 3) + 1));
      tiles[x][y][0].img.size(tSize, tSize);
      tiles[x][y][0].img.position(treesholdX(x, y), treesholdY(x, y, 0));
      if (floor(random(10)) < 5) {
        tiles[x][y][1] = new Tile("lixo", floor(random(5) + 1));
        tiles[x][y][1].img.size(tSize, tSize);
        tiles[x][y][1].img.position(treesholdX(x, y), treesholdY(x, y, 1));
      }
    }
  }
  bonequinho = new Boneco();
  noStroke();
  canvas.parent(document.body);
}

window.onload = function() {
  buttonUp = document.getElementById("bt-Top");
  buttonDown = document.getElementById("bt-Bottom");
  buttonLeft = document.getElementById("bt-Left");
  buttonRight = document.getElementById("bt-Right");
  buttonAction = document.getElementById("bt-Coletar");
  lixo1 = document.getElementById("bt-lixo1").getElementsByTagName("strong")[0];
  lixo2 = document.getElementById("bt-lixo2").getElementsByTagName("strong")[0];
  lixo3 = document.getElementById("bt-lixo3").getElementsByTagName("strong")[0];
  lixo4 = document.getElementById("bt-lixo4").getElementsByTagName("strong")[0];
  handler = new ButtonHandler();
  buttonUp.onclick = handler.up;
  buttonDown.onclick = handler.down;
  buttonLeft.onclick = handler.left;
  buttonRight.onclick = handler.right;
  buttonAction.onclick = handler.action;
  bonequinho.score();
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tSize = windowWidth / 26;
  for (x = 0; x < 24; x++) {
    for (y = 0; y < 24; y++) {
      for (z = 0; z < 2; z++) {
        if (!(tiles[x][y][z] === undefined)) {
          tiles[x][y][z].img.position(treesholdX(x, y), treesholdY(x, y, z));
          tiles[x][y][z].img.size(tSize, tSize);
        }
      }
    }
  }
}

function treesholdX(y, x) {
  return floor(windowWidth / 2 - tSize / 2 * x + tSize / 2 * y);
}

function treesholdY(y, x, z) {
  return floor(tSize + tSize / 4 * x + tSize / 4 * y - z * tSize / 2.4);
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
  this.tile = new Tile("player", 0);
  this.tile.img.hide();

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
    this.score();
  }
  this.score = function() {
    lixo1.innerHTML = this.plast;
    lixo3.innerHTML = this.vidro;
    lixo4.innerHTML = this.papel;
    lixo2.innerHTML = this.metal;
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

  this.remove = function() {
    this.tId = 0;
    this.img.remove();
  }
}