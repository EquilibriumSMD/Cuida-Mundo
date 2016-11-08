var handler;
var buttonUp
var buttonDown
var buttonLeft
var buttonRight
var buttonAction
var lixoC, lixoT;
var personagem;
var faseIndex = 0;
var boss = false;
var btMapa0;
var btMapa1;
var btMapa2;
var btMapa3;
var btMapa4;

mainGame = function() {
    if (faseAtual[0] === undefined) {
        faseAtual[0] = new Fase("casa", null, dificult);
        faseAtual[1] = new Fase("escola", null, dificult);
        faseAtual[2] = new Fase("praia", null, dificult);
        faseAtual[faseIndex].load();
        Save();
    } else {
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
    btVoltarMapaAdd();
    for (lixo in equi.lixo[faseIndex]) {
        temp = new Sep(equi.lixo[faseIndex][lixo]);
    }
    equi.lixo[faseIndex] = [];
    faseAtual[faseIndex].total = 0;
}

function checkSeparar(evt) {
	evt.target.cursor = 'grab';
    if (evt.target.id > 11) {
        if (evt.target.y > 25 && evt.target.y < 200 && evt.target.x > 680 && evt.target.x < 925) {
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore += 10;
        }
    } else if (evt.target.id > 8 || evt.target.id == 0) {
        if (evt.target.y > 110 && evt.target.y < 300 && evt.target.x > 800 && evt.target.x < 1075) {
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore += 30;
        }
    } else if (evt.target.id > 3) {
        if (evt.target.y > 225 && evt.target.y < 425 && evt.target.x > 570 && evt.target.x < 900) {
            stage.removeChild(evt.target);
            GreenScore += 100;
            GoldScore += 15;
        }
    } else if (evt.target.y > 140 && evt.target.y < 350 && evt.target.x > 425 && evt.target.x < 725) {
        stage.removeChild(evt.target);
        GreenScore += 100;
        GoldScore += 25;
    }
}

var rushBeach = 0;

function beachRush(e) {
    rushBeach--;
    var text = new createjs.Text("\u{23f1}"+Math.round(rushBeach / 30), '20px Josefin Sans', '#fff');
    text.x = 10;
    text.y = 40;
    stage.addChild(bgPlay);
    stage.addChild(text);
    faseAtual[faseIndex].update();

	Score();

    if (rushBeach < 1) {
        faseAtual[faseIndex] = new Fase(faseAtual[faseIndex].type, null, dificult);
		GreenScore -= equi.lixo[faseIndex].length*5;
        equi.lixo[faseIndex] = [];
        Mapa();
        createjs.Ticker.removeEventListener("tick", beachRush);
    } else if (equi.lixo[faseIndex].length == faseAtual[faseIndex].total) {
        createjs.Ticker.removeEventListener("tick", beachRush);
        stage.removeChild(text);
        btVoltarMapaAdd();
    }
}

function Mapa() {
    introVideo.visible = false;

    if (faseAtual[0] !== undefined && faseAtual[0].total + faseAtual[1].total + faseAtual[2].total == 0 && !boss)
        boss = true;

    bgMapa = new createjs.Bitmap(sonGoqueue.getResult("bgMapa"));
    bgMapa.x = 0;
    bgMapa.y = 0;
    bgMapa.alpha = 0;
    inMenu = false;
    stage.addChild(bgMapa);
    createjs.Tween.get(bgMapa).to({
        alpha: 1
    }, 600);

    btMapa0 = new createjs.Bitmap(sonGoqueue.getResult("btMapa"));
	btMapa0.cursor = 'pointer';
    btMapa0.x = 920;
    btMapa0.y = 269;
    btMapa0.fase = 0;
    btMapa0.addEventListener("click", verificaFase);
    stage.addChild(btMapa0);

    btMapa1 = new createjs.Bitmap(sonGoqueue.getResult("btMapa"));
	btMapa1.cursor = 'pointer';
    btMapa1.x = 699;
    btMapa1.y = 346;
    btMapa1.fase = 1;
    btMapa1.addEventListener("click", verificaFase);
    stage.addChild(btMapa1);

    btMapa2 = new createjs.Bitmap(sonGoqueue.getResult("btMapa"));
	btMapa2.cursor = 'pointer';
    btMapa2.x = 917;
    btMapa2.y = 170;
    btMapa2.fase = 2;
    btMapa2.addEventListener("click", verificaFase);
    stage.addChild(btMapa2);

    btMapa3 = new createjs.Bitmap(sonGoqueue.getResult("btMapa"));
	btMapa3.cursor = 'pointer';
    btMapa3.x = 300;
    btMapa3.y = 374;
    btMapa3.fase = "ecoponto";
    btMapa3.addEventListener("click", verificaFase);
    stage.addChild(btMapa3);

    if (boss) {
        btMapa4 = new createjs.Bitmap(sonGoqueue.getResult("btMapa"));
        btMapa4.cursor = 'pointer';
        btMapa4.x = 490;
        btMapa4.y = 510;
        btMapa4.fase = "boss";
        btMapa4.addEventListener("click", verificaFase);
        stage.addChild(btMapa4);
    }

	Score();
	
    btVoltarAdd();
}

function verificaFase(e) {
    if (e.target.fase != "ecoponto") {
        faseIndex = e.target.fase;
        play();
    } else if (e.target.fase == "ecoponto") {
        Separar();
    } else if (e.target.fase == "boss") {
        Boss();
    }
}

function Score() {
var text = new createjs.Text("\u{1f331}" + GreenScore, '20px Josefin Sans', '#0F0');
    text.x = 10;
    text.y = 730;
    stage.addChild(text);
    var text = new createjs.Text("\u{1f4b0}" + GoldScore, '20px Josefin Sans', '#FF0');
    text.x = 10;
    text.y = 750;
    stage.addChild(text);
    var text = new createjs.Text("lvl:" + Math.round(dificult / 0.05), '20px Josefin Sans', '#FFF');
    text.x = 10;
    text.y = 770;
    stage.addChild(text);
}

function Boss(){
    bossBG = new createjs.Bitmap(sonGoqueue.getResult("bossBG"));
    bossBG.x = 0;
    bossBG.y = 0;
    bossBG.alpha = 0;
    inMenu = false;
    stage.addChild(bossBG);
    createjs.Tween.get(bossBG).to({
        alpha: 1
    }, 600);
    
    dificult += 0.05;
    faseAtual[0] = new Fase("casa", null, dificult);
    faseAtual[1] = new Fase("escola", null, dificult);
    faseAtual[2] = new Fase("praia", null, dificult);

    boss = false;

    btVoltarAdd();
}
