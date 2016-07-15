var handler;
var buttonUp
var buttonDown
var buttonLeft
var buttonRight
var buttonAction
var lixoC, lixoT;
var personagem;
var faseAtual = [];
var faseIndex = 0;
var GreenScore = 0;
var GoldScore = 5;
var dificult = 0.05;

mainGame = function() {
    if (faseAtual[0] === undefined || (faseAtual[0].total + faseAtual[1].total + faseAtual[2].total == 0)) {
		dificult += 0.05;
        faseAtual[0] = new Fase("casa", null, dificult);
        faseAtual[1] = new Fase("escola", null, dificult);
        faseAtual[2] = new Fase("praia", null, dificult);
		//faseIndex = Math.floor(Math.random() * 3);
		faseIndex = 1;
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
    eco = new createjs.Bitmap(sonGoqueue.getResult("Ecopontos"));
    eco.x = 0;
    eco.y = 0;
    eco.alpha = 0;
    stage.addChild(eco);
    createjs.Tween.get(eco).to({
        alpha: 1
    }, 600);
    btVoltarAdd();
    for (lixo in equi.lixo[faseIndex]) {
        temp = new Sep(equi.lixo[faseIndex][lixo]);
    }
    equi.lixo[faseIndex] = [];
	faseAtual[faseIndex].total = 0;
}

function checkSeparar(evt) {
    if (evt.target.id > 11) {
        if(evt.target.y > 25 && evt.target.y < 200 && evt.target.x > 680 && evt.target.x < 925 ){
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore += 10;
        }
    } else if (evt.target.id > 8 || evt.target.id == 0) {
        if(evt.target.y > 110 && evt.target.y < 300 && evt.target.x > 800 && evt.target.x < 1075 ){
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore +=30;
        }
    } else if (evt.target.id > 3) {
        if(evt.target.y > 225 && evt.target.y < 425 && evt.target.x > 570 && evt.target.x < 900 ){
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore += 15;
        }
    } else if(evt.target.y > 140 && evt.target.y < 350 && evt.target.x > 425 && evt.target.x < 725 ){
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore += 25;
        }
}