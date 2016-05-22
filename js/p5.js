var canvas;
var tiles = [];
var img = [];
var lixo = [];
var iLixo = [];
var bonequinho;
var display;


function setup() {
  canvas = createCanvas(1680, 925);
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
      if (lixo[x][y] != 0 && lixo[x][y] < 6) {
        iLixo[x][y] = createImg("img/lixo" + lixo[x][y] + ".png");
        iLixo[x][y].position(treesholdX(x, y), treesholdY(x, y) - 27);
      }
    }
  }
  bonequinho = new Boneco();
  canvas.remove();
  canvas.parent(document.body);
  display = createDiv("");
  score();
  noStroke();
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
      if (bonequinho.y < 23)
        bonequinho.y++;
      break;
    case UP_ARROW:
      if (bonequinho.y > 0)
        bonequinho.y--;
      break;
    case LEFT_ARROW:
      if (bonequinho.x > 0)
        bonequinho.x--;
      break;
    case RIGHT_ARROW:
      if (bonequinho.x < 23)
        bonequinho.x++;
      break;
  }
  if (key == " ") {
    switch (lixo[bonequinho.x][bonequinho.y]) {
      case 1:
        bonequinho.plast++;
        lixo[bonequinho.x][bonequinho.y] = 0;
        iLixo[bonequinho.x][bonequinho.y].remove();
        break;
      case 2:
        bonequinho.vidro++;
        lixo[bonequinho.x][bonequinho.y] = 0;
        iLixo[bonequinho.x][bonequinho.y].remove();
        break;
      case 3:
        bonequinho.papel++;
        lixo[bonequinho.x][bonequinho.y] = 0;
        iLixo[bonequinho.x][bonequinho.y].remove();
        break;
      case 4:
        bonequinho.metal++;
        lixo[bonequinho.x][bonequinho.y] = 0;
        iLixo[bonequinho.x][bonequinho.y].remove();
        break;
      case 5:
        bonequinho.lixoC++;
        lixo[bonequinho.x][bonequinho.y] = 0;
        iLixo[bonequinho.x][bonequinho.y].remove();
        break;
      default:
        lixo[bonequinho.x][bonequinho.y] = 0;
        iLixo[bonequinho.x][bonequinho.y].remove();
        break;
    }
    score();
  }
}

function treesholdX(y, x) {
  return 840 - 32 * x + 32 * y;
}

function treesholdY(y, x) {
  return 64 + 16 * x + 16 * y;
}

function score() {
  display.html(
    "Plástico: " + bonequinho.plast + "<br>" +
    "Vidro: " + bonequinho.vidro + "<br>" +
    "Papel: " + bonequinho.papel + "<br>" +
    "Metal: " + bonequinho.metal + "<br>" +
    "Lixo Comum: " + bonequinho.lixoC + "<br>");
}

function Boneco() {
  this.x = 12;
  this.y = 12;
  this.plast = 0;
  this.vidro = 0;
  this.papel = 0;
  this.metal = 0;
  this.lixoC = 0;
}