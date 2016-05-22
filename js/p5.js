var canvas;
var tiles = [];
var img = [];
var lixo = [];
var bonequinho;


function setup() {
  canvas = createCanvas(1680, 925);
  canvas.position(0, 0);
  for (x = 0; x < 24; x++) {
    img[x] = [];
    for (y = 0; y < 24; y++) {
      img[x][y] = createImg("../refactored-spork/img/test" + floor((noise(x, y) * 3) + 1) + ".png");
      img[x][y].position(treesholdX(x, y), treesholdY(x, y));
    }
  }
  for (x = 0; x < 24; x++) {
    lixo[x] = [];
    for (y = 0; y < 24; y++) {
      lixo[x][y] = floor(random(10));
    }
  }
  bonequinho = new p5.Vector(12, 12);
  blendMode(REPLACE);
  canvas.remove();
  canvas.parent(document.body);
  noStroke();
}

function draw() {
  clear();
  background(0, 0);
  drawLixo();
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

function drawLixo() {
  for (x = 0; x < 24; x++) {
    for (y = 0; y < 24; y++) {
      switch (lixo[x][y]) {
        case 1:
          fill(255, 25, 25);
          ellipse(treesholdX(x, y) + 32, treesholdY(x, y) + 8, 10, 10);
          break;
        case 2:
          fill(25, 255, 25);
          ellipse(treesholdX(x, y) + 32, treesholdY(x, y) + 8, 10, 10);
          break;
        case 3:
          fill(25, 25, 255);
          ellipse(treesholdX(x, y) + 32, treesholdY(x, y) + 8, 10, 10);
          break;
        case 4:
          fill(255, 255, 25);
          ellipse(treesholdX(x, y) + 32, treesholdY(x, y) + 8, 10, 10);
          break;
        case 5:
          fill(25, 25, 25);
          ellipse(treesholdX(x, y) + 32, treesholdY(x, y) + 8, 10, 10);
          break;
        default:
          lixo[x][y] = 0;
          break;
      }
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      bonequinho.y++;
      break;
    case DOWN_ARROW:
      bonequinho.y--;
      break;
    case LEFT_ARROW:
      bonequinho.x--;
      break;
    case RIGHT_ARROW:
      bonequinho.x++;
      break;
  }
}

function treesholdX(x, y) {
  return windowWidth / 2 - 32 * x + 32 * y;
}

function treesholdY(x, y) {
  return 64 + 16 * x + 16 * y;
}