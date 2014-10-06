ClickIt.LevelTwo = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
};

ClickIt.LevelTwo.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelTwo.prototype.constructor = ClickIt.LevelTwo;

ClickIt.LevelTwo.prototype.createLevel = function() {
	alert("Level 2");
};

ClickIt.LevelTwo.prototype.colorOfLevel = function() {
	this.levelColor = 'pink';
	return this.levelColor;
};

ClickIt.LevelTwo.prototype.movesOfLevel = function() {
	this.numberOfMoves = 20;
	return this.numberOfMoves;
};

ClickIt.LevelTwo.prototype.dotsOfLevel = function() {
	this.numberOfDots = 15;
	return this.numberOfDots;
};

ClickIt.LevelTwo.prototype.winning = function(numberOfRemovedDots, numberOfDots) {
	if(numberOfRemovedDots >= numberOfDots){
		this.state.start('LevelThree');
	}
};