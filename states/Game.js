ClickIt.Game = function(game) {
	this.colorOrderImage;

	this.buttons;
	this.delta;
	this.moves1;
	this.moves2;
	this.buttonBack;
	this.chainMatrix;
	this.chainText;
	this.moveX;
	this.moveY;

	this.graph;
	this.enTween;
	this.newTween;
	this.dot;
	//this.tempCircle;

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
		this.tweenDone = false;

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
		this.moves1 = this.add.text(115, 55, 'Moves: ', { font: '15px Chalkboard', fill: '#000' });
		this.moves2 = this.add.text(165, 50, '0', { font: '23px Chalkboard', fill: '#000' });
		this.removedColor1 = this.add.text(530, 50, '0', { font: '23px Chalkboard', fill: '#000' });
		this.removedColor2 = this.add.text(560, 55, '/' + this.numberOfDots, { font: '15px Chalkboard', fill: '#000' });    	
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
	    //this.findChainInRow();
	    //this.findChainInCol();

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
	    			this.animateExplosion(col, row);

	    			for(var i = row-1; i >= 0; i-- ){
	    				if ( this.chainMatrix[col][i] === true || this.buttons[col][i].key === 'stone'){
	    					counterTrue++;
	    					this.animateExplosion(col, i);
	    				}
	    				else{
	    					//Check for the levels color
	    					if(this.buttons[col][i+counterTrue].key==this.levelColor){
	    						this.removedDotsOfLevelColor++;
	    					}

	    					//Check that it isn't a stone
	    					while(this.buttons[col][i + counterTrue].key === 'stone') {
	    						counterTrue--;
	    					}

	    					//Call tweenButton after checking for stone
	    					this.tweenButton(col, i, counterTrue);

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

    					//Tween button
	    				this.tweenNewButton(col, counterTrue);
	    						
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

	animateExplosion: function(col, row){
		var temp_x = this.buttons[col][row].x;
	    var temp_y = this.buttons[col][row].y;

		// create explosion
		var tempEmitter = this.add.emitter(temp_x+25, temp_y+25);
		tempEmitter.makeParticles("bubble");
		tempEmitter.maxParticleScale = 0.09;
		tempEmitter.minParticleScale = 0.03;
		tempEmitter.setYSpeed(-10, 10);
		tempEmitter.setXSpeed(-10, 10);
		tempEmitter.gravity = 0;
		tempEmitter.width = 30;
		tempEmitter.height = 30;
		tempEmitter.explode(0, 5);

		this.add.tween(tempEmitter).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true)
		.onComplete.add( function() {
			tempEmitter.destroy();
		});
	},

	//Tweens the buttons that gets a new color assigned to them in rearrangeButtons
	tweenNewButton: function (col, counterTrue) {
		var temp_x = this.buttons[col][counterTrue].x;
	    var temp_y = this.buttons[col][counterTrue].y;

	    //console.log(counterTrue);

	    this.buttons[col][counterTrue].visible = false;

	    var dot = this.add.sprite(this.buttons[col][counterTrue].x, this.buttons[col][counterTrue].y-(counterTrue+1)*this.delta, this.buttons[col][counterTrue].key, 0);
	    //var dot = this.add.sprite(this.buttons[col][counterTrue].x, this.buttons[col][counterTrue].y-this.delta, this.buttons[col][counterTrue].key, 0);
	    //dot.scale.set(0.7);

	    dot.alpha = 0;

		// tween sprite to new position
		this.newTween = this.add.tween(dot).to({x: temp_x, y: temp_y, alpha: 1}, 1000, Phaser.Easing.Bounce.Out, true, 1000/(counterTrue+1));

		this.newTween.onComplete.add(function() {
			this.buttons[col][counterTrue].visible = true;
			dot.destroy();
		}, this);
	},

	// Function for animation of dots
	// col, i - the position the dots are to be moved down to
	// counterTrue - how many steps it should be moved
	tweenButton: function (col, i, counterTrue) {

		var temp_x = this.buttons[col][i+counterTrue].x;
	    var temp_y = this.buttons[col][i+counterTrue].y;


		//A sprite for the temporary circle
    	var dot = this.add.sprite(this.buttons[col][i].x, this.buttons[col][i].y, this.buttons[col][i].key, 0);

    	// Button under the circle is made invisible
		this.buttons[col][i].visible = false;
		this.buttons[col][i+counterTrue].visible = false;

		// tween sprite to new position
		this.enTween = this.add.tween(dot).to({x: temp_x, y: temp_y}, 1000, Phaser.Easing.Bounce.Out, true);
		//this.enTween = this.add.tween(tempCircle).to({x: 0, y: 0 + this.delta * this.tweenCounter}, 1000, Phaser.Easing.Linear.None, true);

		this.enTween.onComplete.add(function() {
			this.buttons[col][i+counterTrue].visible = true;
			dot.destroy();
			//this.buttons[col][i].visible = true;
		}, this);
	},

	update: function() {
		this.findChainInRow();
		this.findChainInCol();
		//this.printChainMatrix();



		this.rearrangeButtons();
		
		//Update number of moves and removed dots of the right color
		this.moves2.text = this.numberOfMoves;
		this.removedColor1.text = ': ' + this.removedDotsOfLevelColor;

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
