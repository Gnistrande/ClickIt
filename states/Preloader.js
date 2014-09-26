ClickIt.Preloader = function(game) {
  this.preloadBar = null;
  this.titleText = null;
  this.ready = false;

};

ClickIt.Preloader.prototype = {
  preload: function() {
  	this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
    this.titleText = this.add.image(this.world.centerX, this.world.centerY, 'titleImage');
    this.titleText.anchor.setTo(0.5, 0.5);
    this.load.image('titlescreen', 'images/TitleBG.png');
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