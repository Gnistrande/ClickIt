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
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 450;
		this.scale.minHeight = 450;
		//this.scale.pageAlignHorizontally = true;
		//this.scale.pageAlignVertically = true;
		//this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);
		this.input.addPointer();

		this.stage.backgroundColor = '#ddeeee';

		this.state.start('Preloader');
	}
}