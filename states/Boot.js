// ClickIt - a global variable, containing all functions.
var ClickIt = {};


ClickIt.Boot = function(game){};

//Add properties and methods to object Boot
ClickIt.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'assets/loader_bar.png');
	},
	create: function() {
		// maxPointers set to one click at a time, no double clicks.
		this.input.maxPointers = 1;
		// game is not to be scaled when window size changes.
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.stage.backgroundColor = '#ffffff';

		this.state.start('Preloader');
	}
};