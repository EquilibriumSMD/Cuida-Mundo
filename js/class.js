// Comum ao jogo e ao menu:
var stage = new createjs.Stage("defaultCanvas0");

window.onload = function() {
    main();
	//menu
    setupMenu();
}
function main() {
    stage = new createjs.Stage("defaultCanvas0");
	stage.canvas.width = 1280; 
	stage.canvas.height = 800;
	stage.canvas.x = window.innerWidth/2 - 640;
	stage.canvas.y = window.innerHeight/2 - 400;
}
createjs.Ticker.addEventListener("tick", draw);
function draw() {
    stage.update();
}

// Usado pro jogo
function treesholdX(y, x) {
    return Math.floor(640 - tSize / 2 * (x + equi.y) + tSize / 2 * (y + equi.x));
}

function treesholdY(y, x, z) {
    return Math.floor(400 + tSize / 4 * (x + equi.y) + tSize / 4 * (y + equi.x) - z * tSize / 2.4);
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
        images: ["img/sprite-down.png", "img/sprite-left.png", "img/sprite-right.png", "img/sprite-up.png"],
        frames: {
            width: 59,
            height: 64
        },
        animations: {
            "idleD": 1,
            "down": [0, 2, "idleD", 3],
            "idleL": 4,
            "left": [3, 5, "idleL", 3],
            "idleR": 7,
            "right": [6, 8, "idleR", 3],
            "idleU": 10,
            "up": [9, 11, "idleU", 3]
        }
    });

    this.sprite = new createjs.Sprite(spritePersonagem, "idleD");
    this.sprite.framerate = 30;


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
        }, 100, createjs.Ease.getPowInOut(2));
	}
    this.action = function() {
        if (tiles[this.x][this.y][this.z].tType == "lixo") {
            switch (tiles[this.x][this.y][this.z].tId) {
                case 1:
                    this.plast++;
                    break;
                case 2:
                    this.vidro++;
                    break;
                case 3:
                    this.papel++;
                    break;
                case 4:
                    this.metal++;
                    break;
                case 5:
                    this.lixoC++;
                    break;
            }
            tiles[this.x][this.y][this.z].remove();
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
		this.img = new createjs.Bitmap("img/" + this.tType + this.tId + ".png");
        this.img.x = treesholdX(x, y);
        this.img.y = treesholdY(x, y, 1);
        stage.addChild(this.img);
	}

    this.remove = function() {
        this.tId = 0;
        this.tType = "void";
        stage.removeChild(this.img);
    }
}