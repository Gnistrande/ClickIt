ClickIt.Preloader = function(game) {
  this.preloadBar;
};

ClickIt.Preloader.prototype = {
  preload: function() {
    this.preloadBar = null;
  	this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    //setPreloadSprite - crops width or height based on percentage loaded.
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('logo', 'assets/ClickIt_with_dots.png');
    //Load spritesheets, arguments 3 and 4 tells you how big every image is in the sprite
    this.load.spritesheet('startButton', 'assets/buttons/level_button_play.png', 240, 80);
    this.load.spritesheet('levelOneImage', 'assets/buttons/level_button_one.png', 240, 80);
    this.load.spritesheet('levelTwoImage', 'assets/buttons/level_button_two.png', 240, 80);
    this.load.spritesheet('levelThreeImage', 'assets/buttons/level_button_three.png', 240, 80);
    this.load.spritesheet('levelFourImage', 'assets/buttons/level_button_four.png', 240, 80);
  },

  create: function() {
    this.state.start('StartMenu');
  }
};