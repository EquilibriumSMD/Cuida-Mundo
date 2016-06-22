var stage;
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
var personagem;

createjs.Ticker.addEventListener("tick", draw);

function setup() {
  document.getElementById("defaultCanvas0").width = window.innerWidth;
  document.getElementById("defaultCanvas0").height = window.innerHeight;
  stage =  new createjs.Stage("defaultCanvas0");
  for (x = 0; x < 24; x++) {
    tiles[x] = [];
    for (y = 0; y < 24; y++) {
      tiles[x][y] = [];
      if (Math.floor(Math.random()*4) === 0) {
        tiles[x][y][0] = new Tile("void", 0);
      } else {
        tiles[x][y][0] = new Tile("floor", 0);
      }
      stage.addChild(tiles[x][y][0].img);
		tiles[x][y][0].img.x = treesholdX(x, y);
		tiles[x][y][0].img.y = treesholdY(x, y, 0);
      if (Math.floor(Math.random()*10) < 5 && tiles[x][y][0].tType != "void") {
        tiles[x][y][1] = new Tile("lixo", Math.floor(Math.random()*5 + 1));
		tiles[x][y][1].img.x = treesholdX(x, y);
		tiles[x][y][1].img.y = treesholdY(x, y, 1);
        stage.addChild(tiles[x][y][1].img);
        total++;
      } else {
        tiles[x][y][1] = new Tile("void", 0);
		tiles[x][y][1].img.x = treesholdX(x, y);
		tiles[x][y][1].img.y = treesholdY(x, y, 1);
        stage.addChild(tiles[x][y][1].img);
      }
    }
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
	bonequinho.tile.img.y = treesholdY(12, 12, 1.7);
    stage.addChild(bonequinho.tile.img);
  }
}

function draw() {
  stage.update();
}

document.addEventListener('keydown', keyPressed);
	
function keyPressed(event) {
  switch (event.keyCode) {
    case 40:
      handler.down();
      break;
    case 38:
      handler.up();
      break;
    case 37:
      handler.left();
      break;
    case 39:
      handler.right();
      break;
  }
  if (event.key == " ") {
    handler.action();
  }
}