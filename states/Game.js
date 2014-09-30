ClickIt.Game = function(game) {
	this.buttons;
	this.delta;
	this.move=0;
	this.moves;
	this.buttonBack;
}

ClickIt.Game.prototype = {
	create: function() {
		this.buttons = [];
		this.delta = 70;

		this.buttonBack = this.add.button(50, 50, 'pink', this.backToMenu, this);
		
		//  Here we'll create 8 times 8 of buttons evenly spaced apart
		for (var i = 0; i < 8; i++){
	        this.buttons[i] = [];
	    	for (var j = 0; j < 8; j++){
	    		//Assign random values to a 8X8 matrix
	    		var number = Math.floor((Math.random() * 4) + 1);

	    		var image = this.assignFirstColor(number);

	    		//  Create a button inside of the 'game' group, with the an image decided above.
	        	this.buttons[i][j] = this.add.button(i * this.delta+150, j * this.delta+10, image, this.actionOnClick, this);
	    	} 
    	}
    	this.moves = this.add.text(10, 10, 'Moves: 0', { font: '24px Arial', fill: '#000' });
	},

	//Assign color from number
	assignFirstColor: function(number) {
		var image;
		if(number == 1){
			image = 'pink';
		}
		else if(number == 2){
			image = 'green';
		}
		else if(number == 3){
			image = 'blue';
		}
		else if(number == 4){
			image = 'yellow';
		}
		return image;
	},

	//Change color from string
	changeColorInGame: function(key) {
		var image;
	    if(key == 'yellow'){
	        image = 'blue';
	    }
	    else if(key == 'blue'){
	        image = 'green';
	    }
	    else if(key == 'green'){
	        image = 'pink';
	    }
	    else if(key == 'pink'){
	        image = 'yellow';
	    }
	    return image;
	},

	actionOnClick: function(clickedButton) {
		//Check for position I and J in buttons
		var numberI = (clickedButton.x-150)/this.delta;
	    var numberJ = (clickedButton.y-10)/this.delta;

	    //Change color on the button that was clicked
	    var newButtonImage = this.changeColorInGame(clickedButton.key);
	    clickedButton.loadTexture(newButtonImage);

	    //  Add counter for number of moves
	    this.move += 1;

	    //Check if the pressed button is on the edge
	    if(numberI==7){
	        var buttonLeft = this.buttons[numberI-1][numberJ];
	        var newButtonLeftImage = this.changeColorInGame(buttonLeft.key);
	        this.buttons[numberI-1][numberJ].loadTexture(newButtonLeftImage);
	    }
	    else if(numberI==0){
	        var buttonRight = this.buttons[numberI+1][numberJ];
	        var newButtonRightImage = this.changeColorInGame(buttonRight.key);
	        this.buttons[numberI+1][numberJ].loadTexture(newButtonRightImage);
	    }
	    else{
	        var buttonLeft = this.buttons[numberI-1][numberJ];
	        var buttonRight = this.buttons[numberI+1][numberJ];
	        var newButtonLeftImage = this.changeColorInGame(buttonLeft.key);
	        var newButtonRightImage = this.changeColorInGame(buttonRight.key);
	        this.buttons[numberI-1][numberJ].loadTexture(newButtonLeftImage);
	        this.buttons[numberI+1][numberJ].loadTexture(newButtonRightImage);
	    }
	    if(numberJ==7){
	        var buttonTop = this.buttons[numberI][numberJ-1];
	        var newButtonTopImage = this.changeColorInGame(buttonTop.key);
	        this.buttons[numberI][numberJ-1].loadTexture(newButtonTopImage);
	    }
	    else if(numberJ==0){
	        var buttonBottom = this.buttons[numberI][numberJ+1];
	        var newButtonBottomImage = this.changeColorInGame(buttonBottom.key);
	        this.buttons[numberI][numberJ+1].loadTexture(newButtonBottomImage);
	    }
	    else{
	        var buttonTop = this.buttons[numberI][numberJ-1];
	        var buttonBottom = this.buttons[numberI][numberJ+1];
	        var newButtonTopImage = this.changeColorInGame(buttonTop.key);
	        var newButtonBottomImage = this.changeColorInGame(buttonBottom.key);
	        this.buttons[numberI][numberJ-1].loadTexture(newButtonTopImage);
	        this.buttons[numberI][numberJ+1].loadTexture(newButtonBottomImage);
	    }
	},

	getColorInt: function(colorString) {
		var colorInt;
		if(colorString == 'pink'){
	        colorInt = 1;
	    }
	    else if(colorString == 'green'){
	    	colorInt = 2;
	    }
	    else if(colorString == 'blue'){
	    	colorInt = 3;
	    }
	    else if(colorString == 'yellow'){
	    	colorInt = 4;
	    }
	    return colorInt;
	},

	backToMenu: function(pointer) {
		this.state.start('StartMenu');
	},

	update: function() {
		//Update number of moves
		this.moves.text = 'Moves: ' + this.move;
	}
};