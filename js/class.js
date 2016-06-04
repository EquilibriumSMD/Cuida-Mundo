function treesholdX(y, x) {
  return floor(windowWidth / 2 - tSize / 2 * x + tSize / 2 * y);
}

function treesholdY(y, x, z) {
  return floor(tSize + tSize / 4 * x + tSize / 4 * y - z * tSize / 2.4);
}

function moveGrid() {
  for (x = 0; x < 24; x++) {
    for (y = 0; y < 24; y++) {
      for (z = 0; z < 2; z++) {
        grid[x][y][z].position(treesholdX(x, y), treesholdY(x, y, z));
      }
    }
  }
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
  this.tile = new Tile("player", 0);
  this.tile.img.id("player");
  this.tile.img.style("position", "absolute");
  this.tile.img.style("left", "0px");
  this.tile.img.style("top", "-"+tSize+"px");

  this.up = function() {
    if (this.y > 0 && tiles[this.x][this.y-1][this.z-1].tType == "test" && tiles[this.x][this.y-1][this.z].tType != "wall")
      this.y--;
    moveGrid();
    this.tile.img.parent(grid[this.x][this.y][this.z]);
  }
  this.down = function() {
    if (this.y < 23 && tiles[this.x][this.y+1][this.z-1].tType == "test" && tiles[this.x][this.y+1][this.z].tType != "wall")
      this.y++;
    moveGrid();
    this.tile.img.parent(grid[this.x][this.y][this.z]);
  }
  this.left = function() {
    if (this.x > 0 && tiles[this.x-1][this.y][this.z-1].tType == "test" && tiles[this.x-1][this.y][this.z].tType != "wall")
      this.x--;
    moveGrid();
    this.tile.img.parent(grid[this.x][this.y][this.z]);
  }
  this.right = function() {
    if (this.x < 23 && tiles[this.x+1][this.y][this.z-1].tType == "test" && tiles[this.x+1][this.y][this.z].tType != "wall")
      this.x++;
    moveGrid();
    this.tile.img.parent(grid[this.x][this.y][this.z]);
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
    bonequinho.up();
  }
  this.down = function() {
    bonequinho.down();
  }
  this.left = function() {
    bonequinho.left();
  }
  this.right = function() {
    bonequinho.right();
  }
  this.action = function() {
    bonequinho.action();
  }
}

function Tile(type, id) {
  this.tType = type;
  this.tId = id;
  this.img = createImg("img/" + this.tType + this.tId + ".png");
  if (this.tType == "void") {
    this.tId = 0;
    this.img.remove();
  }

  this.remove = function() {
    this.tId = 0;
    this.img.remove();
  }
}