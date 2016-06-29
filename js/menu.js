var menu;
var tela;
var btMenu;
var btHome;
var btnPlay;
var btnMais;
var btnEco;
var btVoltar;
var archivement = false;

createjs.Ticker.addEventListener("tick", draw);

function opMenu() {

    btnEco = new createjs.Bitmap(sonGoqueue.getResult("btnEco"));
    btnPlay = new createjs.Bitmap(sonGoqueue.getResult("btnPlay"));
    btnMais = new createjs.Bitmap(sonGoqueue.getResult("btnMais"));

    //posicionamento dos botoes
    btnEco.x = 680;
    btnEco.y = 370;
    btnPlay.x = 790;
    btnPlay.y = 330;
    btnMais.x = 980;
    btnMais.y = 370;

    //fadeIn
    btnEco.alpha = 0;
    btnPlay.alpha = 0;
    btnMais.alpha = 0;
    
    //adicionando os botões
    stage.addChild(btnEco);
    stage.addChild(btnPlay);
    stage.addChild(btnMais);
    
    createjs.Tween.get(btnEco).to({alpha: 1},600);
    createjs.Tween.get(btnPlay).to({alpha: 1},600);
    createjs.Tween.get(btnMais).to({alpha: 1},600);

}

function setupMenu() {
    tSize = 64;
    equi = new Boneco();
    menuBG = new createjs.Bitmap(sonGoqueue.getResult("menuBG"));
    menuBG.x = 0;
    menuBG.y = 0;
    menuBG.alpha = 0;
    stage.addChild(menuBG);
    createjs.Tween.get(menuBG).to({alpha: 1},600);
    inGame = false;
    inMenu = true;
    opMenu();
}

function btVoltarAdd() {
    btVoltar = new createjs.Bitmap(sonGoqueue.getResult("btVoltar"));
    btVoltar.addEventListener("click", setupMenu);
    btVoltar.x = 800;
    btVoltar.y = 600;
    stage.addChild(btVoltar);
}

function play() {
    bgPlay = new createjs.Bitmap(sonGoqueue.getResult("bgPlay"));
    bgPlay.x = 0;
    bgPlay.y = 0;
    bgPlay.alpha = 0;
    if (!archivement) {
        var n = new Notification("Archievement Get!", {
            body: "First Step +50G\nSeu espírito de protetor ambiental é forte, mas o jogo ainda não está pronto ☹",
            icon: "img/icon-lixo1.png"
        });
        archivement = true;
    }
    inGame = true;
    inMenu = false;
    stage.addChild(bgPlay);
    createjs.Tween.get(bgPlay).to({alpha: 1},600);
    mainGame();
    btVoltarAdd();
}

function mais() {
    bgMais = new createjs.Bitmap(sonGoqueue.getResult("bgMais"));
    bgMais.x = 0;
    bgMais.y = 0;
    bgMais.alpha = 0;
    inMenu = false;

    stage.addChild(bgMais);
    createjs.Tween.get(bgMais).to({alpha: 1},600);
    btVoltarAdd();
}

function eco() {
    bgEco = new createjs.Bitmap(sonGoqueue.getResult("bgEco"));
    bgEco.x = 0;
    bgEco.y = 0;
    bgEco.alpha = 0;
    inMenu = false;

    stage.addChild(bgEco);
    createjs.Tween.get(bgEco).to({alpha: 1},600);
    btVoltarAdd();
}