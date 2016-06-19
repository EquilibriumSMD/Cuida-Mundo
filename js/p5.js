var canvas;
var tiles = [];
var grid = [];
var bonequinho;
var tSize;
var handler;
var buttonUp
var buttonDown
var buttonLeft
var buttonRight
var buttonAction
var lixoC, lixoT;
var total = 0;
var holdOnload;

function preload() {
  tSize = 64;
  bonequinho = new Boneco();
  for (x = 0; x < 24; x++) {
    grid[x] = [];
    for (y = 0; y < 24; y++) {
      grid[x][y] = [];
      for (z = 0; z < 5; z++) {
        grid[x][y][z] = createDiv("");
        grid[x][y][z].position(treesholdX(x, y), treesholdY(x, y, z));
        grid[x][y][z].style("position", "relative");
      }
    }
  }
}

function setup() {
  canvas = createCanvas(1680, 925);
  canvas.position(0, 0);
  canvas.id("area");
  for (x = 0; x < 24; x++) {
    tiles[x] = [];
    for (y = 0; y < 24; y++) {
      tiles[x][y] = [];
      if (floor((noise(x, y, 0) * 4)) === 0) {
        tiles[x][y][0] = new Tile("void", 0);
      } else {
        tiles[x][y][0] = new Tile("test", floor((noise(x, y, 0) * 3) + 1));
      }
      tiles[x][y][0].img.parent(grid[x][y][0]);
      if (floor(random(10)) < 5 && tiles[x][y][0].tType != "void") {
        tiles[x][y][1] = new Tile("lixo", floor(random(5) + 1));
        tiles[x][y][1].img.parent(grid[x][y][1]);
        total++;
      } else {
        tiles[x][y][1] = new Tile("void", 0);
        tiles[x][y][1].img.parent(grid[x][y][1]);
      }
    }
  }
  for (x = 1; x < 24; x++) {
    if (tiles[x][0][0].tType != "void") {
      tiles[x][0][1].remove();
      tiles[x][0][1] = new Tile("wall", 3);
      tiles[x][0][1].img.parent(grid[x][0][1]);
    }
  }
  for (y = 1; y < 24; y++) {
    if (tiles[0][y][0].tType != "void") {
      tiles[0][y][1].remove();
      tiles[0][y][1] = new Tile("wall", 2);
      tiles[0][y][1].img.parent(grid[0][y][1]);
    }
  }
  if (tiles[0][0][0].tType != "void") {
    tiles[0][0][1].remove();
    tiles[0][0][1] = new Tile("wall", 8);
    tiles[0][0][1].img.parent(grid[0][0][1]);
  }
  noStroke();
  canvas.parent(document.body);
  holdOnload = true;
}

window.onload = function() {
  if (holdOnload) {
    buttonUp = document.getElementById("bt-Top");
    buttonDown = document.getElementById("bt-Bottom");
    buttonLeft = document.getElementById("bt-Left");
    buttonRight = document.getElementById("bt-Right");
    buttonAction = document.getElementById("bt-Coletar");
    lixoC = document.getElementById("bt-lixo1").getElementsByTagName("strong")[0];
    lixoT = document.getElementById("bt-lixo1").getElementsByTagName("span")[0];
    lixoT.innerHTML = "/" + total;
    handler = new ButtonHandler();
    if ("true" === undefined) {
      buttonUp.remove();
      buttonDown.remove();
      buttonLeft.remove();
      buttonRight.remove();
      buttonAction.remove();
    } else {
      buttonUp.onclick = handler.up;
      buttonDown.onclick = handler.down;
      buttonLeft.onclick = handler.left;
      buttonRight.onclick = handler.right;
      buttonAction.onclick = handler.action;
    }
    bonequinho.score();
    bonequinho.tile.img.parent(grid[12][12][1]);
  }
}

function draw() {
  clear();
  background(0, 0);
}

function keyPressed() {
  switch (keyCode) {
    case DOWN_ARROW:
      handler.down();
      break;
    case UP_ARROW:
      handler.up();
      break;
    case LEFT_ARROW:
      handler.left();
      break;
    case RIGHT_ARROW:
      handler.right();
      break;
  }
  if (key == " ") {
    handler.action();
  }
}