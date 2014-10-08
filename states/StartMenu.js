ClickIt.StartMenu = function(game) {
  this.buttonStart;
  this.buttonLevelOne;
  this.buttonLevelTwo;
  this.buttonLevelThree;
};

ClickIt.StartMenu.prototype = {
  preload: function() {
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.spritesheet('pink', 'assets/pinkDots.png', 54, 44);
    this.load.spritesheet('green', 'assets/greenDots.png', 54, 44);
    this.load.spritesheet('blue', 'assets/blueDots.png', 54, 44);
    this.load.spritesheet('yellow', 'assets/yellowDots.png', 54, 44);
    this.load.image('backButton', 'assets/backButton.png');
    this.load.image('stone', 'assets/stone5.png');
    this.load.image('agnes', 'assets/agnes.jpg');

    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    //this.load.script('gray', '../phaser/filters/Gray.js');

    this.load.image('popup', 'assets/greyOverlay1.png');

  },
  create: function() {
    clickItLogo = this.add.sprite(this.world.centerX-135, 15, 'logo');
    clickItLogo.scale.setTo(0.7, 0.7);

  

    buttonStart = this.add.button(this.world.centerX-115, 230, 'startButton', this.startGame, this, 1, 0, 2);
    buttonStart.scale.setTo(0.9, 0.9);
    buttonLevelOne = this.add.button(this.world.centerX-115, 300, 'levelOneImage', this.startGame, this, 1, 0, 2);
    buttonLevelOne.scale.setTo(0.9, 0.9);
    //buttonLevelOne.inputEnabled = false;
    buttonLevelTwo = this.add.button(this.world.centerX-115, 370, 'levelTwoImage', this.startGame, this, 1, 0, 2);
    buttonLevelTwo.scale.setTo(0.9, 0.9);
    //buttonLevelTwo.inputEnabled = false;
    buttonLevelThree = this.add.button(this.world.centerX-115, 440, 'levelThreeImage', this.startGame, this, 1, 0, 2);
    buttonLevelThree.scale.setTo(0.9, 0.9);
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