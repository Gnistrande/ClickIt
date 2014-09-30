ClickIt.StartMenu = function(game) {
  this.buttonStart;
  this.buttonLevelOne;
  this.buttonLevelTwo;
  this.buttonLevelThree;
}

ClickIt.StartMenu.prototype = {
  preload: function() {
    this.load.image('pink', 'assets/pinkdot.png');
    this.load.image('green', 'assets/greendot.png');
    this.load.image('blue', 'assets/bluedot.png');
    this.load.image('yellow', 'assets/yellowdot.png');
  },
  create: function() {
    buttonStart = this.add.button(this.world.centerX, 70, 'pink', this.startGame, this);
    buttonLevelOne = this.add.button(this.world.centerX, 140, 'green', this.startGame, this);
    buttonLevelOne.inputEnabled = false;
    buttonLevelTwo = this.add.button(this.world.centerX, 210, 'blue', this.startGame, this);
    buttonLevelTwo.inputEnabled = false;
    buttonLevelThree = this.add.button(this.world.centerX, 280, 'yellow', this.startGame, this);
    buttonLevelThree.inputEnabled = false;
  },

  startGame: function(pointer) {
    this.state.start('Game');
  }
};