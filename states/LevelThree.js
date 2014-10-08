ClickIt.LevelThree = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
	this.popup;
	this.tween;
};

ClickIt.LevelThree.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelThree.prototype.constructor = ClickIt.LevelThree;

ClickIt.LevelThree.prototype.createLevel = function() {
};

//The color you have to collect for this level
ClickIt.LevelThree.prototype.colorOfLevel = function() {
	this.levelColor = 'pink';
	return this.levelColor;
};

//The number of moves you have for this level
ClickIt.LevelThree.prototype.movesOfLevel = function() {
	this.numberOfMoves = 20;
	return this.numberOfMoves;
};

//The number of dots you have to collect for this level
ClickIt.LevelThree.prototype.dotsOfLevel = function() {
	this.numberOfDots = 5;
	return this.numberOfDots;
};

//Sends you to the next level
ClickIt.LevelThree.prototype.nextLevel = function() {
    //Close popup
	this.tween = this.add.tween(this.popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
    //Start next level, though in this case you go back to the menu
	this.state.start('StartMenu');
};

//Sends you to the menu
ClickIt.LevelThree.prototype.backToMenu = function() {
    this.preloadBar = null;
    this.ready = false;
    this.move=0;
    this.state.start('StartMenu');
};

ClickIt.LevelThree.prototype.winning = function(removedDots) {
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