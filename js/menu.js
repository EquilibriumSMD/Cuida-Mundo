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
    $(".scores").hide();
    $(".navegacao").hide();
    inGame = false;
    inMenu = true;
    inSubMenu = false;
    menuBG = new createjs.Bitmap(sonGoqueue.getResult("menuBG"));
    menuBG.x = 0;
    menuBG.y = 0;
    menuBG.alpha = 0;
    stage.addChild(menuBG);
    createjs.Tween.get(menuBG).to({
        alpha: 1
    }, 600);
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
    createjs.Tween.get(btnEco).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnPlay).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnMais).to({
        alpha: 1
    }, 600);
}

function subMenu() {
    inSubMenu = true;
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
    createjs.Tween.get(btnSobre).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnParticipar).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnCreditos).to({
        alpha: 1
    }, 600);
}

function setupMenu() {
    tSize = 64;
    if (equi === undefined) {
        equi = new Boneco();
    }
    opMenu();
}

function btVoltarAdd() {
    btVoltar = new createjs.Bitmap(sonGoqueue.getResult("btVoltar"));
    btVoltar.addEventListener("click", setupMenu);
    btVoltar.x = 20;
    btVoltar.y = 20;
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
    $(".scores").show();
    $(".navegacao").show();
    inMenu = false;
    stage.addChild(bgPlay);
    createjs.Tween.get(bgPlay).to({
        alpha: 1
    }, 600).call(mainGame);
    btVoltarAdd();
}

function mais() {
    bgMais = new createjs.Bitmap(sonGoqueue.getResult("bgMais"));
    bgMais.x = 0;
    bgMais.y = 0;
    bgMais.alpha = 0;
    inMenu = false;
    stage.addChild(bgMais);
    createjs.Tween.get(bgMais).to({
        alpha: 1
    }, 600);
    var showTxt = new createjs.Text("O Projeto Cuida Mundo foi desenvolvido pela Equipe Equilibrium, composta pelos seguintes estudantes do curso de Sistemas e Mídias Digitais da Universidade Federal do Ceará: Jório Matos, Álvaro Carvalho, Isabela Silveira, Alana Martins e Daniel Lima; sob orientação dos professores [...] e sob monitoria de [...]", '20px Josefin Sans', '#fff');
    showTxt.x = 300;
    showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
    btVoltarAdd();
}

function eco() {
    bgEco = new createjs.Bitmap(sonGoqueue.getResult("bgEco"));
    bgEco.x = 0;
    bgEco.y = 0;
    bgEco.alpha = 0;
    inMenu = false;
    stage.addChild(bgEco);
    createjs.Tween.get(bgEco).to({
        alpha: 1
    }, 600);
    var showTxt = new createjs.Text("Conheça mais sobre os Ecopontos.", '20px Josefin Sans', '#fff');
    showTxt.x = 300;
    showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
    subMenu();
    btVoltarAdd();
}

function conheca() {
    bgEco = new createjs.Bitmap(sonGoqueue.getResult("bgEco"));
    bgEco.x = 0;
    bgEco.y = 0;
    bgEco.alpha = 0;
    inMenu = false;
    stage.addChild(bgEco);
    createjs.Tween.get(bgEco).to({
        alpha: 1
    }, 600);
    subMenu();
    btVoltarAdd();
    var showTxt = new createjs.Text("Os EcoPontos são contêineres colocados em pontos importantes de cada regional, para que a população possa depositar o lixo, de forma selecionada, contribuindo para o meio ambiente e recebendo, além disso, vantagens sociais, como descontos nas contas de água e luz ou créditos no cartão do transporte público, por exemplo.", '20px Josefin Sans', '#fff');
    showTxt.x = 300;
    showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
}

function participe() {
    bgEco = new createjs.Bitmap(sonGoqueue.getResult("bgEco"));
    bgEco.x = 0;
    bgEco.y = 0;
    bgEco.alpha = 0;
    inMenu = false;
    stage.addChild(bgEco);
    createjs.Tween.get(bgEco).to({
        alpha: 1
    }, 600);
    subMenu();
    btVoltarAdd();
    var showTxt = new createjs.Text('Para adquirir os créditos ou descontos basta que o Fortalezense siga dicas simples: \n' +
        '\n① Procurar o Ecoponto mais próximo, fazer o cadastro e receber o cartão Recicla Fortaleza; \n' +
        '\n② Com o cartão pronto, separar os resíduos recicláveis e levá-los até o Ecoponto para serem pesados, lembrando de armazená-los sem sobra de alimentos ou produtos, para que não atraia insetos e gere mal cheiro; \n' +
        '\n③ No Ecoponto, conferir a tabela de valores dos resíduos recicláveis, pois o crédito será calculado de acordo com  o peso e o tipo de cada material.', '20px Josefin Sans', '#fff');
    showTxt.x = 300;
    showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
}

function materiais() {
    bgEco = new createjs.Bitmap(sonGoqueue.getResult("bgEco"));
    bgEco.x = 0;
    bgEco.y = 0;
    bgEco.alpha = 0;
    inMenu = false;
    stage.addChild(bgEco);
    createjs.Tween.get(bgEco).to({
        alpha: 1
    }, 600);
    subMenu();
    btVoltarAdd();
    tabela = new createjs.Bitmap(sonGoqueue.getResult("bg-tabela"));
    tabela.x = 250;
    tabela.y = 800;
    stage.addChild(tabela);
    createjs.Tween.get(tabela).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
}