var menu;
var tela;
var btMenu;
var btHome;
var btnPlay;
var btnMais;
var btnEco;
var btnSobre;
var btnParticipar;
var btnCreditos;
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

function subMenu() {

    btnSobre = new createjs.Bitmap(sonGoqueue.getResult("btnSobre"));
    btnParticipar = new createjs.Bitmap(sonGoqueue.getResult("btnParticipar"));
    btnCreditos = new createjs.Bitmap(sonGoqueue.getResult("btnCreditos"));

    //posicionamento dos botoes
    btnSobre.x = 0;
    btnSobre.y = 185;
    btnParticipar.x = 429;
    btnParticipar.y = 185;
    btnCreditos.x = 855;
    btnCreditos.y = 185;

    //fadeIn
    btnSobre.alpha = 0;
    btnParticipar.alpha = 0;
    btnCreditos.alpha = 0;
    
    //adicionando os botões
    stage.addChild(btnSobre);
    stage.addChild(btnParticipar);
    stage.addChild(btnCreditos);
    
    createjs.Tween.get(btnSobre).to({alpha: 1},600);
    createjs.Tween.get(btnParticipar).to({alpha: 1},600);
    createjs.Tween.get(btnCreditos).to({alpha: 1},600);
    
    conheca();

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
    subMenu();
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
    subMenu();
    btVoltarAdd();
}

function conheca() {
    
    var showTxt = new createjs.Text("Os EcoPontos são contêineres colocados em pontos importantes de cada regional, para que a população possa depositar o lixo, de forma selecionada, contribuindo para o meio ambiente e recebendo, além disso, vantagens sociais, como descontos nas contas de água e luz ou créditos no cartão do transporte público, por exemplo.",'600 20px Josefin Sans','#fff');
	showTxt.x = 300; showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({y:355}, 1000);//, createjs.Ease.quadInOut);
    
}

function participe() {
    
    var showTxt = new createjs.Text("Os EcoPontos são contêineres colocados em pontos importantes de cada regional, para que a população possa depositar o lixo, de forma selecionada, contribuindo para o meio ambiente e recebendo, além disso, vantagens sociais, como descontos nas contas de água e luz ou créditos no cartão do transporte público, por exemplo.",'28px Josefin Sans','#fff');
	showTxt.x = 300; showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({y:355}, 1000);//, createjs.Ease.quadInOut);
    
}