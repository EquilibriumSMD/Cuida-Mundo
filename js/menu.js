var menu;
var tela;
var btMenu;
var btHome;
var btnPlay;
var btnMais;
var btnEco;
var btVoltar;
var stage;

createjs.Ticker.addEventListener("tick", draw);

function opMenu(){
    
    btnEco = new createjs.Bitmap("img/btnEco.png");
    btnPlay = new createjs.Bitmap("img/btnPlay.png");
    btnMais = new createjs.Bitmap("img/btnMais.png");
    
    //jogando as funções de cada botão
    btnPlay.addEventListener("click", play);
    btnMais.addEventListener("click", mais );
    btnEco.addEventListener("click", eco);
    
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
    stage = new createjs.Stage("defaultCanvas0");
	stage.canvas.width = 1280;
	stage.canvas.height = 800;
    menuBG = new createjs.Bitmap("img/menuBG.jpg");
    menuBG.x=0;
    menuBG.y=0;
    stage.addChild(menuBG);
    
    opMenu();
}

function btVoltar(){
    btVoltar = new createjs.Bitmap("img/btVoltar.png");
    btVoltar.addEventListener("click", setupMenu);
    btVoltar.x = 800;
    btVoltar.y = 600;
    stage.addChild(btVoltar);  
}

window.onload = function() {
    setupMenu();
}



function draw() {
    stage.update();
}

function play(){
    bgPlay = new createjs.Bitmap("img/bgPlay.jpg");
    bgPlay.x=0;
    bgPlay.y=0;
    
    stage.addChild(bgPlay);
    btVoltar();
}

function mais(){
    bgMais = new createjs.Bitmap("img/bgMais.jpg");
    bgMais.x=0;
    bgMais.y=0;
    
    stage.addChild(bgMais);
    btVoltar();
}

function eco(){
    bgEco = new createjs.Bitmap("img/bgEco.jpg");
    bgEco.x=0;
    bgEco.y=0;
    
    stage.addChild(bgEco);
    btVoltar();
}