var canvas;
var tiles = [];
var img = [];
var lixo = [];

function setup() {
  canvas = createCanvas(1680, 925);
  canvas.position(0, 0);
  for (x = 0; x < 24; x++) {
    img[x] = [];
    for (y = 0; y < 24; y++) {
      img[x][y] = createImg("../refactored-spork/img/test" + floor((noise(x, y) * 3) + 1) + ".png");
      img[x][y].position(windowWidth / 2 - 32 * x + 32 * y, 64 + 16 * x + 16 * y);
    }
  }
  for (x = 0; x < 24; x++) {
    lixo[x] = [];
    for (y = 0; y < 24; y++) {
      lixo[x][y] = floor((random(10)));
    }
  }
  blendMode(REPLACE);
  canvas.remove();
  canvas.parent(document.body);
  noStroke();
}

function draw() {
  background(0, 0);
  drawLixo();
}

function drawLixo() {
  for (x = 0; x < 24; x++) {
    for (y = 0; y < 24; y++) {
      switch (lixo[x][y]) {
        case 1:
          fill(255, 25, 25);
          ellipse(windowWidth / 2 - 32 * x + 32 * y + 32, 64 + 16 * x + 16 * y + 8, 10, 10);
          break;
        case 2:
          fill(25, 255, 25);
          ellipse(windowWidth / 2 - 32 * x + 32 * y + 32, 64 + 16 * x + 16 * y + 8, 10, 10);
          break;
        case 3:
          fill(25, 25, 255);
          ellipse(windowWidth / 2 - 32 * x + 32 * y + 32, 64 + 16 * x + 16 * y + 8, 10, 10);
          break;
        case 4:
          fill(255, 255, 25);
          ellipse(windowWidth / 2 - 32 * x + 32 * y + 32, 64 + 16 * x + 16 * y + 8, 10, 10);
          break;
        case 5:
          fill(25, 25, 25);
          ellipse(windowWidth / 2 - 32 * x + 32 * y + 32, 64 + 16 * x + 16 * y + 8, 10, 10);
          break;
        default:
          lixo[x][y] = 0;
          break;
      }
    }
  }
}