ClickIt.LevelThree = function(game) {
    this.levelColor;
    this.numberOfMoves;
    this.numberOfDots;
    this.popup;
    this.tween;
    this.colorDot;
};

ClickIt.LevelThree.prototype = Object.create(ClickIt.Game.prototype);
ClickIt.LevelThree.prototype.constructor = ClickIt.LevelTwo;

//The color you have to collect for this level
ClickIt.LevelThree.prototype.colorOfLevel = function() {
    this.levelColor = 'blue';
    return this.levelColor;
};

//The number of moves you have for this level
ClickIt.LevelThree.prototype.movesOfLevel = function() {
    this.numberOfMoves = 15;
    return this.numberOfMoves;
};

//The number of dots you have to collect for this level
ClickIt.LevelThree.prototype.dotsOfLevel = function() {
    this.numberOfDots = 30;
    return this.numberOfDots;
};

//Creates the set up for this level
ClickIt.LevelThree.prototype.createLevel = function() {
    //Add dot with the color to collect for this level
    this.colorDot = this.add.image(490, 45, this.levelColor);
    this.colorDot.scale.setTo(0.8, 0.8);

    //Change buttons to blocks
    this.buttons[3][3].inputEnabled = false;
    this.buttons[3][4].inputEnabled = false;
    this.buttons[4][3].inputEnabled = false;
    this.buttons[4][4].inputEnabled = false;

    this.buttons[3][3].loadTexture('stone');
    this.buttons[3][4].loadTexture('stone');
    this.buttons[4][3].loadTexture('stone');
    this.buttons[4][4].loadTexture('stone');
};

//Sends you to the next level
ClickIt.LevelThree.prototype.nextLevel = function() {
    //Close popup
    this.tween = this.add.tween(this.popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
    //Start next level
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

ClickIt.LevelThree.prototype.losing = function() {
    //Create popup window
    this.losingPopup = this.add.sprite(this.world.centerX, this.world.centerY, 'popup');
    this.losingPopup.alpha = 0.8;
    this.losingPopup.anchor.set(0.5);
    this.losingPopup.inputEnabled = true;

    ///The position of the ok button
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