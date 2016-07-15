var menu;
var tela;
var btMenu;
var btHome;
var btnPlay;
var btnOpcoes;
var btnEco;
var btnSobre;
var btnParticipar;
var btnCreditos;
var btnDesenvolvedores;
var btnMonitores;
var btnOrientadores;
var btVoltar;
var tabela;
var tabelaDevs;
var tabelaMoni;
var tabelaOrient;
var archivement = false;
createjs.Ticker.addEventListener("tick", draw);


function hideTabela(){
    tabela.visible = false;
}
function showTabela(){
    tabela.visible = true;
    tabela.x = 250 + telaOffset;
    tabela.y = 800;
    createjs.Tween.get(tabela).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
}

function hideTabelaDevs(){
    tabelaDevs.visible = false;
}
function showTabelaDevs(){
    tabelaDevs.visible = true;
    tabelaDevs.x = 250 + telaOffset;
    tabelaDevs.y = 800;
    createjs.Tween.get(tabelaDevs).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
}

function hideTabelaMoni(){
    tabelaMoni.visible = false;
}
function showTabelaMoni(){
    tabelaMoni.visible = true;
    tabelaMoni.x = 250 + telaOffset;
    tabelaMoni.y = 800;
    createjs.Tween.get(tabelaMoni).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
    console.log("Show monitores");
} 

function hideTabelaOrient(){
    tabelaOrient.visible = false;
}
function showTabelaOrient(){
    tabelaOrient.visible = true;
    tabelaOrient.x = 250 + telaOffset;
    tabelaOrient.y = 800;
    createjs.Tween.get(tabelaOrient).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
}

function opMenu() {
    $(".scores").hide();
    $(".navegacao").hide();
    inGame = false;
    inMenu = true;
    inSubMenu = false;
    inSubMenu2 = false;
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
    btnEquipe = new createjs.Bitmap(sonGoqueue.getResult("btnEquipe"));
    btnOpcoes = new createjs.Bitmap(sonGoqueue.getResult("btnOpcoes"));
    
    //posicionamento dos botoes
    btnEco.x = 1140;
    btnEco.y = 50;
    btnPlay.x = 810;
    btnPlay.y = 330;
    btnEquipe.x = 780;
    btnEquipe.y = 665;
    btnOpcoes.x = 890;
    btnOpcoes.y = 665;
    
    //fadeIn
    btnEco.alpha = 0;
    btnPlay.alpha = 0;
    btnEquipe.alpha = 0;
    btnOpcoes.alpha = 0;
    
    //adicionando os botões
    stage.addChild(btnEco);
    stage.addChild(btnPlay);
    stage.addChild(btnEquipe);
    stage.addChild(btnOpcoes);
    createjs.Tween.get(btnEco).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnPlay).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnEquipe).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnOpcoes).to({
        alpha: 1
    }, 600);
}

function subMenu2() {
    inSubMenu2 = true;
    btnDesenvolvedores = new createjs.Bitmap(sonGoqueue.getResult("btnDesenvolvedores"));
    btnOrientadores = new createjs.Bitmap(sonGoqueue.getResult("btnOrientadores"));
    btnMonitores = new createjs.Bitmap(sonGoqueue.getResult("btnMonitores"));
    //posicionamento dos botoes
    btnDesenvolvedores.x = 0;
    btnDesenvolvedores.y = 185;
    btnOrientadores.x = 429;
    btnOrientadores.y = 185;
    btnMonitores.x = 855;
    btnMonitores.y = 185;
    //fadeIn
    btnDesenvolvedores.alpha = 0;
    btnOrientadores.alpha = 0;
    btnMonitores.alpha = 0;
    //adicionando os botões
    stage.addChild(btnDesenvolvedores);
    stage.addChild(btnOrientadores);
    stage.addChild(btnMonitores);
    createjs.Tween.get(btnDesenvolvedores).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnOrientadores).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnMonitores).to({
        alpha: 1
    }, 600);
}

function setupMenu() {
    tSize = 64;
    if (equi === undefined) {
        equi = new Boneco();
    }
    opMenu();
    //soundMenu.play();
    soundFase.stop();
    hideTabela();
    hideTabelaDevs();
    hideTabelaMoni();
    hideTabelaOrient();
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
            body: "First Step +5 💰\nSeu espírito de protetor ambiental é forte",
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
    
    soundMenu.stop();
    soundFase.play();
	
	var text = new createjs.Text("🌱"+GreenScore, '20px Josefin Sans', '#0F0');
    text.x = 10;
    text.y = 730;
    stage.addChild(text);
	var text = new createjs.Text("💰"+GoldScore, '20px Josefin Sans', '#FF0');
    text.x = 10;
    text.y = 750;
    stage.addChild(text);
	var text = new createjs.Text("lvl:"+dificult/0.05, '20px Josefin Sans', '#FFF');
    text.x = 10;
    text.y = 770;
    stage.addChild(text);
}

/* Equipe e sub itens */

