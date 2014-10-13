ClickIt.InGameTutoring = function(game) {
	this.levelColor;
	this.numberOfMoves;
	this.numberOfDots;
	this.popup;
    this.losingPopup;
	this.tween;
    this.colorDot;
    this.clickText;
    this.orderOfTutorial;
};

ClickIt.InGameTutoring.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.InGameTutoring.prototype.constructor = ClickIt.InGameTutoring;

//The color you have to collect for this level
ClickIt.InGameTutoring.prototype.colorOfLevel = function() {
	this.levelColor = 'yellow';
	return this.levelColor;
};

//The number of moves you have for this level
ClickIt.InGameTutoring.prototype.movesOfLevel = function() {
	this.numberOfMoves = 10;
	return this.numberOfMoves;
};

//The number of dots you have to collect for this level
ClickIt.InGameTutoring.prototype.dotsOfLevel = function() {
	this.numberOfDots = 20;
	return this.numberOfDots;
};

//Creates the set up for this level
ClickIt.InGameTutoring.prototype.createLevel = function(color) {
    //Add dot with the color to collect for this level
    this.colorDot = this.add.image(490, 45, color);
    this.colorDot.scale.setTo(0.8, 0.8);
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
    this.move = 0;
    this.state.start('StartMenu');
};

ClickIt.InGameTutoring.prototype.tutoringOne = function() {
    console.log("In function tutoring1");

    this.orderOfTutorial = 1;

    //this.load.spritesheet('backButton_text', 'assets/buttons/backButton_text.png', 240, 80);

    this.clickText = this.add.sprite(250, 260, 'backButton_text', 3);
    this.clickText.scale.set(0.8);
    this.clickText.animations.add('first', [0,1,2], 10, true);

    this.orderText = this.add.sprite(250, 360, 'backButton_text', 3);
    this.orderText.scale.set(0.8);
    this.orderText.animations.add('second', [0,1,2], 10, true);
    this.orderText.visible = false;

    this.input.onDown.add(this.destroySprite, this);

    console.log("start first!");

    this.clickText.animations.play('first');

    if(this.orderOfTutorial === 2){
        this.orderText.visible = true;
        this.orderText.animations.play('second');
    }          
};

/*ClickIt.InGameTutoring.prototype.tutoringTwo = function() {
    console.log("In function tutoring2");

    this.orderText = this.add.sprite(250, 360, 'backButton_text', 3);
    this.orderText.scale.set(0.8);
    this.orderText.animations.add('second', [0,1,2], 10, true);

    this.orderText.inputEnabled = true;
    this.orderText.input.useHandCursor = true;
    this.orderText.events.onInputDown.add(this.destroySprite, this);

    console.log("start second!");
    this.orderText.animations.play('second');
};*/

ClickIt.InGameTutoring.prototype.destroySprite = function() {
    console.log("destroySprite");

    //this.clickText.animations.stop('first');
    if(this.orderOfTutorial === 1){
        this.clickText.destroy();
        this.orderOfTutorial = 2;
        this.tutoringOne();
    }
    else if(this.orderOfTutorial === 2){
        this.orderText.destroy();
    }
};

ClickIt.InGameTutoring.prototype.winning = function(removedDots) {
    //Create popup window
	this.popup = this.add.sprite(this.world.centerX, this.world.centerY, 'popup');
    this.popup.alpha = 0.8;
    this.popup.anchor.set(0.5);
    this.popup.inputEnabled = true;

    //The position of next level button
    var nlw = (this.popup.width / 2) - 170;
    var nlh = (this.popup.height / 2) - 60;

    //The position of the menu button
    var mw = (this.popup.width / 2) - 30;
    var mh = (this.popup.height / 2) - 60;

    //Next level button
    var nextLevelButton = this.make.sprite(nlw, nlh, 'nextButton_text');
    nextLevelButton.scale.setTo(0.8, 0.8);
    nextLevelButton.inputEnabled = true;
    nextLevelButton.input.priorityID = 1;
    nextLevelButton.input.useHandCursor = true;
    nextLevelButton.events.onInputDown.add(this.nextLevel, this);

    //Menu button
    var menuButton = this.make.sprite(-mw, mh, 'menuButton');
    menuButton.scale.setTo(0.8, 0.8);
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

ClickIt.InGameTutoring.prototype.losing = function() {
    //Create popup window
    this.losingPopup = this.add.sprite(this.world.centerX, this.world.centerY, 'popup');
    this.losingPopup.alpha = 0.8;
    this.losingPopup.anchor.set(0.5);
    this.losingPopup.inputEnabled = true;

    //The position of the ok button
    var ow = (this.losingPopup.width / 2)-450;
    var oh = (this.losingPopup.height / 2)-250;

    //Ok button brings you back to menu
    var menuButton = this.make.sprite(ow, -oh, 'okButton');
    menuButton.scale.setTo(0.8, 0.8);
    menuButton.inputEnabled = true;
    menuButton.input.priorityID = 1;
    menuButton.input.useHandCursor = true;
    menuButton.events.onInputDown.add(this.backToMenu, this);

    var losingText = this.make.text(-81, -170, 'You lost!', { font: '36px Arial', fill: '#000' });

    //Add the buttons to the popup window image
    this.losingPopup.addChild(menuButton);
    this.losingPopup.addChild(losingText);

    //Hide it awaiting a click
    this.losingPopup.scale.set(0);

    //Open popup
    this.tween = this.add.tween(this.losingPopup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
};


