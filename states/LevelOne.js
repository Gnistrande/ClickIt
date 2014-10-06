ClickIt.LevelOne = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
};

ClickIt.LevelOne.prototype = Object.create(ClickIt.Game.prototype);

//Kolla upp detta!
ClickIt.LevelOne.prototype.constructor = ClickIt.LevelOne;

ClickIt.LevelOne.prototype.createLevel = function() {
	//console.log(this.buttons[3][1].key);

	/*this.buttons[3][1].loadTexture('stone');
	this.buttons[3][1].x =345;
	this.buttons[3][1].y =75;
	this.buttons[3][1].inputEnabled = false;

	this.buttons[4][1].loadTexture('stone');
	this.buttons[4][1].x =415;
	this.buttons[4][1].y =75;
	this.buttons[4][1].inputEnabled = false;*/
	alert("Level 1");	
};

ClickIt.LevelOne.prototype.colorOfLevel = function() {
	this.levelColor = 'pink';
	return this.levelColor;
};

ClickIt.LevelOne.prototype.movesOfLevel = function() {
	this.numberOfMoves = 20;
	return this.numberOfMoves;
};

ClickIt.LevelOne.prototype.dotsOfLevel = function() {
	this.numberOfDots = 15;
	return this.numberOfDots;
};

ClickIt.LevelOne.prototype.winning = function(numberOfRemovedDots, numberOfDots) {
	if(numberOfRemovedDots >= numberOfDots){
		this.state.start('LevelTwo');
	}
};

