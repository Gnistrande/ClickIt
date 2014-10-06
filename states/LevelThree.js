ClickIt.LevelThree = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
};

ClickIt.LevelThree.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelThree.prototype.constructor = ClickIt.LevelThree;

ClickIt.LevelThree.prototype.createLevel = function() {
};

ClickIt.LevelThree.prototype.colorOfLevel = function() {
	this.levelColor = 'pink';
	return this.levelColor;
};

ClickIt.LevelThree.prototype.movesOfLevel = function() {
	this.numberOfMoves = 20;
	return this.numberOfMoves;
};

ClickIt.LevelThree.prototype.dotsOfLevel = function() {
	this.numberOfDots = 15;
	return this.numberOfDots;
};

ClickIt.LevelThree.prototype.winning = function(numberOfRemovedDots, numberOfDots) {
	if(numberOfRemovedDots >= numberOfDots){
		alert("Played all levels!");
		this.ready = false;
		this.state.start('StartMenu');
	}
};