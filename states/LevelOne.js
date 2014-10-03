ClickIt.LevelOne = function(game) {};

ClickIt.LevelOne.prototype = Object.create(ClickIt.Game.prototype);

//Kolla upp detta!
ClickIt.LevelOne.prototype.constructor = ClickIt.LevelOne;

ClickIt.LevelOne.prototype.createLevel = function() {
	console.log(this.buttons[3][1].key);

	this.buttons[3][1].loadTexture('agnes');
	this.buttons[3][1].x =345;
	this.buttons[3][1].y =75;
	this.buttons[3][1].inputEnabled = false;

	this.buttons[4][1].loadTexture('agnes');
	this.buttons[4][1].x =415;
	this.buttons[4][1].y =75;
	this.buttons[4][1].inputEnabled = false;

	console.log(this.buttons[3][1].key);
};