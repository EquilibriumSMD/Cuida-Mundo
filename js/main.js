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

mainGame = function() {
    if (faseAtual === undefined) {
        faseAtual = new Fase("escola");
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

function keyPressed(event) {
	if(inGame){
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
}