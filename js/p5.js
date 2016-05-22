var canvas;
var tiles = [];
var img = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  background(0, 0);
  colorMode(HSB);
  for (x = 0; x < 24; x++) {
    img[x] = [];
    for (y = 0; y < 24; y++) {
      img[x][y] = createImg("C:/Users/ã/Documents/refactored-spork/img/test" + floor((noise(x, y) * 3) + 1) + ".png");
      img[x][y].position(windowWidth / 2 - 32 * x + 32 * y, 64 + 16 * x + 16 * y);
    }
  }
  canvas.remove();
  canvas.parent(document.body);
  noStroke();
  noCursor();
}

function draw() {
  fill((sin(radians(frameCount)) + 1) * 127, 255, 255);
  ellipse(mouseX, mouseY, 10, 10);
}