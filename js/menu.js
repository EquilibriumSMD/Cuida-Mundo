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

    //adicionando os botões
    stage.addChild(btnEco);
    stage.addChild(btnPlay);
    stage.addChild(btnMais);

}

function setupMenu() {
    menuBG = new createjs.Bitmap(sonGoqueue.getResult("menuBG"));
    menuBG.x = 0;
    menuBG.y = 0;
    stage.addChild(menuBG);
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
    mainGame();
    btVoltarAdd();
}

function mais() {
    bgMais = new createjs.Bitmap(sonGoqueue.getResult("bgMais"));
    bgMais.x = 0;
    bgMais.y = 0;
    inMenu = false;

    stage.addChild(bgMais);
    btVoltarAdd();
}

function eco() {
    bgEco = new createjs.Bitmap(sonGoqueue.getResult("bgEco"));
    bgEco.x = 0;
    bgEco.y = 0;
    inMenu = false;

    stage.addChild(bgEco);
    btVoltarAdd();
}