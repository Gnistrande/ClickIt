ClickIt.LevelThree = function(game) {};

ClickIt.LevelThree.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelThree.prototype.constructor = ClickIt.LevelThree;

ClickIt.LevelThree.prototype.createLevel = function() {
	console.log(this.buttons[1][1]);
	this.buttons[3][1].inputEnabled = false;
	this.buttons[3][1].loadTexture('agnes');
};