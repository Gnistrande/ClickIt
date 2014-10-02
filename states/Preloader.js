ClickIt.Preloader = function(game) {
  this.preloadBar = null;
  this.ready = false;

};

ClickIt.Preloader.prototype = {
  preload: function() {
    //Lägg in att ladda bilder här till startmenu
  	this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
    this.load.image('startButton', 'assets/startButton.png');
    this.load.image('levelOneImage', 'assets/levelOne.png');
    this.load.image('levelTwoImage', 'assets/levelTwo.png');
    this.load.image('levelThreeImage', 'assets/levelThree.png');
    this.load.image('arrowLeft', 'assets/arrowLeft.png');
    this.load.image('pink', 'assets/pinkdot.png');
    this.load.image('green', 'assets/greendot.png');
    this.load.image('blue', 'assets/bluedot.png');
    this.load.image('yellow', 'assets/yellowdot.png');
    this.load.image('backButton', 'assets/backButton.png');
    this.load.image('stone', 'assets/stone.png')
  },

  create: function() {
  	this.preloadBar.cropEnabled = false;
  },

  update: function() {
    if(this.ready == false) {
      this.ready = true;
      this.state.start('StartMenu');
    }
  }
};