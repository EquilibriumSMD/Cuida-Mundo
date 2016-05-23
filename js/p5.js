var canvas;
var tiles = [];
var img = [];
var lixo = [];
var iLixo = [];
var bonequinho;
var display;


function setup() {
  canvas = createCanvas(1680, 861);
  canvas.position(0, 0);
  for (x = 0; x < 24; x++) {
    img[x] = [];
    for (y = 0; y < 24; y++) {
      img[x][y] = createImg("img/test" + floor((noise(x, y) * 3) + 1) + ".png");
      img[x][y].position(treesholdX(x, y), treesholdY(x, y));
    }
  }
  for (x = 0; x < 24; x++) {
    lixo[x] = [];
    for (y = 0; y < 24; y++) {
      lixo[x][y] = floor(random(10));
    }
  }
  for (x = 0; x < 24; x++) {
    iLixo[x] = [];
    for (y = 0; y < 24; y++) {
      if (lixo[x][y] !== 0 && lixo[x][y] < 6) {
        iLixo[x][y] = createImg("img/lixo" + lixo[x][y] + ".png");
        iLixo[x][y].position(treesholdX(x, y), treesholdY(x, y) - 27);
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
  button.parent(document.body);
  button = createButton("DOWN");
  button.size(64, 64);
  button.mousePressed(handler.down);
  button.position(64, 861);
  button.parent(document.body);
  button = createButton("LEFT");
  button.size(64, 64);
  button.mousePressed(handler.left);
  button.position(192, 861);
  button.parent(document.body);
  button = createButton("RIGHT");
  button.size(64, 64);
  button.mousePressed(handler.right);
  button.position(256, 861);
  button.parent(document.body);
  button = createButton("ACTION");
  button.size(64, 64);
  button.mousePressed(handler.action);
  button.position(128, 861);
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
  triangle(treesholdX(bonequinho.x, bonequinho.y) + 17, treesholdY(bonequinho.x, bonequinho.y) - 17,
    treesholdX(bonequinho.x, bonequinho.y) + 47, treesholdY(bonequinho.x, bonequinho.y) - 17,
    treesholdX(bonequinho.x, bonequinho.y) + 32, treesholdY(bonequinho.x, bonequinho.y) + 8);
  fill(255, 127, 0);
  ellipse(treesholdX(bonequinho.x, bonequinho.y) + 32, treesholdY(bonequinho.x, bonequinho.y) - 30, 20, 20);
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

function treesholdY(y, x) {
  return 64 + 16 * x + 16 * y;
}

function Boneco() {
  this.x = 12;
  this.y = 12;
  this.plast = 0;
  this.vidro = 0;
  this.papel = 0;
  this.metal = 0;
  this.lixoC = 0;

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
    switch (lixo[this.x][this.y]) {
      case 1:
        this.plast++;
        lixo[this.x][this.y] = 0;
        iLixo[this.x][this.y].remove();
        break;
      case 2:
        this.vidro++;
        lixo[this.x][this.y] = 0;
        iLixo[this.x][this.y].remove();
        break;
      case 3:
        this.papel++;
        lixo[this.x][this.y] = 0;
        iLixo[this.x][this.y].remove();
        break;
      case 4:
        this.metal++;
        lixo[this.x][this.y] = 0;
        iLixo[this.x][this.y].remove();
        break;
      case 5:
        this.lixoC++;
        lixo[this.x][this.y] = 0;
        iLixo[this.x][this.y].remove();
        break;
      default:
        lixo[this.x][this.y] = 0;
        iLixo[this.x][this.y].remove();
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