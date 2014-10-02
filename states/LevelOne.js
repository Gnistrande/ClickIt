ClickIt.LevelOne = function(game) {};

ClickIt.LevelOne.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelOne.prototype.constructor = ClickIt.LevelOne;

ClickIt.LevelOne.prototype.createLevel = function() {
	console.log(this.buttons[3][1].key);
	this.buttons[3][1].loadTexture('agnes');
	this.buttons[3][1].inputEnabled = false;
	console.log(this.buttons[3][1].key);
};