function equipe() {
    bgEquipe = new createjs.Bitmap(sonGoqueue.getResult("bgEquipe"));
    bgEquipe.x = 0;
    bgEquipe.y = 0;
    bgEquipe.alpha = 0;
    inMenu = false;
    stage.addChild(bgEquipe);
    createjs.Tween.get(bgEquipe).to({
        alpha: 1
    }, 600);
    var showTxt = new createjs.Text("Projeto Cuida Mundo desenvolvido pela Equipe Equilibrium. ",'20px Josefin Sans', '#fff');
    showTxt.x = 300;
    showTxt.y = 800;
    showTxt.lineWidth = 670;
    showTxt.lineHeight = 22;
    stage.addChild(showTxt);
    createjs.Tween.get(showTxt).to({
        y: 355
    }, 1000); //, createjs.Ease.quadInOut);
    subMenu2();
    btVoltarAdd();
}
function monitores() {
    
    bgEquipe = new createjs.Bitmap(sonGoqueue.getResult("bgEquipe"));
    bgEquipe.x = 0;
    bgEquipe.y = 0;
    bgEquipe.alpha = 0;
    inMenu = false;
    stage.addChild(bgEquipe);
    createjs.Tween.get(bgEquipe).to({
        alpha: 1
    }, 600);
    subMenu2();
    btnMonitores = new createjs.Bitmap(sonGoqueue.getResult("btnMonitores2"));
    btnMonitores.x = 855;
    btnMonitores.y = 185;
    stage.addChild(btnMonitores);
    
    btVoltarAdd();
    hideTabelaDevs();
    showTabelaMoni();
    hideTabelaOrient();
}

function orientadores() {
    bgEquipe = new createjs.Bitmap(sonGoqueue.getResult("bgEquipe"));
    bgEquipe.x = 0;
    bgEquipe.y = 0;
    bgEquipe.alpha = 0;
    inMenu = false;
    stage.addChild(bgEquipe);
    createjs.Tween.get(bgEquipe).to({
        alpha: 1
    }, 600);
    subMenu2();
    btnOrientadores = new createjs.Bitmap(sonGoqueue.getResult("btnOrientadores2"));
    btnOrientadores.x = 429;
    btnOrientadores.y = 185;
    stage.addChild(btnOrientadores);
    hideTabelaDevs();
    hideTabelaMoni();
    showTabelaOrient();
    
    btVoltarAdd();
}

function desenvolvedores() {
    bgEquipe = new createjs.Bitmap(sonGoqueue.getResult("bgEquipe"));
    bgEquipe.x = 0;
    bgEquipe.y = 0;
    bgEquipe.alpha = 0;
    inMenu = false;
    stage.addChild(bgEquipe);
    createjs.Tween.get(bgEquipe).to({
        alpha: 1
    }, 600);
    subMenu2();
    btnDesenvolvedores = new createjs.Bitmap(sonGoqueue.getResult("btnDesenvolvedores2"));
    btnDesenvolvedores.x = 0;
    btnDesenvolvedores.y = 185;
    stage.addChild(btnDesenvolvedores);
    
    showTabelaDevs();
    hideTabelaMoni();
    hideTabelaOrient();
    
    btVoltarAdd();
}

/* Ecopontos e sub itens */
function subMenu() {
    inSubMenu = true;
    btnConheca = new createjs.Bitmap(sonGoqueue.getResult("btnConheca"));
    btnParticipar = new createjs.Bitmap(sonGoqueue.getResult("btnParticipar"));
    btnCreditos = new createjs.Bitmap(sonGoqueue.getResult("btnCreditos"));
    //posicionamento dos botoes
    btnConheca.x = 0;
    btnConheca.y = 185;
    btnParticipar.x = 429;
    btnParticipar.y = 185;
    btnCreditos.x = 855;
    btnCreditos.y = 185;
    //fadeIn
    btnConheca.alpha = 0;
    btnParticipar.alpha = 0;
    btnCreditos.alpha = 0;
    //adicionando os botões
    stage.addChild(btnConheca);
    stage.addChild(btnParticipar);
    stage.addChild(btnCreditos);
    createjs.Tween.get(btnConheca).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnParticipar).to({
        alpha: 1
    }, 600);
    createjs.Tween.get(btnCreditos).to({
        alpha: 1
    }, 600);
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
    btnConheca = new createjs.Bitmap(sonGoqueue.getResult("btnConheca2"));
    btnConheca.x = 0;
    btnConheca.y = 185;
    stage.addChild(btnConheca);
    
    hideTabela();
    
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
    btnParticipar = new createjs.Bitmap(sonGoqueue.getResult("btnParticipar2"));
    btnParticipar.x = 429;
    btnParticipar.y = 185;
    stage.addChild(btnParticipar);
    hideTabela();
    
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
    btnCreditos = new createjs.Bitmap(sonGoqueue.getResult("btnCreditos2"));
    btnCreditos.x = 855;
    btnCreditos.y = 185;
    stage.addChild(btnCreditos);
    
    btVoltarAdd();
    showTabela(); 
}

