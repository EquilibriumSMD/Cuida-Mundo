var menu;
var tela;
var btMenu;
var btHome;
var btJogar;
var btInstrucoes;
var btCreditos;
var btEcopontos;
var stage;

createjs.Ticker.addEventListener("tick", draw);

function opMenu(){
    
//    document.getElementById("bt-home").onclick = home;
//    document.getElementById("bt-play").onclick = play;
//    document.getElementById("bt-instrucoes").onclick = instrucoes;
//    document.getElementById("bt-creditos").onclick = creditos;
//    document.getElementById("bt-ecopontos").onclick = ecopontos;
    
    tela = document.getElementsByTagName("body");
    console.log(tela);
    
    
    btJogar = new createjs.Bitmap("img/btJogar.png");
    btInstrucoes = new createjs.Bitmap("img/btInstrucoes.png");
    btCreditos = new createjs.Bitmap("img/btCreditos.png");
    
    //jogando as funções de cada botão
    btJogar.addEventListener("click", play);
    btInstrucoes.addEventListener("click", instrucoes );
    btCreditos.addEventListener("click", creditos);
    
    //posicionamento dos botoes
    btJogar.x = 300;
    btJogar.y = 600;
    btInstrucoes.x = 500;
    btInstrucoes.y = 600;
    btCreditos.x = 700;
    btCreditos.y = 600;
    
    //adicionando os botões
    stage.addChild(btJogar);
    stage.addChild(btInstrucoes);
    stage.addChild(btCreditos);
    
}

function setupMenu() {  
    stage = new createjs.Stage("defaultCanvas0");
	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;
    
    opMenu();
}

window.onload = function() {
    setupMenu();
}



function draw() {
    stage.update();
}

function play(){
    bgPlay = new createjs.Bitmap("img/bgPlay.png");
    stage.addChild(bgPlay);
}

function instrucoes(){
    bgInstrucoes = new createjs.Bitmap("img/bgInstrucoes.png");
    stage.addChild(bgInstrucoes);
}

function creditos(){
    bgCreditos = new createjs.Bitmap("img/bgCreditos.png");
    stage.addChild(bgCreditos);
}