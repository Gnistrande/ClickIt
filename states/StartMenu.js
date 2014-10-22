ClickIt.StartMenu = function(game) {
  this.buttonStart;
  this.buttonLevelOne;
  this.buttonLevelTwo;
  this.buttonLevelThree;
};

ClickIt.StartMenu.prototype = {
  preload: function() {
    //Load dots
    this.load.spritesheet('pink', 'assets/dots/pinkSlice.png', 54, 44);
    this.load.spritesheet('green', 'assets/dots/greenSlice.png', 54, 44);
    this.load.spritesheet('blue', 'assets/dots/blueSlice.png', 54, 44);
    this.load.spritesheet('yellow', 'assets/dots/yellowSlice.png', 54, 44);
    this.load.spritesheet('lila', 'assets/dots/lilaSlice.png', 54, 44);
    //Load buttons
    this.load.spritesheet('backButton_symbol', 'assets/buttons/backButton_symbol.png', 70, 39);
    this.load.spritesheet('backButton_text', 'assets/buttons/backButton_text.png', 240, 80);
    this.load.spritesheet('nextButton_symbol', 'assets/buttons/nextButton_symbol.png', 70, 39);
    this.load.spritesheet('nextButton_text', 'assets/buttons/nextButton_text1.png', 204, 68);
    this.load.spritesheet('menuButton', 'assets/buttons/menuButton.png', 204, 68);
    this.load.spritesheet('okButton', 'assets/buttons/okButton.png', 240, 80);
    //Load images
    this.load.image('colorOrderI', 'assets/orderofcolors_2.png');
    this.load.image('stone', 'assets/louises_stone.png');
    this.load.image('popup', 'assets/Rectangle_1.png');

    this.load.spritesheet('clickMe', 'clickMe.png', 542, 165);
    this.load.image('andWe', 'andWe.png');
    this.load.image('bubble', 'bubble-md.png');

  },
  create: function() {
    clickItLogo = this.add.image(this.world.centerX-135, 15, 'logo');
    clickItLogo.scale.setTo(0.7, 0.7); 

    //Pos 1 - Hover. Pos 2 - Normal. Pos 3 - Click.
    buttonStart = this.add.button(this.world.centerX-110, 260, 'startButton', this.startGame, this, 1, 0, 2);
    buttonStart.scale.setTo(0.8, 0.8);
    buttonLevelOne = this.add.button(this.world.centerX-110, 320, 'levelOneImage', this.startGame, this, 1, 0, 2);
    buttonLevelOne.scale.setTo(0.8, 0.8);
    buttonLevelTwo = this.add.button(this.world.centerX-110, 380, 'levelTwoImage', this.startGame, this, 1, 0, 2);
    buttonLevelTwo.scale.setTo(0.8, 0.8);
    buttonLevelThree = this.add.button(this.world.centerX-110, 440, 'levelThreeImage', this.startGame, this, 1, 0, 2);
    buttonLevelThree.scale.setTo(0.8, 0.8);

    buttonLevelFour = this.add.button(this.world.centerX-110, 500, 'levelFourImage', this.startGame, this, 1, 0, 2);
    buttonLevelFour.scale.setTo(0.8, 0.8);
    // Do not do anything if button is clicked
    buttonLevelFour.inputEnabled = false;
    // Set low opacity to indicate button is not clickable
    buttonLevelFour.alpha = 0.5;
    // Set hover, normal and click to same frame
    buttonLevelFour.setFrames(0, 0, 0, 0);
  },

  //Pointer tells wich state to start
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