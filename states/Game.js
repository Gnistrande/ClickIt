ClickIt.Game = function(game) {
	this.colorOrderImage;

	this.buttons;
	this.delta;
	this.moves;
	this.buttonBack;
	this.chainMatrix;
	this.chainText;
	this.moveX;
	this.moveY;

	this.graph;
	this.enTween;

	this.levelGameColor;
	this.numberOfMoves;
	this.numberOfDots;
	this.removedDotsOfLevelColor;
	this.removedColor;
	this.winningBol;
	this.losingBol;
	this.tutoringBol;
};

ClickIt.Game.prototype = {
	create: function() {
		this.buttons = [];
		this.chainMatrix = [];
		this.chainText = [];

		//For positioning the buttons
		this.delta = 60;
		this.moveX = 110;
		this.moveY = 150;

		//The counter for the goal
		this.removedDotsOfLevelColor = 0;

		//To make sure that update doesn't open more than one popup
		this.winningBol = false;
		this.losingBol = false;

		this.buttonBack = this.add.button(5, 10, 'backButton_symbol', this.backToMenu, this, 1, 0, 2);

		//Image for order of colors
		this.colorOrderImage = this.add.image(220, 15, 'colorOrderI');
		
		this.createButtons();

		this.graph = this.add.graphics(0, 0);

		//The color of dots to collect
		this.levelGameColor = this.colorOfLevel();
		//Number of moves 
		this.numberOfMoves = this.movesOfLevel();
		//Number of dots to collect for the level
		this.numberOfDots = this.dotsOfLevel();
		//Create level with blocks
		this.createLevel();

		//Check for current state, if true start InGameTutoring
		if(this.state.current == 'InGameTutoring'){
			this.tutoringOne();
		}

		//Text in the game
		this.moves = this.add.text(115, 50, 'Moves: 0', { font: '20px Chalkboard', fill: '#000' });
		this.removedColor = this.add.text(530, 50, 'Pink: 0', { font: '20px Chalkboard', fill: '#000' });    	
	},

	//Creates the buttons for the board
	createButtons: function() {
		//  Here we'll create 8 times 8 buttons evenly spaced apart
		for (var i = 0; i < 8; i++){
	        this.buttons[i] = [];
	        this.chainMatrix[i] = [];
        	//this.chainText[i] = [];
	    	for (var j = 0; j < 8; j++){
	    		//Assign random values to a 8X8 matrix
	    		var number = Math.floor((Math.random() * 4) + 1);
	    		var image = this.assignFirstColor(number);

	    		//  Create a button inside of the 'game' group, with the image decided above.
	    		this.buttons[i][j] = this.add.sprite(image);
	        	this.buttons[i][j] = this.add.button(i * this.delta + this.moveX, j * this.delta + this.moveY, image, this.actionOnClick, this, 1, 0, 2);

	        	this.chainMatrix[i][j] = false;
            	//this.chainText[i][j] = this.add.text(i * this.delta + this.moveX, j * this.delta + this.moveY, 'Ch: F', { font: '12px Arial', fill: '#000' });
	    	} 
    	}
	},

	//Assign the first color from a random number
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

	// Returns next color in the order of colors.
	// If stone, stone is returned.
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
	    else {
	    	image = key;
	    }
	    return image;
	},

	//The function that is called when a dot is clicked
	actionOnClick: function(clickedButton) {
		//Check for position I and J in matrix buttons
		var numberI = (clickedButton.x-this.moveX)/this.delta;
	    var numberJ = (clickedButton.y-this.moveY)/this.delta;

	    //Change color on the button that was clicked
	    var newButtonImage = this.changeColorInGame(clickedButton.key);
	    clickedButton.loadTexture(newButtonImage);

	    //  Add counter for number of moves
	    this.numberOfMoves -= 1;

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
	    this.findChainInRow();
	    this.findChainInCol();

	    //this.rearrangeButtons();
	},

	//Find 4 or more in a row
	findChainInRow: function() {
	    //For every row
	    for(var row = 0; row < 8; row++){
	        var middle_chain = 2;
	        var left_chain = 1;
	        var right_chain = 1;

	        var left_k = 2
	        var right_k = 5;

	        //Get color for the buttons in the middle 
	        var color_3 = this.buttons[3][row].key;
	        var color_4 = this.buttons[4][row].key;

	        //If they are the same, check to the left and right in a while-loop
	        if(color_3 === color_4){
	            while(left_k != -1 && this.buttons[left_k][row].key == color_3){
	                left_k--;
	                middle_chain++;
	            }
	            while(right_k != 8 && this.buttons[right_k][row].key == color_3){
	                right_k++;
	                middle_chain++;
	            }
	        }
	        //If different
	        else{
	            //Left color
	            while(left_k >= 0 && this.buttons[left_k][row].key == color_3){
	                left_k--;
	                left_chain++;
	            }
	            //Right color
	            while(right_k < 8 && this.buttons[right_k][row].key == color_4){
	                right_k++;
	                right_chain++;
	            }
	        }

	        //We have a left chain (pos 0, 1, 2, 3 have same color)
	        if( left_chain > 3 ){
	            //Add chain to chainMatrix[][].
	            this.chainMatrix[0][row] = true;
	            this.chainMatrix[1][row] = true;
	            this.chainMatrix[2][row] = true;
	            this.chainMatrix[3][row] = true;
	        }
	        //We have a right chain (pos 4, 5, 6, 7 have same color)
	        if( right_chain > 3 ){
	            //Add chain to chainMatrix[][].
	            this.chainMatrix[4][row] = true;
	            this.chainMatrix[5][row] = true;
	            this.chainMatrix[6][row] = true;
	            this.chainMatrix[7][row] = true;
	        }
	        //We have a chain somewhere in the middle, possibly entire row.
	        if( middle_chain > 3 ){
	            this.chainMatrix[3][row] = true;
	            this.chainMatrix[4][row] = true;

	            //Adjust both variables since while-loops above changes them one too much.
	            left_k++;
	            right_k--;

	            //Add chain to chainMatrix[][]
	            //First to the left from left_k (can be 0, 1, 2) -> 2
	            while(left_k != 3){
	                this.chainMatrix[left_k][row] = true;
	                left_k++;
	            }
	            //And then to the right from right_k (can be 7, 6, 5) -> 5
	            while(right_k != 4){
	                this.chainMatrix[right_k][row] = true;
	                right_k--;
	            }
	        }
	    }
	},

	//Find 4 or more in a col
	findChainInCol: function() {
	    //For every col
	    for(var col = 0; col < 8; col++){
	        var middle_chain = 2;
	        var top_chain = 1;
	        var bottom_chain = 1;

	        var top_k = 2
	        var bottom_k = 5;

	        //Get color for the buttons in the middle  
	        var color_3 = this.buttons[col][3].key;
	        var color_4 = this.buttons[col][4].key;

	        //If they are the same, check to the top and bottom in a while-loop
	        if(color_3 === color_4){
	            while(top_k != -1 && this.buttons[col][top_k].key == color_3){
	                top_k--;
	                middle_chain++;
	            }
	            while(bottom_k != 8 && this.buttons[col][bottom_k].key == color_3){
	                bottom_k++;
	                middle_chain++;
	            }
	        }
	        //If different
	        else{
	            //Top color
	            while(top_k >= 0 && this.buttons[col][top_k].key == color_3){
	                top_k--;
	                top_chain++;
	            }
	            //Bottom color
	            while(bottom_k < 8 && this.buttons[col][bottom_k].key == color_4){
	                bottom_k++;
	                bottom_chain++;
	            }
	        }

	        //We have a chain somewhere in the middle, possibly entire col.
	        if( middle_chain > 3){
	            this.chainMatrix[col][3] = true;
	            this.chainMatrix[col][4] = true;

	            //Adjust both variables since while-loops above changes them one too much.
	            bottom_k--;
	            top_k++;

	            // Add chain to chainMatrix[][]
	            // First up from top_k (can be 0, 1, 2) -> 2
	            while(top_k != 3){
	                this.chainMatrix[col][top_k] = true;
	                top_k++;
	            }
	            // And then down from bottom_k (can be 7, 6, 5) -> 5
	            while(bottom_k != 4){
	                this.chainMatrix[col][bottom_k] = true;
	                bottom_k--;
	            }
	        }
	        //We have a top chain (pos 0, 1, 2, 3 have same color)
	        if( top_chain > 3){
	            this.chainMatrix[col][0] = true;
	            this.chainMatrix[col][1] = true;
	            this.chainMatrix[col][2] = true;
	            this.chainMatrix[col][3] = true;
	        }
	        //We have a bottom chain (pos 4, 5, 6, 7 have same color)
	        if( bottom_chain > 3){
	            this.chainMatrix[col][4] = true;
	            this.chainMatrix[col][5] = true;
	            this.chainMatrix[col][6] = true;
	            this.chainMatrix[col][7] = true;
	        }
	    }
	},

	//Send you back to menu if button is pressed
	backToMenu: function() {
		this.preloadBar = null;
		this.ready = false;
		this.move=0;
		this.state.start('StartMenu');
	},

	//
	rearrangeButtons: function() {
	    var col = 7;
	    while( col >= 0){
	    	var row = 7;
	    	while( row >= 0){

	    		if( this.chainMatrix[col][row] === true){
	    			var counterTrue = 1;

	    			for(var i = row-1; i >= 0; i-- ){
	    				if ( this.chainMatrix[col][i] === true || this.buttons[col][i].key === 'stone'){
	    					counterTrue++;
	    				}
	    				else{
	    					//Make buttons invisible
	    					//this.buttons[col][i].visible = false;

	    					//Call tweenButton
	    					//var temp_y = this.buttons[col][row].y;
	    					//var temp_x = this.buttons[col][row].x
	    					//this.buttons[col][i].visible = false;
	    					//this.tweenButton( this.buttons[col][i], 0, 0);
	    					//this.buttons[col][i].visible = true;

	    					//Check for the levels color
	    					if(this.buttons[col][i+counterTrue].key==this.levelColor){
	    						this.removedDotsOfLevelColor++;
	    					}

	    					//Check that it isn't a stone
	    					while(this.buttons[col][i + counterTrue].key === 'stone') {
	    						counterTrue--;
	    					}

	    					//Flytta ner färger enligt counterTrue
    						var newColor = this.buttons[col][ i ].key;
	    					this.buttons[col][ i + counterTrue ].loadTexture(newColor);
	    					this.chainMatrix[col][ i + counterTrue ] = false;
	    				}
	    			}
	    			counterTrue--;
	    			//Assign color to buttons to make it seem like new dots
	    			while( counterTrue >= 0){
	    				//Get random color
	    				var randomNumber = Math.floor((Math.random() * 4) + 1);
	    				var image = this.assignFirstColor(randomNumber);

	    				//Check for the levels color
	    				if(this.chainMatrix[col][counterTrue]==true && this.buttons[col][counterTrue].key==this.levelColor){
	    						this.removedDotsOfLevelColor++;
	    				}
	    				//Load texture to button and set to false
    					this.buttons[col][counterTrue].loadTexture(image);
    					this.chainMatrix[col][counterTrue] = false;
	    						
	    				counterTrue--;
	    			}
	    			row = -1;
	    		}
	    		else{
	    			row--;
	    		}
	    	}
	    	col--;
	    }
	},

	/*printChainMatrix: function(){
		for(var row = 0; row < 8; row ++){
        	for(var col = 0; col < 8; col++){
            //Update chainText
            this.chainText[col][row].text = 'Ch: ' + this.chainMatrix[col][row];
        	}
    	}
	},*/

	// Function for animation of dots
	// button - the dots to be moved down
	// newPos - to where it should be moved
	tweenButton: function (button, newPosX, newPosY) {
		var tempCircle;

		var green = 0xB6FFDB;
		var pink = 0xFDCCEA;
		var yellow = 0xFDFD7D;
		var blue = 0xB8DBFF;

		var color;

		if(button.key == 'green'){
			color = green;
		}
		else if(button.key == 'pink'){
			color = pink;
		}
		else if(button.key == 'yellow'){
			color = yellow;
		}
		else if(button.key == 'blue'){
			color = blue;
		}

/*
		var tempEmitter = this.add.emitter( 400, 400, 300);
		tempEmitter.makeParticles("bubble");
    	tempEmitter.maxParticleScale = 0.09;
    	tempEmitter.minParticleScale = 0.03;
    	tempEmitter.setYSpeed(-2, -4);
    	tempEmitter.setXSpeed(-3, -5);
    	tempEmitter.gravity = 0;
    	tempEmitter.width = 200;
    	tempEmitter.minRotation = -40;
    	tempEmitter.maxRotation = 40;
    	//tempEmitter.explode(0, 10);
    	tempEmitter.flow(15000, 1000);
*/
    	//this.add.tween(tempEmitter).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

		// draw a circle
		tempCircle = this.graph.beginFill(color, 1);
    	tempCircle = this.graph.drawCircle(button.x+27, button.y+22, 20);

    	// make button under the circle invisible
		//button.visible = false;

		// tween circle to new position
		this.enTween = this.add.tween(tempCircle).to({x: newPosX, y: newPosY + this.delta}, 500, Phaser.Easing.Linear.None, true);
		this.enTween.remove.all();
		//this.add.tween(gem).to({x: newPosX  * GEM_SIZE_SPACED, y: newPosY * GEM_SIZE_SPACED}, 100, Phaser.Easing.Linear.None, true); 
		// tween buttons frame to frame 3
		// works but I'd rather get animation to work.
		//this.add.tween(this.buttons[0][0]).to({frame: 3}, 1000, Phaser.Easing.Linear.None, true, 200)
		//.to({frame: 4}, 1000, Phaser.Easing.Linear.None, true, 200)
		//.to({frame: 5}, 1000, Phaser.Easing.Linear.None, true, 200);

		// make button visible again after the circle has been moved?
		//button.visible = true;
	},

	update: function() {
		//this.findChainInRow();
		//this.findChainInCol();
		//this.printChainMatrix();

		this.rearrangeButtons();
		
		//Update number of moves and removed dots of the right color
		this.moves.text = 'Moves: ' + this.numberOfMoves;
		this.removedColor.text = ': ' + this.removedDotsOfLevelColor + '/' + this.numberOfDots;

		if(this.losingBol == false){
			//Check if you have any moves left
			if(this.numberOfMoves<=0){
				this.losing();
				this.losingBol = true;
			}
		}

		if(this.winningBol == false){
			//Check if you have removed enough dots i the right color
			if(this.removedDotsOfLevelColor>=this.numberOfDots){
				this.winning(this.removedDotsOfLevelColor);
				this.winningBol = true;
			}
		}
	}
};
