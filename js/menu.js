var menu;
var tela;
var btMenu;
var btHome;
var btJogar;
var btInstrucoes;
var btCreditos;
var btEcopontos;

function setup() {  
    tela = createCanvas(1680, 925);
    
    home();
}

function opMenu(){
    
    document.getElementById("bt-home").onclick = home;
    document.getElementById("bt-play").onclick = play;
    document.getElementById("bt-instrucoes").onclick = instrucoes;
    document.getElementById("bt-creditos").onclick = creditos;
    document.getElementById("bt-ecopontos").onclick = ecopontos;
}

function home(){
    tela.class('home');
    
    //voltar ao início
    btHome = createButton("Início").class("bt-menu").id("bt-home");
    btHome.position(20, 19);
    
    //botão play
    btJogar = createButton("Play").class("bt-menu").id("bt-play");
    btJogar.position(100, 19);
    
    //botão Instruções
    btinstrucoes = createButton("Instruções").class("bt-menu").id("bt-instrucoes");
    btinstrucoes.position(180, 19);
    
    //botão Créditos
    btCreditos = createButton("Créditos").class("bt-menu").id("bt-creditos");
    btCreditos.position(280, 19);
    
    //botão Ecopontos
    btEcopontos = createButton("Ecopontos").class("bt-menu").id("bt-ecopontos");
    btEcopontos.position(380, 19);
    
    opMenu();
}

function play(){
    tela.class('cenario-play');
}

function instrucoes(){
    tela.class('cenario-instrucoes');
}

function creditos(){
    tela.class('cenario-creditos');
}

function ecopontos(){
    tela.class('cenario-ecopontos');
}