ClickIt.LevelTwo = function(game) {};

ClickIt.LevelTwo.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelTwo.prototype.constructor = ClickIt.LevelTwo;

ClickIt.LevelTwo.prototype.createLevel = function() {
	console.log(this.buttons[1][1]);
	this.buttons[3][1].inputEnabled = false;
	this.buttons[3][1].loadTexture('agnes');
};