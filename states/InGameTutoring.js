ClickIt.InGameTutoring = function(game) {};

ClickIt.InGameTutoring.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.InGameTutoring.prototype.constructor = ClickIt.InGameTutoring;

ClickIt.InGameTutoring.prototype.createLevel = function() {
	console.log(this.buttons[1][1]);
};