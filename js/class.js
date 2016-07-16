//Save:
var faseAtual = [];
var GreenScore = 0;
var GoldScore = 0;
var dificult = 0.05;
var archivement = [false];
var equi;
var SAVE = {};

function Save() {
    SAVE.GreenScore = GreenScore;
    SAVE.GoldScore = GoldScore;
    SAVE.dificult = dificult;
    SAVE.archivement = archivement;
    localStorage.setItem('SAVE', JSON.stringify(SAVE));
}

function Wipe() {
    localStorage.removeItem('SAVE');
}

// Comum ao jogo e ao menu:
var stage = new createjs.Stage("defaultCanvas0");
var sonGoqueue = new createjs.LoadQueue(false);
var inGame = false;
var inMenu = true;
var inSubMenu = false;
var inSubMenu2 = false;
var inSubOptions = false;
var offsetX = 0;
var offsetY = 0;
var telaOffset;

var soundMenu;
var soundFase;

function loadSound() {
    createjs.Sound.registerSound("sons/som-menu.mp3", "guitar");
    createjs.Sound.registerSound("sons/som-fase.mp3", "piano");

    var configs = new createjs.PlayPropsConfig().set({
        interrupt: createjs.Sound.INTERRUPT_ANY,
        loop: -1,
        volume: 0.5
    });

    soundMenu = createjs.Sound.play("guitar", configs);
    soundFase = createjs.Sound.play("piano", configs);
}

window.onload = function() {

    if (localStorage.getItem('SAVE') !== null) {
        SAVE = JSON.parse(localStorage.getItem('SAVE'));
        GreenScore = SAVE.GreenScore;
        GoldScore = SAVE.GoldScore;
        dificult = SAVE.dificult;
        archivement = SAVE.archivement;
    }

    main();
    loadSound();

    //jogando as funções de cada botão
    stage.canvas.addEventListener("click", function(e) {
        var canvasX = document.getElementById("defaultCanvas0").offsetLeft;
        var canvasY = document.getElementById("defaultCanvas0").offsetTop;
        telaOffset = document.getElementById("defaultCanvas0").offsetLeft;

        var clickX = e.clientX - canvasX;
        var clickY = e.clientY - canvasY;
        if (inMenu) {
            if (dist(clickX, clickY, btnEco.x + 32, btnEco.y + 32) < 32) {
                eco();
            } else if (dist(clickX, clickY, btnEquipe.x + 32, btnEquipe.y + 32) < 32) {
                equipe();
            } else if (dist(clickX, clickY, btnOpcoes.x + 32, btnOpcoes.y + 32) < 32) {
                options();
            } else if (dist(clickX, clickY, btnPlay.x + 67, btnPlay.y + 67) < 67) {
				if (!archivement[0]) {
					introducao();
				} else {
					Mapa();
				}
            }
        }
        if (inSubMenu) {
            if (clickX > btnConheca.x && clickX < btnConheca.x + btnConheca.getBounds().width && clickY > btnConheca.y && clickY < btnConheca.y + btnConheca.getBounds().height) {
                conheca();
            } else if (clickX > btnParticipar.x && clickX < btnParticipar.x + btnParticipar.getBounds().width && clickY > btnParticipar.y && clickY < btnParticipar.y + btnParticipar.getBounds().height) {
                participe();
            } else if (clickX > btnCreditos.x && clickX < btnCreditos.x + btnCreditos.getBounds().width && clickY > btnCreditos.y && clickY < btnCreditos.y + btnCreditos.getBounds().height) {
                materiais();
            }
        }

        if (inSubMenu2) {
            if (clickX > btnDesenvolvedores.x && clickX < btnDesenvolvedores.x + btnDesenvolvedores.getBounds().width && clickY > btnDesenvolvedores.y && clickY < btnDesenvolvedores.y + btnDesenvolvedores.getBounds().height) {
                desenvolvedores();
            } else if (clickX > btnMonitores.x && clickX < btnMonitores.x + btnMonitores.getBounds().width && clickY > btnMonitores.y && clickY < btnMonitores.y + btnMonitores.getBounds().height) {
                monitores();
            } else if (clickX > btnOrientadores.x && clickX < btnOrientadores.x + btnOrientadores.getBounds().width && clickY > btnOrientadores.y && clickY < btnOrientadores.y + btnOrientadores.getBounds().height) {
                orientadores();
            }
        }

        if (inSubOptions) {
            if (clickX > btnInstrucoes.x && clickX < btnInstrucoes.x + btnInstrucoes.getBounds().width && clickY > btnInstrucoes.y && clickY < btnInstrucoes.y + btnInstrucoes.getBounds().height) {
                instrucoes();
            } else if (clickX > btnSons.x && clickX < btnSons.x + btnSons.getBounds().width && clickY > btnSons.y && clickY < btnSons.y + btnSons.getBounds().height) {
                sons();
            }
        }
    });
    //jogo
    $(".scores").hide();
    $(".navegacao").hide();
    lixoC = document.getElementById("bt-lixo1").getElementsByTagName("strong")[0];
    lixoT = document.getElementById("bt-lixo1").getElementsByTagName("span")[0];
}

