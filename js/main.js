var handler;
var buttonUp
var buttonDown
var buttonLeft
var buttonRight
var buttonAction
var lixoC, lixoT;
var personagem;
var faseAtual = [];
var faseIndex;
var GreenScore = 0;
var GoldScore = 0;

mainGame = function() {
    if (faseAtual[0] === undefined) {
        faseAtual[0] = new Fase("casa", null, 0.1);
        faseAtual[1] = new Fase("escola", null, 0.1);
        faseAtual[2] = new Fase("praia", null, 0.1);
		faseIndex = Math.floor(Math.random() * 3);
        faseAtual[faseIndex].load();
    } else {
		faseIndex = Math.floor(Math.random() * 3);
        faseAtual[faseIndex].load();
    }
    lixoT.innerHTML = "/" + faseAtual[faseIndex].total;
    handler = new ButtonHandler();
    if ("true" === undefined) {
        $("#bt-Top").remove();
        $("#bt-Bottom").remove();
        $("#bt-Left").remove();
        $("#bt-Right").remove();
        $("#bt-Coletar").remove();
    } else {
        $("#bt-Top").onclick = handler.up;
        $("#bt-Bottom").onclick = handler.down;
        $("#bt-Left").onclick = handler.left;
        $("#bt-Right").onclick = handler.right;
        $("#bt-Coletar").onclick = handler.action;
    }
    equi.score();
    equi.sprite.x = treesholdX(equi.x, equi.y);
    equi.sprite.y = treesholdY(equi.x, equi.y, equi.z + 1.5);
}
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);
var key;

function keyPressed(evento) {
    if (key === undefined) {
        if (inGame) {
            switch (evento.keyCode) {
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
            if (evento !== undefined && evento.key == " ") {
                handler.action();
            }
        }
        key = setInterval(function() {
            if (inGame) {
                switch (evento.keyCode) {
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
                if (evento !== undefined && evento.key == " ") {
                    handler.action();
                }
            }
        }, 150);
    }
}

function keyReleased() {
    clearInterval(key);
    key = undefined;
}

function Separar() {
    inGame = false;
    bgPlay = new createjs.Bitmap(sonGoqueue.getResult("bgPlay"));
    bgPlay.x = 0;
    bgPlay.y = 0;
    bgPlay.alpha = 0;
    stage.addChild(menuBG);
    createjs.Tween.get(menuBG).to({
        alpha: 1
    }, 600);
    btVoltarAdd();
    for (lixo in equi.lixo[faseIndex]) {
        temp = new Sep(equi.lixo[faseIndex][lixo]);
    }
}

function checkSeparar(evt) {
    if (evt.target.x < 140) {
        stage.removeChild(evt.target);
        GreenScore += 100;
    }
}