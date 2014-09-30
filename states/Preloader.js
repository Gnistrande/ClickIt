ClickIt.Preloader = function(game) {
  this.preloadBar = null;
  this.titleText = null;
  this.ready = false;

};

ClickIt.Preloader.prototype = {
  preload: function() {
    //Lägg in att ladda bilder här till startmenu
  	this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);
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