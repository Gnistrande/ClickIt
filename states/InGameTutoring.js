ClickIt.InGameTutoring = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
	this.popup;
	this.tween;
    this.colorOfLevel;
};

ClickIt.InGameTutoring.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.InGameTutoring.prototype.constructor = ClickIt.InGameTutoring;

//The color you have to collect for this level
ClickIt.InGameTutoring.prototype.colorOfLevel = function() {
	levelColor = 'yellow';
	return levelColor;
};

//The number of moves you have for this level
ClickIt.InGameTutoring.prototype.movesOfLevel = function() {
	this.numberOfMoves = 20;
	return this.numberOfMoves;
};

//The number of dots you have to collect for this level
ClickIt.InGameTutoring.prototype.dotsOfLevel = function() {
	this.numberOfDots = 5;
	return this.numberOfDots;
};

ClickIt.InGameTutoring.prototype.createLevel = function(color) {
    //Add dot with the color to collect for this level
    this.colorOfLevel = this.add.image(1, 109, color);
};    

//Sends you to the next level
ClickIt.InGameTutoring.prototype.nextLevel = function() {
    //Close popup
	this.tween = this.add.tween(this.popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
    //Start next level
	this.state.start('LevelOne');
};

//Sends you to the menu
ClickIt.InGameTutoring.prototype.backToMenu = function() {
    this.preloadBar = null;
    this.ready = false;
    this.move=0;
    this.state.start('StartMenu');
};

ClickIt.InGameTutoring.prototype.winning = function(removedDots) {
    //Create popup window
	this.popup = this.add.sprite(this.world.centerX, this.world.centerY, 'popup');
    this.popup.alpha = 0.8;
    this.popup.anchor.set(0.5);
    this.popup.inputEnabled = true;

    //The position of next level button
    var nlw = (this.popup.width / 2) - 105;
    var nlh = (this.popup.height / 2) - 60;

    //The position of the menu button
    var mw = (this.popup.width / 2) - 30;
    var mh = (this.popup.height / 2) - 60;

    //Next level button
    var nextLevelButton = this.make.sprite(nlw, nlh, 'backButton');
    nextLevelButton.inputEnabled = true;
    nextLevelButton.input.priorityID = 1;
    nextLevelButton.input.useHandCursor = true;
    nextLevelButton.events.onInputDown.add(this.nextLevel, this);

    //Menu button
    var menuButton = this.make.sprite(-mw, mh, 'backButton');
    menuButton.inputEnabled = true;
    menuButton.input.priorityID = 1;
    menuButton.input.useHandCursor = true;
    menuButton.events.onInputDown.add(this.backToMenu, this);

    var winningText = this.make.text(-200, -100, 'Congratulations! \nYou removed ' + removedDots + ' ' + this.levelColor + ' dots.', { font: '36px Arial', fill: '#000' });

    //Add the buttons to the popup window image
    this.popup.addChild(nextLevelButton);
    this.popup.addChild(menuButton);
    this.popup.addChild(winningText);

    //Hide it awaiting a click
    this.popup.scale.set(0);

    //Open popup
	this.tween = this.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
};


