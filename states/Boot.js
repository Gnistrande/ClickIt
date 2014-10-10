var ClickIt = {};

ClickIt.Boot = function(game){};

ClickIt.Boot.prototype = {
	preload: function() {
		//this.load.image('titleImage', 'assets/agnes.jpg');
		this.load.image('preloaderBar', 'assets/loader_bar.png');
	},
	//Random saker från tutorial
	create: function() {
		// masPointers är för att tex dubbelklick inte ska vara möjligt. Endast ETT klick i taget.
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.input.addPointer();

		this.stage.backgroundColor = '#ffffff';

		this.state.start('Preloader');
	}
}