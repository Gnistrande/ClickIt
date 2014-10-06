ClickIt.InGameTutoring = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
	this.popup;
	this.tween;
};

ClickIt.InGameTutoring.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.InGameTutoring.prototype.constructor = ClickIt.InGameTutoring;

ClickIt.InGameTutoring.prototype.createLevel = function() {
};

ClickIt.InGameTutoring.prototype.colorOfLevel = function() {
	this.levelColor = 'pink';
	return this.levelColor;
};

ClickIt.InGameTutoring.prototype.movesOfLevel = function() {
	this.numberOfMoves = 20;
	return this.numberOfMoves;
};

ClickIt.InGameTutoring.prototype.dotsOfLevel = function() {
	this.numberOfDots = 15;
	return this.numberOfDots;
};

ClickIt.InGameTutoring.prototype.nextLevel = function() {
	this.tween = this.add.tween(this.popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	this.state.start('LevelOne');
};

ClickIt.InGameTutoring.prototype.winning = function() {
	this.popup = this.add.sprite(this.world.centerX, this.world.centerY, 'popup');
    this.popup.alpha = 0.8;
    this.popup.anchor.set(0.5);
    this.popup.inputEnabled = true;

    //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
    var pw = (this.popup.width / 2) - 30;
    var ph = (this.popup.height / 2) - 8;

    //  And click the close button to close it down again
    var closeButton = this.make.sprite(pw, -ph, 'backButton');
    closeButton.inputEnabled = true;
    closeButton.input.priorityID = 1;
    closeButton.input.useHandCursor = true;
    closeButton.events.onInputDown.add(this.nextLevel, this);

    //  Add the "close button" to the popup window image
    this.popup.addChild(closeButton);

    //  Hide it awaiting a click
    this.popup.scale.set(0);
	this.tween = this.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
};


