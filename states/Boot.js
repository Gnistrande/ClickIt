var ClickIt = {};

ClickIt.Boot = function(game){};

ClickIt.Boot.prototype = {
	preload: function() {
		this.load.image('titleImage', 'assets/agnes.jpg');
		this.load.image('preloaderBar', 'images/loader_bar.png');
	},
	//Random saker från tutorial
	create: function() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.input.addPointer();

		this.stage.backgroundColor = '#ddeeee';

		this.state.start('Preloader');
	}
}