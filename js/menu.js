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

    btnEco = new createjs.Bitmap("img/btnEco.png");
    btnPlay = new createjs.Bitmap("img/btnPlay.png");
    btnMais = new createjs.Bitmap("img/btnMais.png");

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
    menuBG = new createjs.Bitmap("img/menuBG.jpg");
    menuBG.x = 0;
    menuBG.y = 0;
    stage.addChild(menuBG);

    opMenu();
}

function btVoltarAdd() {
    btVoltar = new createjs.Bitmap("img/btVoltar.png");
    btVoltar.addEventListener("click", setupMenu);
    btVoltar.x = 800;
    btVoltar.y = 600;
    stage.addChild(btVoltar);
}

function play() {
    bgPlay = new createjs.Bitmap("img/bgPlay.jpg");
    bgPlay.x = 0;
    bgPlay.y = 0;
    if (!archivement) {
        var n = new Notification("Archievement Get!", {
            body: "First Step +50G\nSeu espírito de protetor ambiental é forte, mas o jogo ainda não está pronto ☹",
            icon: "img/icon-lixo1.png"
        });
        archivement = true;
    }
    stage.addChild(bgPlay);
    mainGame();
    btVoltarAdd();
}

function mais() {
    bgMais = new createjs.Bitmap("img/bgMais.jpg");
    bgMais.x = 0;
    bgMais.y = 0;

    stage.addChild(bgMais);
    btVoltarAdd();
}

function eco() {
    bgEco = new createjs.Bitmap("img/bgEco.jpg");
    bgEco.x = 0;
    bgEco.y = 0;

    stage.addChild(bgEco);
    btVoltarAdd();
}