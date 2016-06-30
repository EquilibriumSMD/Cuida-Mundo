// Comum ao jogo e ao menu:
var stage = new createjs.Stage("defaultCanvas0");
var sonGoqueue = new createjs.LoadQueue(false);
var inGame = false;
var inMenu = true;

window.onload = function() {
    main();

    //jogando as funções de cada botão
    stage.canvas.addEventListener("click", function(e) {
        var canvasX = document.getElementById("defaultCanvas0").offsetLeft;
        var canvasY = document.getElementById("defaultCanvas0").offsetTop;
        var clickX = e.clientX - canvasX;
        var clickY = e.clientY - canvasY;

        if (inMenu) {
            if (dist(clickX, clickY, btnEco.x + 32, btnEco.y + 32) < 32) {
                eco();
            } else if (dist(clickX, clickY, btnMais.x + 32, btnMais.y + 32) < 32) {
                mais();
            } else if (dist(clickX, clickY, btnPlay.x + 67, btnPlay.y + 67) < 67) {
                play();
            }
        }
        if (dist(clickX, clickY, btnSobre.x + 32, btnSobre.y + 32) < 32) {
            eco();
        } else if (dist(clickX, clickY, btnParticipar.x + 32, btnParticipar.y + 32) < 32) {
            mais();
        } else if (dist(clickX, clickY, btnCreditos.x + 67, btnCreditos.y + 67) < 67) {
            play();
        }
        
    });
    //jogo
    buttonUp = document.getElementById("bt-Top");
    buttonDown = document.getElementById("bt-Bottom");
    buttonLeft = document.getElementById("bt-Left");
    buttonRight = document.getElementById("bt-Right");
    buttonAction = document.getElementById("bt-Coletar");
    lixoC = document.getElementById("bt-lixo1").getElementsByTagName("strong")[0];
    lixoT = document.getElementById("bt-lixo1").getElementsByTagName("span")[0];
}