function loading(e) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("#00FF7F").drawCircle(0, 0, 755 * e.progress);
    circle.x = 640;
    circle.y = 400;
    stage.addChild(circle);
    stage.update();
}

function main() {
    stage = new createjs.Stage("defaultCanvas0");
    stage.canvas.width = 1280;
    stage.canvas.height = 800;

    introVideo = new createjs.DOMElement(document.getElementById("video"));
    introVideo.visible = false;
    stage.addChild(introVideo);

    tabela = new createjs.DOMElement(document.getElementById("tabela"));
    tabela.visible = false;
    stage.addChild(tabela);


    tabelaDevs = new createjs.DOMElement(document.getElementById("tabelaDevs"));
    tabelaDevs.visible = false;
    stage.addChild(tabelaDevs);

    tabelaMoni = new createjs.DOMElement(document.getElementById("tabelaMoni"));
    tabelaMoni.visible = false;
    stage.addChild(tabelaMoni);

    tabelaOrient = new createjs.DOMElement(document.getElementById("tabelaOrient"));
    tabelaOrient.visible = false;
    stage.addChild(tabelaOrient);

    // Preload     
    sonGoqueue.on("complete", setupMenu, this);
    sonGoqueue.on("progress", loading, this);
    sonGoqueue.loadManifest([{
        id: "btnEco",
        src: "img/btnEco.png"
    }, {
        id: "btnPlay",
        src: "img/btnPlay.png"
    }, {
        id: "btnOpcoes",
        src: "img/btnOpcoes.png"
    }, {
        id: "btnEquipe",
        src: "img/btnEquipe.png"
    }, {
        id: "btnConheca",
        src: "img/opcao-conheca.png"
    }, {
        id: "btnConheca2",
        src: "img/opcao-conheca2.png"
    }, {
        id: "btnInstrucoes",
        src: "img/opcao-instrucoes.png"
    }, {
        id: "btnInstrucoes2",
        src: "img/opcao-instrucoes2.png"
    }, {
        id: "instrucoesBg",
        src: "img/instrucoes-bg.png"
    }, {
        id: "btnSons",
        src: "img/opcao-sons.png"
    }, {
        id: "btnSons2",
        src: "img/opcao-sons2.png"
    }, {
        id: "som-on",
        src: "img/som-on.png"
    }, {
        id: "som-off",
        src: "img/som-off.png"
    }, {
        id: "btnParticipar",
        src: "img/opcao-participar.png"
    }, {
        id: "btnParticipar2",
        src: "img/opcao-participar2.png"
    }, {
        id: "btnCreditos",
        src: "img/opcao-creditos.png"
    }, {
        id: "btnCreditos2",
        src: "img/opcao-creditos2.png"
    }, {
        id: "btnDesenvolvedores",
        src: "img/opcao-desenvolvedores.png"
    }, {
        id: "btnDesenvolvedores2",
        src: "img/opcao-desenvolvedores.png"
    }, {
        id: "btnOrientadores",
        src: "img/opcao-orientadores.png"
    }, {
        id: "btnOrientadores2",
        src: "img/opcao-orientadores2.png"
    }, {
        id: "btnMonitores",
        src: "img/opcao-monitores.png"
    }, {
        id: "btnMonitores2",
        src: "img/opcao-monitores2.png"
    }, {
        id: "menuBG",
        src: "img/menuBG.jpg"
    }, {
        id: "Ecopontos",
        src: "img/Ecopontos  background.png"
    }, {
        id: "bgPlay",
        src: "img/bgPlay.png"
    }, {
        id: "bgMapa",
        src: "img/bgMapa.png"
    }, {
        id: "bgOverlay",
        src: "img/bg-overlay.png"
    }, {
        id: "btMapa",
        src: "img/bt-mapa.png"
    }, {
        id: "bg-tabela",
        src: "img/tabela.png"
    }, {
        id: "bgMais",
        src: "img/bgMais.jpg"
    }, {
        id: "bgEco",
        src: "img/bgEco.jpg"
    }, {
        id: "bgEquipe",
        src: "img/bgEquipe.jpg"
    }, {
        id: "bgOpcoes",
        src: "img/bgOpcoes.jpg"
    }, {
        id: "btVoltar",
        src: "img/btVoltar.png"
    }, {
        id: "btSkip",
        src: "img/bt-skip.png"
    }, {
        id: "lixo0",
        src: "img/bateria.png"
    }, {
        id: "lixo1",
        src: "img/Garrafa PET deitada direita.png"
    }, {
        id: "lixo2",
        src: "img/Garrafa PET deitada esquerda.png"
    }, {
        id: "lixo3",
        src: "img/Garrafa PET em pé.png"
    }, {
        id: "lixo4",
        src: "img/Garrafa vidro cinza deitada.png"
    }, {
        id: "lixo5",
        src: "img/Garrafa cinza verde em pé.png"
    }, {
        id: "lixo6",
        src: "img/Garrafa vidro verde deitada direita.png"
    }, {
        id: "lixo7",
        src: "img/Garrafa vidro verde deitada.png"
    }, {
        id: "lixo8",
        src: "img/Garrafa vidro verde em pé.png"
    }, {
        id: "lixo9",
        src: "img/Lata deitada para a direita.png"
    }, {
        id: "lixo10",
        src: "img/Lata deitada.png"
    }, {
        id: "lixo11",
        src: "img/Lata em pé.png"
    }, {
        id: "lixo12",
        src: "img/Papel.png"
    }, {
        id: "lixo13",
        src: "img/Caixa papelão direita.png"
    }, {
        id: "lixo14",
        src: "img/Caixa papelão esquerda.png"
    }, {
        id: "lixo15",
        src: "img/Caixa de leite.png"
    }, {
        id: "floor0",
        src: "img/floor0.png"
    }, {
        id: "floor1",
        src: "img/floor1.png"
    }, {
        id: "floor-casa",
        src: "img/floor-casa.png"
    }, {
        id: "wall0",
        src: "img/wall0.png"
    }, {
        id: "wall1",
        src: "img/wall1.png"
    }, {
        id: "wall2",
        src: "img/wall2.png"
    }, {
        id: "wall3",
        src: "img/wall3.png"
    }, {
        id: "wall4",
        src: "img/wall4.png"
    }, {
        id: "wall-casa",
        src: "img/wall-casa.png"
    }, {
        id: "wall-casa2",
        src: "img/wall-casa2.png"
    }, {
        id: "wall-casa3",
        src: "img/wall-casa3.png"
    }, {
        id: "wall-balcao",
        src: "img/wall-balcao.png"
    }, {
        id: "stairs",
        src: "img/stairs.png"
    }, {
        id: "wall-cama",
        src: "img/tile-cama.png"
    }, {
        id: "wall-banco",
        src: "img/banco.png"
    }, {
        id: "wall-sofa",
        src: "img/sofa.png"
    }, {
        id: "wall-mesa",
        src: "img/mesa.png"
    }, {
        id: "stair0",
        src: "img/stair0.png"
    }, {
        id: "floor-areiaD0",
        src: "img/Tile Areia Escura 1.png"
    }, {
        id: "floor-areiaD1",
        src: "img/Tile Areia Escura 2.png"
    }, {
        id: "floor-areiaD2",
        src: "img/Tile Areia Escura 3.png"
    }, {
        id: "floor-areiaD3",
        src: "img/Tile Areia Escura 4.png"
    }, {
        id: "mar-areiaE0",
        src: "img/Tile Espuma 1.png"
    }, {
        id: "mar-areiaE1",
        src: "img/Tile Espuma 2.png"
    }, {
        id: "mar-areiaE2",
        src: "img/Tile Espuma 3.png"
    }, {
        id: "mar-areiaE3",
        src: "img/Tile Espuma 4.png"
    }, {
        id: "mar-areiaM0",
        src: "img/Tile mar 1.png"
    }, {
        id: "mar-areiaM1",
        src: "img/Tile mar 2.png"
    }, {
        id: "mar-areiaM2",
        src: "img/Tile mar 3.png"
    }, {
        id: "mar-areiaM3",
        src: "img/Tile mar 4.png"
    }, {
        id: "floor-areia",
        src: "img/Tile Areia.png"
    }, {
        id: "mar0",
        src: "img/Tile mar.png"
    }, {
        id: "wall-barraca",
        src: "img/Tile praia - barraca.png"
    }, {
        id: "wall-bPalha",
        src: "img/Tile praia - barraca de palha.png"
    }, {
        id: "wall-cabana1",
        src: "img/Tile Cabana 1.png"
    }, {
        id: "wall-cabana2",
        src: "img/Tile Cabana 2.png"
    }, {
        id: "wall-coqueiro",
        src: "img/Tile Praia - Coqueiro.png"
    }, {
        id: "wall-vaso",
        src: "img/Tile Escola - vaso.png"
    }, {
        id: "sprite",
        src: "img/sprite.png"
    }]);
}
createjs.Ticker.addEventListener("tick", draw);

