// ClickIt - a global variable, containing all functions.
var ClickIt = {};


ClickIt.Boot = function(game){};

ClickIt.Boot.prototype = {
	preload: function() {
		//this.load.image('titleImage', 'assets/agnes.jpg');
		this.load.image('preloaderBar', 'assets/loader_bar.png');
	},
	create: function() {
		// masPointers är för att tex dubbelklick inte ska vara möjligt. Endast ETT klick i taget.
		this.input.maxPointers = 1;

		// game is not to be scalew when window size changes.
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

		this.stage.backgroundColor = '#ffffff';

		this.state.start('Preloader');
	}
};