var stage;
var tiles = [];
var equi;
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
    stage = new createjs.Stage("defaultCanvas0");
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;
	//Cria a Matriz de espaços vazios
    for (x = 0; x < 24; x++) {
        tiles[x] = [];
        for (y = 0; y < 24; y++) {
            tiles[x][y] = [];
            for (z = 0; z < 24; z++) {
                tiles[x][y][z] = new Tile("void", 0, x, y, z);
            }
        }
    }
    //tiles[x][y][1] = new Tile("lixo", Math.floor(Math.random() * 5 + 1), x, y, z);
    for (x = 10; x < 20; x++) {
        for (y = 10; y < 20; y++) {
            tiles[x][y][0] = new Tile("floor", 0, x, y, z);
        }
    }
    holdOnload = true;
}

window.onload = function() {
    tSize = 64;
    equi = new Boneco();
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
        equi.score();
        equi.sprite.x = treesholdX(12, 12);
        equi.sprite.y = treesholdY(12, 12, 2.5);
        stage.addChild(equi.sprite);
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