function draw() {
    stage.update();
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
// Usado pro jogo
var tSize;

function treesholdX(y, x) {
    return Math.floor(640 - tSize / 2 * x + tSize / 2 * y) + offsetX;
}

function treesholdY(y, x, z) {
    return Math.floor(tSize + tSize / 4 * x + tSize / 4 * y - z * tSize / 2) + offsetY;
}

function Boneco() {
    this.x = 12;
    this.y = 12;
    this.z = 1;
    this.lixo = [
        [],
        [],
        []
    ];
    //animacao    
    var spritePersonagem = new createjs.SpriteSheet({
        images: [sonGoqueue.getResult("sprite")],
        frames: {
            width: 64,
            height: 97
        },
        animations: {
            "idleD": 0,
            "down": [1, 4, "idleD", 1],
            "idleL": 5,
            "left": [6, 9, "idleL", 1],
            "idleR": 10,
            "right": [11, 14, "idleR", 1],
            "idleU": 15,
            "up": [16, 19, "idleU", 1]
        }
    });
    this.sprite = new createjs.Sprite(spritePersonagem, "idleD");
    this.up = function() {
        if (this.y > 0 && faseAtual[faseIndex].tiles[this.x][this.y - 1][this.z - 1].tType == "floor" && faseAtual[faseIndex].tiles[this.x][this.y - 1][this.z].tType != "wall") {
            this.y--;
        }
        this.tween();
    }
    this.down = function() {
        if (this.y < 23 && faseAtual[faseIndex].tiles[this.x][this.y + 1][this.z - 1].tType == "floor" && faseAtual[faseIndex].tiles[this.x][this.y + 1][this.z].tType != "wall") {
            this.y++;
        }
        this.tween();
    }
    this.left = function() {
        if (this.x > 0 && faseAtual[faseIndex].tiles[this.x - 1][this.y][this.z - 1].tType == "floor" && faseAtual[faseIndex].tiles[this.x - 1][this.y][this.z].tType != "wall") {
            this.x--;
        }
        if (this.x > 0 && faseAtual[faseIndex].tiles[this.x - 1][this.y][this.z].tType == "stair") {
            this.x--;
            this.z++;
        }
        this.tween();
    }
    this.right = function() {
        if (this.x < 23 && faseAtual[faseIndex].tiles[this.x + 1][this.y][this.z - 1].tType == "floor" && faseAtual[faseIndex].tiles[this.x + 1][this.y][this.z].tType != "wall") {
            this.x++;
        }
        if (this.x < 23 && faseAtual[faseIndex].tiles[this.x + 1][this.y][this.z - 1].tType == "stair") {
            this.x++;
            this.z--;
        }
        this.tween();
    }
    this.tween = function() {
        createjs.Tween.get(this.sprite, {
            loop: false
        }).to({
            x: treesholdX(this.x, this.y),
            y: treesholdY(this.x, this.y, this.z + 1.5)
        }, 150, createjs.Ease.getPowInOut(2)).call(faseAtual[faseIndex].update());
    }
    this.action = function() {
        if (faseAtual[faseIndex].tiles[this.x][this.y][this.z].tType == "lixo") {
            this.lixo[faseIndex].push(faseAtual[faseIndex].tiles[this.x][this.y][this.z].tId);
            stage.removeChild(faseAtual[faseIndex].tiles[this.x][this.y][this.z].img);
            faseAtual[faseIndex].tiles[this.x][this.y][this.z] = new Tile("void", 0, x, y, z);
            this.score();
            GreenScore += 5;
        }
    }
    this.score = function() {
        lixoC.innerHTML = this.lixo[faseIndex].length;
    }
}

function ButtonHandler() {
    this.up = function() {
        equi.up();
        equi.sprite.gotoAndPlay("up");
    }
    this.down = function() {
        equi.down();
        equi.sprite.gotoAndPlay("down");
    }
    this.left = function() {
        equi.left();
        equi.sprite.gotoAndPlay("left");
    }
    this.right = function() {
        equi.right();
        equi.sprite.gotoAndPlay("right");
    }
    this.action = function() {
        equi.action();
    }
}

function Tile(type, id, x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.tType = type;
    this.tId = id;
    if (this.tType == "void") {
        this.tId = 0;
    } else {
        this.img = new createjs.Bitmap(sonGoqueue.getResult(this.tType + this.tId));
        this.img.x = treesholdX(x, y);
        this.img.y = treesholdY(x, y, z);
    }
}

function Fase(fase, create, ratio) {
    this.tiles = [];
    this.equiX;
    this.equiY;
    this.equiZ;
    this.total = 0;
    this.type = fase;
    if (ratio === undefined) {
        this.ratio = 0.5;
    } else {
        this.ratio = ratio;
    }
    if (!create) {
        //Cria a Matriz de espaços vazios
        for (x = 0; x < 24; x++) {
            this.tiles[x] = [];
            for (y = 0; y < 24; y++) {
                this.tiles[x][y] = [];
                for (z = 0; z < 7; z++) {
                    this.tiles[x][y][z] = new Tile("void", 0, x, y, z);
                }
            }
        }
        switch (fase) {
            //Fase da casa
            case "casa":
                rushBeach = 900 + dificult * 900;
                this.equiX = 15;
                this.equiY = 15;
                this.equiZ = 1;
                for (x = 0; x < 3; x++) {
                    for (y = 5; y < 9; y++) {
                        this.tiles[x][y][4] = new Tile("floor", "-casa", x, y, 4);
                    }
                }
                for (y = 5; y < 13; y++) {
                    this.tiles[3][y][4] = new Tile("floor", "-casa", 3, y, 4);
                }
                for (x = 4; x < 7; x++) {
                    for (y = 3; y < 13; y++) {
                        this.tiles[x][y][4] = new Tile("floor", "-casa", x, y, 4);
                    }
                }
                this.tiles[7][7][4] = new Tile("stair", "s", 7, 8.5, 4.7);
                this.tiles[8][7][3] = new Tile("stair", 7, 8, 7, 3);
                this.tiles[9][7][2] = new Tile("stair", 7, 9, 7, 2);
                this.tiles[10][7][1] = new Tile("stair", 7, 10, 7, 1);
                this.tiles[11][7][0] = new Tile("stair", 7, 11, 7, 0);
                for (x = 11; x < 21; x++) {
                    for (y = 1; y < 19; y++) {
                        this.tiles[x][y][0] = new Tile("floor", "-casa", x, y, 0);
                    }
                }
                //para consertar do topo
                for (y = 5; y < 7; y++) {
                    this.tiles[0][y][5] = new Tile("wall", "-casa2", 0 - 0.2, y, 5);
                    this.tiles[0][y][6] = new Tile("wall", "-casa2", 0 - 0.2, y, 6);
                }
                for (x = 0; x < 4; x++) {
                    this.tiles[x][4][5] = new Tile("wall", "-casa", x, 4 + 0.25, 5);
                    this.tiles[x][4][6] = new Tile("wall", "-casa", x, 4 + 0.25, 6);
                }
                for (y = 3; y < 5; y++) {
                    this.tiles[4][y][5] = new Tile("wall", "-casa2", 4 - 0.3, y, 5);
                    this.tiles[4][y][6] = new Tile("wall", "-casa2", 4 - 0.3, y, 6);
                }
                for (x = 4; x < 7; x++) {
                    this.tiles[x][2][4] = new Tile("wall", "-casa", x, 2 + 0.25, 4);
                    this.tiles[x][2][5] = new Tile("wall", "-casa", x, 2 + 0.25, 5);
                    this.tiles[x][2][6] = new Tile("wall", "-casa", x, 2 + 0.25, 6);
                }
                for (y = 9; y < 13; y++) {
                    this.tiles[3][y][5] = new Tile("wall", "-casa2", 3 - 0.25, y, 5);
                    this.tiles[3][y][6] = new Tile("wall", "-casa2", 3 - 0.25, y, 6);
                }

                //cama
                //            this.tiles[1][6][6] = new Tile("wall", "-cama", 1, 6, 6);

                //banco
                //            for(y = 6; y < 7; y++){
                //                this.tiles[12][y][1] = new Tile("wall", "-sofa", 12+0.2, y, 1);
                //            }

                //mesa
                this.tiles[18][2][1] = new Tile("wall", "-mesa", 18, 2, 1);

                //mesa
                this.tiles[16][16][1] = new Tile("wall", "-mesa", 16, 16, 1);

                //para consertar
                for (x = 11; x < 16; x++) {
                    this.tiles[x][2][1] = new Tile("wall", "-casa", x, 2 + 0.25, 1);
                    this.tiles[x][2][2] = new Tile("wall", "-casa", x, 2 + 0.25, 2);
                }
                for (y = 1; y < 3; y++) {
                    this.tiles[16][y][1] = new Tile("wall", "-casa2", 16 - 0.3, y, 1);
                    this.tiles[16][y][2] = new Tile("wall", "-casa2", 16 - 0.3, y, 2);
                }
                for (x = 16; x < 21; x++) {
                    this.tiles[x][0][1] = new Tile("wall", "-casa", x - 0.05, 0 + 0.25, 1);
                    this.tiles[x][0][2] = new Tile("wall", "-casa", x - 0.05, 0 + 0.25, 2);
                }


                //parede do meio   
                for (y = 10; y < 13; y++) {
                    this.tiles[14][y][1] = new Tile("wall", "-casa3", 14 + 0.28, y, 1);
                    this.tiles[14][y][2] = new Tile("wall", "-casa3", 14 + 0.28, y, 2);
                }
                for (x = 11; x < 15; x++) {
                    this.tiles[x][12][1] = new Tile("wall", "-casa", x, 12 - 0.3, 1);
                    this.tiles[x][12][2] = new Tile("wall", "-casa", x, 12 - 0.3, 2);
                }
                for (x = 16; x < 20; x++) {
                    this.tiles[x][10][1] = new Tile("wall", "-casa", x, 10 - 0.5, 1);
                    this.tiles[x][10][2] = new Tile("wall", "-casa", x, 10 - 0.5, 2);
                }
                for (y = 11; y < 14; y++) {
                    this.tiles[17][y][1] = new Tile("wall", "-casa2", 17, y - 0.75, 1);
                    this.tiles[17][y][2] = new Tile("wall", "-casa2", 17, y - 0.75, 2);
                }


                //area balcao
                for (y = 18; y < 19; y++) {
                    this.tiles[13][y][1] = new Tile("wall", "-casa2", 13 - 0.25, y, 1);
                    this.tiles[13][y][2] = new Tile("wall", "-casa2", 13 - 0.25, y, 2);
                }
                for (y = 17; y < 18; y++) {
                    this.tiles[12][y][1] = new Tile("wall", "-casa3", 12 + 0.28, y, 1);
                    this.tiles[12][y][2] = new Tile("wall", "-casa3", 12 + 0.28, y, 2);
                }
                for (x = 11; x < 16; x++) {
                    for (y = 1; y < 3; y++) {
                        this.tiles[x][y][0] = new Tile("void", 0, x, y, 0);
                    }
                }
                for (y = 5; y < 19; y++) {
                    this.tiles[20][y][0] = new Tile("void", 0, 20, y, 0);
                }
                for (y = 14; y < 19; y++) {
                    this.tiles[19][y][0] = new Tile("void", 0, 19, y, 0);
                }
                for (x = 11; x < 13; x++) {
                    for (y = 17; y < 21; y++) {
                        this.tiles[x][y][0] = new Tile("void", 0, x, y, 0);
                    }
                }
                break;
                //Fase da Escola!
            case "escola":
                rushBeach = 900 + dificult * 900;
                this.equiX = 13;
                this.equiY = 13;
                this.equiZ = 1;
                for (x = 0; x < 18; x++) {
                    for (y = 0; y < 6; y++) {
                        this.tiles[x][y][0] = new Tile("floor", 0, x, y, 0);
                    }
                }
                this.tiles[17][5][1] = new Tile("wall", "-vaso", 17, 5, 3);
                for (x = 3; x < 9; x++) {
                    for (y = 2; y < 4; y++) {
                        this.tiles[x][y][0] = new Tile("floor", 1, x, y, 0);
                    }
                }
                for (x = 10; x < 15; x++) {
                    for (y = 6; y < 9; y++) {
                        this.tiles[x][y][0] = new Tile("floor", 0, x, y, 0);
                    }
                }
                for (x = 8; x < 18; x++) {
                    for (y = 9; y < 17; y++) {
                        this.tiles[x][y][0] = new Tile("floor", 0, x, y, 0);
                    }
                }
                for (x = 9; x < 17; x++) {
                    for (y = 10; y < 16; y++) {
                        this.tiles[x][y][0] = new Tile("floor", 1, x, y, 0);
                    }
                }
                this.tiles[17][16][1] = new Tile("wall", "-vaso", 17, 16, 3);
                for (x = 0; x < 7; x++) {
                    for (y = 9; y < 20; y++) {
                        this.tiles[x][y][1] = new Tile("floor", 0, x, y, 1);
                    }
                }
                for (y = 9; y < 20; y++) {
                    this.tiles[0][y][2] = new Tile("wall", 1, 0, y, 2);
                    this.tiles[0][y][3] = new Tile("wall", 1, 0, y, 3);
                }
                this.tiles[0][12][3] = new Tile("wall", 4, -0.5, 11.8, 3);
                this.tiles[0][14][3] = new Tile("wall", 4, -0.5, 13.8, 3);
                this.tiles[0][16][3] = new Tile("wall", 4, -0.5, 15.8, 3);
                this.tiles[7][15][1] = new Tile("stair", 0, 7, 15, 1);
                break;
                //Praia!
            case "praia":
                rushBeach = 600 + dificult * 600;
                this.equiX = 13;
                this.equiY = 13;
                this.equiZ = 1;
                for (x = 0; x < 13; x++) {
                    for (y = 0; y < 18; y++) {
                        this.tiles[x][y][0] = new Tile("floor", "-areia", x, y, 0);
                    }
                }
                for (y = 0; y < 18; y++) {
                    this.tiles[13][y][0] = new Tile("floor", "-areiaD" + (4 - (y % 4) - 1), 13, y, 0);
                    this.tiles[14][y][0] = new Tile("mar", "-areiaE" + (4 - (y % 4) - 1), 14, y, 0);
                    this.tiles[15][y][0] = new Tile("mar", "-areiaM" + (4 - (y % 4) - 1), 15, y, 0);
                }
                for (x = 16; x < 18; x++) {
                    for (y = 0; y < 18; y++) {
                        this.tiles[x][y][0] = new Tile("mar", 0, x, y, 0);
                    }
                }
                this.tiles[0][1][1] = new Tile("wall", "-coqueiro", 0, 1, 1);
                this.tiles[0][3][1] = new Tile("wall", "-coqueiro", 0, 3, 1);
                this.tiles[0][5][1] = new Tile("wall", "-coqueiro", 0, 5, 1);
                this.tiles[0][10][1] = new Tile("wall", "-coqueiro", 0, 10, 1);
                this.tiles[0][12][1] = new Tile("wall", "-coqueiro", 0, 12, 1);
                this.tiles[0][14][1] = new Tile("wall", "-coqueiro", 0, 14, 1);
                this.tiles[0][6][1] = new Tile("wall", "-cabana2", 0, 6, 0.5);
                this.tiles[0][9][1] = new Tile("wall", "-cabana2", 0, 9, 0.5);
                this.tiles[0][6][2] = new Tile("wall", "-cabana1", 0, 6, 2);
                this.tiles[0][9][2] = new Tile("wall", "-cabana1", 0, 9, 2);
                this.tiles[3][1][1] = new Tile("wall", "-barraca", 3, 1, 1);
                this.tiles[3][3][1] = new Tile("wall", "-barraca", 3, 3, 1);
                this.tiles[3][5][1] = new Tile("wall", "-barraca", 3, 5, 1);
                this.tiles[3][10][1] = new Tile("wall", "-barraca", 3, 10, 1);
                this.tiles[3][12][1] = new Tile("wall", "-barraca", 3, 12, 1);
                this.tiles[3][14][1] = new Tile("wall", "-barraca", 3, 14, 1);
                this.tiles[6][1][1] = new Tile("wall", "-bPalha", 6, 1, 1);
                this.tiles[6][3][1] = new Tile("wall", "-bPalha", 6, 3, 1);
                this.tiles[6][5][1] = new Tile("wall", "-bPalha", 6, 5, 1);
                this.tiles[6][10][1] = new Tile("wall", "-bPalha", 6, 10, 1);
                this.tiles[6][12][1] = new Tile("wall", "-bPalha", 6, 12, 1);
                this.tiles[6][14][1] = new Tile("wall", "-bPalha", 6, 14, 1);
                break;
                //Fase quadradinha de teste
            default:
                rushBeach = 100 + dificult * 100;
                this.equiX = 13;
                this.equiY = 13;
                this.equiZ = 1;
                for (x = 10; x < 20; x++) {
                    for (y = 10; y < 20; y++) {
                        if (x != 16 || y != 16) {
                            this.tiles[x][y][0] = new Tile("floor", 0, x, y, 0);
                            if (!(y != 12 || x == 15)) {
                                this.tiles[x][y][1] = new Tile("wall", 3, x, y, 1);
                            }
                        }
                    }
                }
                break;
        }
        //Cria os Lixos
        for (x = 0; x < 24; x++) {
            for (y = 0; y < 24; y++) {
                for (z = 0; z < 6; z++) {
                    if (this.tiles[x][y][z].tType == "floor" && this.tiles[x][y][z + 1].tType == "void") {
                        if (Math.random() < this.ratio) {
                            this.tiles[x][y][z + 1] = new Tile("lixo", Math.floor(Math.random() * 16), x, y, z + 1);
                            this.total++;
                        }
                    }
                }
            }
        }
    }
    this.load = function() {
        if (this.total != 0) {
            stage.removeChild(btVoltar);
            createjs.Ticker.addEventListener("tick", beachRush);
        }
        equi.x = this.equiX;
        equi.y = this.equiY;
        equi.z = this.equiZ;
        this.update();
    }
    this.update = function() {
        for (x = 0; x < 24; x++) {
            for (y = 0; y < 24; y++) {
                for (z = 0; z < 7; z++) {
                    if (equi.x == x && equi.y == y) {
                        stage.addChild(equi.sprite);
                    }
                    stage.addChild(this.tiles[x][y][z].img);
                }
            }
        }
    }
}

function Sep(id) {
    this.sId = id;
    switch (this.sId) {
        case 0:
            this.sType = "Bateria";
            break;
        case 1:
        case 2:
        case 3:
            this.sType = "Plastico";
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            this.sType = "Vidro";
            break;
        case 9:
        case 10:
        case 11:
            this.sType = "Metal";
            break;
        case 12:
        case 13:
        case 14:
            this.sType = "Papel";
            break;
        case 15:
            this.sType = "Tetrapak";
            break;
    }
    this.img = new createjs.Bitmap(sonGoqueue.getResult("lixo" + this.sId));
    this.img.scaleX = 2;
    this.img.scaleY = 2;
    stage.addChild(this.img);
    this.img.x = Math.random() * 100;
    this.img.y = Math.random() * 700;
    this.img.id = id;
    this.img.on("pressmove", function(evt) {
        evt.target.x = evt.stageX - tSize;
        evt.target.y = evt.stageY - tSize;
    });
    this.img.on("pressup", checkSeparar)
}