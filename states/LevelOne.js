ClickIt.LevelOne = function(game) {};

ClickIt.LevelOne.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelOne.prototype.constructor = ClickIt.LevelOne;

ClickIt.LevelOne.prototype.addBlocks = function() {
	console.log(this.buttons[1][1]);
	this.buttons[3][1].inputEnabled = false;
	this.buttons[3][1].loadTexture('agnes');
};