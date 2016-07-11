var handler;
var buttonUp
var buttonDown
var buttonLeft
var buttonRight
var buttonAction
var lixoC, lixoT;
var total = 0;
var personagem;
var faseAtual;
var GreenScore = 0;
var GoldScore = 0;

mainGame = function() {
    if (faseAtual === undefined) {
        faseAtual = new Fase("escola", null, 0.1);
        faseAtual.load();
    } else {
        faseAtual.load();
    }
    lixoT.innerHTML = "/" + total;
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
	if(key === undefined){
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
	for( lixo in equi.lixo ) {
		temp = new createjs.Bitmap(sonGoqueue.getResult("lixo"+equi.lixo[lixo]));
		temp.scaleX = 2;
		temp.scaleY = 2;
		stage.addChild(temp);
		temp.x = Math.random() * 1000 + 140;
		temp.y = Math.random() * 700;
		temp.on("pressmove", function(evt) {
			evt.target.x = evt.stageX - tSize;
			evt.target.y = evt.stageY - tSize;
		});
		temp.on("pressup", checkSeparar)
	}
}

function checkSeparar(evt) {
	if(evt.target.x < 140){
		stage.removeChild(evt.target);
		GreenScore += 100;
	}
}