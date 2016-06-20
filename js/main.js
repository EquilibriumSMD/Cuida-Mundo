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
var lixoC, lixoT;
var total = 0;
var holdOnload;
var pn = new Perlin('S');

createjs.Ticker.addEventListener("tick", draw);

function setup() {
  canvas =  new createjs.Stage("defaultCanvas0");
  for (x = 0; x < 24; x++) {
    tiles[x] = [];
    for (y = 0; y < 24; y++) {
      tiles[x][y] = [];
      if (Math.floor((pn.noise(x, y, 0) * 4)) === 0) {
        tiles[x][y][0] = new Tile("void", 0);
      } else {
        tiles[x][y][0] = new Tile("test", Math.floor((pn.noise(x, y, 0) * 3) + 1));
      }
      canvas.addChild(tiles[x][y][0].img);
      if (Math.floor(Math.random(10)) < 5 && tiles[x][y][0].tType != "void") {
        tiles[x][y][1] = new Tile("lixo", Math.floor(Math.random(5) + 1));
		tiles[x][y][1].img.x = treesholdX(x, y);
		tiles[x][y][1].img.y = treesholdY(x, y, 1);
        canvas.addChild(tiles[x][y][1].img);
        total++;
      } else {
        tiles[x][y][1] = new Tile("void", 0);
		tiles[x][y][1].img.x = treesholdX(x, y);
		tiles[x][y][1].img.y = treesholdY(x, y, 1);
        canvas.addChild(tiles[x][y][1].img);
      }
    }
  }
  for (x = 1; x < 24; x++) {
    if (tiles[x][0][0].tType != "void") {
      tiles[x][0][1].remove();
      tiles[x][0][1] = new Tile("wall", 3);
	  tiles[x][0][1].img.x = treesholdX(x, 0);
	  tiles[x][0][1].img.y = treesholdY(x, 0, 1);
	  canvas.addChild(tiles[x][0][1].img);
    }
  }
  for (y = 1; y < 24; y++) {
    if (tiles[0][y][0].tType != "void") {
      tiles[0][y][1].remove();
      tiles[0][y][1] = new Tile("wall", 2);
	  tiles[0][y][1].img.x = treesholdX(0, y);
	  tiles[0][y][1].img.y = treesholdY(0, y, 1);
	  canvas.addChild(tiles[0][y][1].img);
    }
  }
  if (tiles[0][0][0].tType != "void") {
    tiles[0][0][1].remove();
    tiles[0][0][1] = new Tile("wall", 8);
	tiles[0][0][1].img.x = treesholdX(0, 0);
	tiles[0][0][1].img.y = treesholdY(0, 0, 1);
	canvas.addChild(tiles[0][0][1].img);
  }
  holdOnload = true;
}

window.onload = function() {
  tSize = 64;
  bonequinho = new Boneco();
  setup();
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
	bonequinho.tile.img.x = treesholdX(12, 12);
	bonequinho.tile.img.y = treesholdY(12, 12, 3);
    canvas.addChild(bonequinho.tile.img);
  }
}

function draw() {
  //clear();
  //background(0, 0);
  canvas.update();
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