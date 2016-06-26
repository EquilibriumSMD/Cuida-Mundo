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
	if( faseAtual === undefined ) {
		faseAtual = new Fase("quadrado");
	} else {
		faseAtual.load();
	}
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
    equi.sprite.x = treesholdX(equi.x, equi.y);
    equi.sprite.y = treesholdY(equi.x, equi.y, equi.z + 0.5);
    stage.addChild(equi.sprite);
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