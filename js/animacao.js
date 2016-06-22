var personagem;
var stage = new createjs.Stage("area");

var spriteSheet = new createjs.SpriteSheet({
     images: [ "img/sprite-down.png" ],
     frames: { width: 30.666666666666668, height: 33 },
     animations: {
          "down": { frames: [ 0, 1, 2 ], frequency: 8 },
          "parado": { frames: [ 1 ], frequency: 8 }
     }
});

personagem = new createjs.Sprite(spriteSheet, "parado");

stage.addChild(personagem);
stage.addEventListener("stagemousedown", animaDown);

createjs.Ticker.addEventListener("tick", tick);

function animaDown() {
	personagem.gotoAndPlay("down");
}

function tick(event) {
    stage.update(event);
}