function main() {
    stage = new createjs.Stage("defaultCanvas0");
    stage.canvas.width = 1280;
    stage.canvas.height = 800;

    // Preload     
    sonGoqueue.on("complete", setupMenu, this);
    sonGoqueue.loadManifest([{
        id: "btnEco",
        src: "img/btnEco.png"
    }, {
        id: "btnPlay",
        src: "img/btnPlay.png"
    }, {
        id: "btnMais",
        src: "img/btnMais.png"
    }, {
        id: "btnSobre",
        src: "img/opcao-sobre.png"
    }, {
        id: "btnParticipar",
        src: "img/opcao-participar.png"
    }, {
        id: "btnCreditos",
        src: "img/opcao-creditos.png"
    }, {
        id: "menuBG",
        src: "img/menuBG.jpg"
    }, {
        id: "bgPlay",
        src: "img/bgPlay.jpg"
    }, {
        id: "bgMais",
        src: "img/bgMais.jpg"
    }, {
        id: "bgEco",
        src: "img/bgEco.jpg"
    }, {
        id: "btVoltar",
        src: "img/btVoltar.png"
    }, {
        id: "sprite",
        src: "img/sprite.png"
    }, {
        id: "lixo0",
        src: "img/lixo0.png"
    }, {
        id: "lixo1",
        src: "img/lixo1.png"
    }, {
        id: "lixo2",
        src: "img/lixo2.png"
    }, {
        id: "lixo3",
        src: "img/lixo3.png"
    }, {
        id: "lixo4",
        src: "img/lixo4.png"
    }, {
        id: "lixo5",
        src: "img/lixo5.png"
    }, {
        id: "lixo6",
        src: "img/lixo6.png"
    }, {
        id: "lixo7",
        src: "img/lixo7.png"
    }, {
        id: "lixo8",
        src: "img/lixo8.png"
    }, {
        id: "lixo9",
        src: "img/lixo9.png"
    }, {
        id: "lixo10",
        src: "img/lixo10.png"
    }, {
        id: "lixo11",
        src: "img/lixo11.png"
    }, {
        id: "lixo12",
        src: "img/lixo12.png"
    }, {
        id: "lixo13",
        src: "img/lixo13.png"
    }, {
        id: "floor0",
        src: "img/floor0.png"
    }, {
        id: "wall0",
        src: "img/wall0.png"
    }, {
        id: "stairs",
        src: "img/stairs.png"
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
var equi;
var tSize;
var tiles = [];

function treesholdX(y, x) {
    return Math.floor(640 - tSize / 2 * x + tSize / 2 * y);
}

function treesholdY(y, x, z) {
    return Math.floor(tSize + tSize / 4 * x + tSize / 4 * y - z * tSize / 2);
}

function Boneco() {
    this.x = 12;
    this.y = 12;
    this.z = 1;
    this.plast = 0;
    this.vidro = 0;
    this.papel = 0;
    this.metal = 0;
    this.lixoC = 0;
    this.total = 0;

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
        if (this.y > 0 && tiles[this.x][this.y - 1][this.z - 1].tType == "floor" && tiles[this.x][this.y - 1][this.z].tType != "wall")
            this.y--;
        this.tween();
    }
    this.down = function() {
        if (this.y < 23 && tiles[this.x][this.y + 1][this.z - 1].tType == "floor" && tiles[this.x][this.y + 1][this.z].tType != "wall")
            this.y++;
        this.tween();
    }
    this.left = function() {
        if (this.x > 0 && tiles[this.x - 1][this.y][this.z - 1].tType == "floor" && tiles[this.x - 1][this.y][this.z].tType != "wall")
            this.x--;
        this.tween();
    }
    this.right = function() {
        if (this.x < 23 && tiles[this.x + 1][this.y][this.z - 1].tType == "floor" && tiles[this.x + 1][this.y][this.z].tType != "wall")
            this.x++;
        this.tween();
    }
    this.tween = function() {
        createjs.Tween.get(this.sprite, {
            loop: false
        }).to({
            x: treesholdX(this.x, this.y),
            y: treesholdY(this.x, this.y, this.z + 1.5)
        }, 150, createjs.Ease.getPowInOut(2)).call(faseAtual.load);
    }
    this.action = function() {
        if (tiles[this.x][this.y][this.z].tType == "lixo") {
            switch (tiles[this.x][this.y][this.z].tId) {
                case 0:
                    this.lixoC++;
                    break;
                case 1:
                case 2:
                case 3:
                    this.plast++;
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    this.vidro++;
                    break;
                case 8:
                case 9:
                    this.metal++;
                    break;
                case 10:
                case 11:
                case 12:
                case 13:
                    this.papel++;
                    break;
            }
            stage.removeChild(tiles[this.x][this.y][this.z].img);
            tiles[this.x][this.y][this.z] = new Tile("void", 0, x, y, z);
            this.total++;
            this.score();
        }
    }
    this.score = function() {
        lixoC.innerHTML = this.total;
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
    this.tType = type;
    this.tId = id;
    if (this.tType == "void") {
        this.tId = 0;
    } else {
        this.img = new createjs.Bitmap(sonGoqueue.getResult(this.tType + this.tId));
        this.img.x = treesholdX(x, y);
        this.img.y = treesholdY(x, y, z);
        if (this.tType == "floor" || this.tType == "wall") {
            this.img.scaleX = 64 / 267;
            this.img.scaleY = 64 / 267;
        }
    }
    this.show = function() {
        stage.addChild(this.img);
    }
    this.hide = function() {
        stage.removeChild(this.img);
    }
}

function Fase(fase, create) {
    //this.dojo = [];
    if (!create) {
        //Cria a Matriz de espaços vazios
        for (x = 0; x < 24; x++) {
            tiles[x] = [];
            for (y = 0; y < 24; y++) {
                tiles[x][y] = [];
                for (z = 0; z < 7; z++) {
                    tiles[x][y][z] = new Tile("void", 0, x, y, z);
                }
            }
        }
        switch (fase) {
            //Fase da casa
            case "casa":
                equi.x = 15;
                equi.y = 15;
                for (x = 0; x < 3; x++) {
                    for (y = 5; y < 9; y++) {
                        tiles[x][y][4] = new Tile("floor", 0, x, y, 4);
                    }
                }
                for (y = 5; y < 13; y++) {
                    tiles[3][y][4] = new Tile("floor", 0, 3, y, 4);
                }
                for (x = 4; x < 7; x++) {
                    for (y = 3; y < 13; y++) {
                        tiles[x][y][4] = new Tile("floor", 0, x, y, 4);
                    }
                }
                tiles[7][7][4] = new Tile("stair", "s", 7, 7, 4);
                for (x = 11; x < 21; x++) {
                    for (y = 1; y < 19; y++) {
                        tiles[x][y][0] = new Tile("floor", 0, x, y, 0);
                    }
                }
                for (x = 11; x < 16; x++) {
                    tiles[x][3][1] = new Tile("wall", 0, x, 3, 1);
                    tiles[x][3][2] = new Tile("wall", 0, x, 3, 2);
                }
                for (x = 16; x < 21; x++) {
                    tiles[x][0][0] = new Tile("wall", 0, x, 0, 0);
                    tiles[x][0][1] = new Tile("wall", 0, x, 0, 1);
                    tiles[x][0][2] = new Tile("wall", 0, x, 0, 2);
                }
                for (x = 11; x < 16; x++) {
                    tiles[x][13][1] = new Tile("wall", 0, x, 13, 1);
                    tiles[x][13][2] = new Tile("wall", 0, x, 13, 2);
                }
                for (x = 16; x < 20; x++) {
                    tiles[x][11][1] = new Tile("wall", 0, x, 11, 1);
                    tiles[x][11][2] = new Tile("wall", 0, x, 11, 2);
                }
                for (x = 11; x < 16; x++) {
                    for (y = 1; y < 3; y++) {
                        tiles[x][y][0] = new Tile("void", 0, x, y, 0);
                    }
                }
                for (y = 5; y < 19; y++) {
                    tiles[20][y][0] = new Tile("void", 0, 20, y, 0);
                }
                for (y = 14; y < 19; y++) {
                    tiles[19][y][0] = new Tile("void", 0, 19, y, 0);
                }
                for (x = 11; x < 13; x++) {
                    for (y = 17; y < 21; y++) {
                        tiles[x][y][0] = new Tile("void", 0, x, y, 0);
                    }
                }
                break;
                //Fase quadradinha de teste
            default:
                equi.x = 15;
                equi.y = 15;
                for (x = 10; x < 20; x++) {
                    for (y = 10; y < 20; y++) {
                        if (x != 16 || y != 16) {
                            tiles[x][y][0] = new Tile("floor", 0, x, y, 0);
                            if (y != 12 || x == 15) {
                                tiles[x][y][1] = new Tile("lixo", Math.floor(Math.random() * 14), x, y, 1);
                                total++;
                            } else {
                                tiles[x][y][1] = new Tile("wall", 0, x, y, 1);
                            }
                        }
                    }
                }
                break;
        }
    }
    this.load = function() {
        for (x = 0; x < 24; x++) {
            for (y = 0; y < 24; y++) {
                for (z = 0; z < 7; z++) {
                    stage.addChild(tiles[x][y][z].img);
                    if (equi.x == x && equi.y == y) {
                        stage.addChild(equi.sprite);
                    }
                }
            }
        }
    }
}