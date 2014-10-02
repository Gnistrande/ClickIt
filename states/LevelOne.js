ClickIt.LevelOne = function(game) {};

ClickIt.LevelOne.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelOne.prototype.constructor = ClickIt.LevelOne;

ClickIt.LevelOne.prototype.createLevel = function() {
	console.log(this.buttons[3][1].key);
	this.buttons[3][1].loadTexture('stone');
	this.buttons[3][1].inputEnabled = false;
	this.buttons[4][1].loadTexture('stone');
	this.buttons[4][1].inputEnabled = false;
	console.log(this.buttons[3][1].key);
};