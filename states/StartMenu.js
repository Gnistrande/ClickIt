ClickIt.StartMenu = function(game) {
  this.startBG;
  this.startPrompt;
}

ClickIt.StartMenu.prototype = {
  preload: function() {
    this.load.image('pink', 'assets/pinkdot.png');
    this.load.image('green', 'assets/greendot.png');
    this.load.image('blue', 'assets/bluedot.png');
    this.load.image('yellow', 'assets/yellowdot.png');
  },
  create: function() {
    startBG = this.add.image(0, 0, 'titlescreen');
    startBG.inputEnabled = true;
    startBG.events.onInputDown.addOnce(this.startGame, this);
  },

  startGame: function(pointer) {
    this.state.start('Game');
  }
};