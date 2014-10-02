ClickIt.StartMenu = function(game) {
  this.buttonStart;
  this.buttonLevelOne;
  this.buttonLevelTwo;
  this.buttonLevelThree;
};

ClickIt.StartMenu.prototype = {
  preload: function() {
    /*this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('pink', 'assets/pinkdot.png');
    this.load.image('green', 'assets/greendot.png');
    this.load.image('blue', 'assets/bluedot.png');
    this.load.image('yellow', 'assets/yellowdot.png');
    this.load.image('backButton', 'assets/backButton.png');
    this.load.image('agnes', 'assets/agnes.jpg')*/
  },
  create: function() {
    buttonStart = this.add.button(this.world.centerX-108, 70, 'startButton', this.startGame, this);
    buttonLevelOne = this.add.button(this.world.centerX-108, 170, 'levelOneImage', this.startGame, this);
    //buttonLevelOne.inputEnabled = false;
    buttonLevelTwo = this.add.button(this.world.centerX-108, 270, 'levelTwoImage', this.startGame, this);
    //buttonLevelTwo.inputEnabled = false;
    buttonLevelThree = this.add.button(this.world.centerX-108, 370, 'levelThreeImage', this.startGame, this);
    //buttonLevelThree.inputEnabled = false;
  },

  startGame: function(pointer) {
    if(pointer==buttonStart) {
      this.state.start('InGameTutoring');
    }
    else if(pointer==buttonLevelOne) {
      this.state.start('LevelOne');
    } 
    else if(pointer==buttonLevelTwo) {
      this.state.start('LevelTwo');
    }
    else if(pointer==buttonLevelThree) {
      this.state.start('LevelThree');
    }
  }
};