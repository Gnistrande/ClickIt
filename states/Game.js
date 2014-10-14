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
	this.player;

	this.levelGameColor;
	this.numberOfMoves;
	this.numberOfDots;
	this.removedDotsOfLevelColor;
	this.removedColor;
	this.winningBol;
	this.losingBol;

	this.tweenOnChain;

	this.chainAnims;

};

ClickIt.Game.prototype = {
	create: function() {
		//colorOrderImage = this.add.image(250, 0, 'colorOrderI');

		this.buttons = [];
		this.chainMatrix = [];
		this.chainText = [];

		this.delta = 60;
		this.moveX = 110;
		this.moveY = 150;

		this.removedDotsOfLevelColor = 0;

		this.winningBol = false;
		this.losingBol = false;

		this.buttonBack = this.add.button(5, 10, 'backButton_symbol', this.backToMenu, this, 1, 0, 2);

		this.colorOrderImage = this.add.image(220, 15, 'colorOrderI');
		
		this.createButtons();

		this.graph = this.add.graphics(0, 0);

		//Gives the color of dots to collect, number of moves 
		//and number of dots to collect for the level
		this.levelGameColor = this.colorOfLevel();
		this.numberOfMoves = this.movesOfLevel();
		this.numberOfDots = this.dotsOfLevel();

		this.createLevel(this.levelGameColor);

		this.moves = this.add.text(115, 50, 'Moves: 0', { font: '20px Chalkboard', fill: '#000' });
		this.removedColor = this.add.text(530, 50, 'Pink: 0', { font: '20px Chalkboard', fill: '#000' });

    	player = this.add.sprite(32, this.world.height - 350, 'dude');
    	player.animations.add('left', [0, 1, 2, 3], 10, true);

    	this.tweenOnChain = this.add.group();
    	this.chainAnims = this.add.group();
    	
	},

	createButtons: function() {
		//  Here we'll create 8 times 8 of buttons evenly spaced apart
		for (var i = 0; i < 8; i++){
	        this.buttons[i] = [];
	        this.chainMatrix[i] = [];
        	this.chainText[i] = [];
	    	for (var j = 0; j < 8; j++){
	    		//Assign random values to a 8X8 matrix
	    		var number = Math.floor((Math.random() * 4) + 1);

	    		var image = this.assignFirstColor(number);
	    		//var image = 'green';

	    		//  Create a button inside of the 'game' group, with the image decided above.
	    		this.buttons[i][j] = this.add.sprite(image);
	        	this.buttons[i][j] = this.add.button(i * this.delta + this.moveX, j * this.delta + this.moveY, image, this.actionOnClick, this, 1, 0, 2);
				this.buttons[i][j].animations.add('explode', [1, 2, 3], 5, true);

	        	this.chainMatrix[i][j] = false;
            	//this.chainText[i][j] = this.add.text(i * this.delta + this.moveX, j * this.delta + this.moveY, 'Ch: F', { font: '12px Arial', fill: '#000' });
	    	} 
    	}
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
	    else {
	    	image = key;
	    }
	    return image;
	},

	actionOnClick: function(clickedButton) {
		//Check for position I and J in buttons
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

	    // MÅSTE egentligen ligga i update?
	    if( this.tweenOnChain != null ){
	    	//this.tweenOnChain.removeAll();

	    	//this.tweenOnChain.forEachAlive(function(tC) { 
     		//	tC.kill();
     		//} , this);

	    }

	    this.findChainInRow();
	    this.findChainInCol();

	    //this.tweenOnChain = this.make.tween(this.buttons[0][0])
		//.to({frame: 3}, 100, Phaser.Easing.Linear.None, false, 100);

		//this.tweenOnChain.add.onComplete(this.rearrangeButtons, this);

	    if( this.tweenOnChain != null ){
	    	//this.tweenOnChain.add.onComplete(this.rearrangeButtons, this);
	    	//this.add.tween.start();
	    }

	    

	    //while( this.tweenOnChain === null || this.tweenOnChain.isRunning === false){
		//	this.rearrangeButtons();
		//}

	    //this.rearrangeButtons();
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

	// Kallar också på tweenChain() för att animera en chain
	findChainInRow: function() {
	    // 1. För varje rad
	    for(var row = 0; row < 8; row++){
	        var middle_chain = 2;
	        var left_chain = 1;
	        var right_chain = 1;

	        var left_k = 2
	        var right_k = 5;

	        // Hämta mitten-färgerna. 
	        var color_3 = this.getColorInt(this.buttons[3][row].key);
	        var color_4 = this.getColorInt(this.buttons[4][row].key);

	        //Om samma kolla åt vänster och höger med while-loop
	        if(color_3 === color_4){
	            while(left_k != -1 && this.getColorInt(this.buttons[left_k][row].key) == color_3){
	                left_k--;
	                middle_chain++;
	            }
	            while(right_k != 8 && this.getColorInt(this.buttons[right_k][row].key) == color_3){
	                right_k++;
	                middle_chain++;
	            }
	        }
	        //Om olika
	        else{
	            //hämta först vänster färg och while-loopa
	            while(left_k >= 0 && this.getColorInt(this.buttons[left_k][row].key) == color_3){
	                left_k--;
	                left_chain++;
	            }
	            //och sen högra
	            while(right_k < 8 && this.getColorInt(this.buttons[right_k][row].key) == color_4){
	                right_k++;
	                right_chain++;
	            }
	        }
	        //We have a left chain (pos 0, 1, 2, 3 have same color)
	        if( left_chain > 3 ){
	            //console.log("We have a left_chain! Row = " + row)

	            //Add chain to chainMatrix[][].
	            this.chainMatrix[0][row] = true;
	            this.chainMatrix[1][row] = true;
	            this.chainMatrix[2][row] = true;
	            this.chainMatrix[3][row] = true;

	            this.tweenChain(0, row);
	            this.tweenChain(1, row);
	            this.tweenChain(2, row);
	            this.tweenChain(3, row);
	        }
	        //We have a right chain (pos 4, 5, 6, 7 have same color)
	        if( right_chain > 3 ){
	            //console.log("We have a right_chain! Row = " + row);

	            //Add chain to chainMatrix[][].
	            this.chainMatrix[4][row] = true;
	            this.chainMatrix[5][row] = true;
	            this.chainMatrix[6][row] = true;
	            this.chainMatrix[7][row] = true;

	            this.tweenChain(4, row);
	            this.tweenChain(5, row);
	            this.tweenChain(6, row);
	            this.tweenChain(7, row);
	        }
	        //We have a chain somewhere in the middle, possibly entire row.
	        if( middle_chain > 3 ){
	            //console.log("We have a middle_chain! Row = " + row);

	            this.chainMatrix[3][row] = true;
	            this.chainMatrix[4][row] = true;

	            this.tweenChain(3, row);
	            this.tweenChain(4, row);

	            //Adjust both variables since while-loops above changes them one too much.
	            left_k++;
	            right_k--;

	            // Add chain to chainMatrix[][]
	            // First to the left from left_k (can be 0, 1, 2) -> 2
	            while(left_k != 3){
	                this.chainMatrix[left_k][row] = true;
	                this.tweenChain(left_k, row);
	                left_k++;
	            }
	            // And then to the right from right_k (can be 7, 6, 5) -> 5
	            while(right_k != 4){
	                this.chainMatrix[right_k][row] = true;
	                this.tweenChain(right_k, row);
	                right_k--;
	            }
	        }
	    }
	},

	// Kallar också på tweenChain() för att animera en chain
	findChainInCol: function() {
	    // 1. För varje rad
	    for(var col = 0; col < 8; col++){

	        var middle_chain = 2;
	        var top_chain = 1; // top
	        var bottom_chain = 1; // bottom

	        var top_k = 2
	        var bottom_k = 5;

	        // Hämta mitten-färgerna. 
	        var color_3 = this.getColorInt(this.buttons[col][3].key);
	        var color_4 = this.getColorInt(this.buttons[col][4].key);

	        //Om samma kolla uppåt och neråt med while-loop
	        if(color_3 === color_4){
	            while(top_k != -1 && this.getColorInt(this.buttons[col][top_k].key) == color_3){
	                top_k--;
	                middle_chain++;
	            }
	            while(bottom_k != 8 && this.getColorInt(this.buttons[col][bottom_k].key) == color_3){
	                bottom_k++;
	                middle_chain++;
	            }
	        }
	        //Om olika
	        else{
	            //hämta först färgen över och while-loopa uppåt
	            while(top_k >= 0 && this.getColorInt(this.buttons[col][top_k].key) == color_3){
	                top_k--;
	                top_chain++;
	            }
	            //och sen färgen under och while-loopa neråt
	            while(bottom_k < 8 && this.getColorInt(this.buttons[col][bottom_k].key) == color_4){
	                bottom_k++;
	                bottom_chain++;
	            }
	        }

	        if( middle_chain > 3){
	            this.chainMatrix[col][3] = true;
	            this.chainMatrix[col][4] = true;

	            this.tweenChain(col, 3);
	            this.tweenChain(col, 4);

	            //Adjust both variables since while-loops above changes them one too much.
	            bottom_k--;
	            top_k++;

	            // Add chain to chainMatrix[][]
	            // First up from top_k (can be 0, 1, 2) -> 2
	            while(top_k != 3){
	                this.chainMatrix[col][top_k] = true;
	                this.tweenChain(col, top_k);
	                top_k++;
	            }
	            // And then down from bottom_k (can be 7, 6, 5) -> 5
	            while(bottom_k != 4){
	                this.chainMatrix[col][bottom_k] = true;
	                this.tweenChain(col, bottom_k);
	                bottom_k--;
	            }
	        }
	        if( top_chain > 3){
	            this.chainMatrix[col][0] = true;
	            this.chainMatrix[col][1] = true;
	            this.chainMatrix[col][2] = true;
	            this.chainMatrix[col][3] = true;

	            this.tweenChain(col, 0);
	            this.tweenChain(col, 1);
	            this.tweenChain(col, 2);
	            this.tweenChain(col, 3);
	        }
	        if( bottom_chain > 3){
	            this.chainMatrix[col][4] = true;
	            this.chainMatrix[col][5] = true;
	            this.chainMatrix[col][6] = true;
	            this.chainMatrix[col][7] = true;

	            this.tweenChain(col, 4);
	            this.tweenChain(col, 5);
	            this.tweenChain(col, 6);
	            this.tweenChain(col, 7);
	        }
	    }
	},

	backToMenu: function() {
		this.preloadBar = null;
		this.ready = false;
		this.move=0;
		this.state.start('StartMenu');
	},

	// Utifrån chain(s) ska vissa knappar disablas och vissa ska arrangeras om. Buttons ovan (om det finns) ska ramla ner.
	//Använda sig av assignFirstColor eller changeColorInGame?
	//Använda bubbelSort för att swapa ner raden ovanför. Sätta dem till true och chain-raden till false.
	rearrangeButtons: function() {
	    console.log("\nrearrangeButtons() ! ");

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
	    					this.buttons[col][i].visible = false;

	    					//Call tweenButton
	    					// Vet inte varför måste kalla med 0 0
	    					var temp_y = this.buttons[col][row].y;
	    					var temp_x = this.buttons[col][row].x
	    					this.tweenButton( this.buttons[col][i], 0, 0);

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
	    			while( counterTrue >= 0){
	    				var randomNumber = Math.floor((Math.random() * 4) + 1);
	    				var image = this.assignFirstColor(randomNumber);
	    				//var image = 'agnes';

	    				//Check for the levels color
	    				if(this.chainMatrix[col][counterTrue]==true && this.buttons[col][counterTrue].key==this.levelColor){
	    						this.removedDotsOfLevelColor++;
	    				}

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


	tweenChain: function (col, row) {
		console.log("tween chain! col: " + col + " row: " + row);

		var tempT = this.add.tween(this.buttons[col][row])
		.to({frame: 3}, 100, Phaser.Easing.Linear.None, false, 100)
		.to({frame: 4}, 100, Phaser.Easing.Linear.None, false, 100)
		.to({frame: 5}, 100, Phaser.Easing.Linear.None, false, 100)
		.start();

		tempT.add.onChainComplete(this.rearrangeButtons, this);

/*
		if( this.tweenOnChain === null){
			this.tweenOnChain = this.make.tween(this.buttons[col][row])
			.to({frame: 3}, 100, Phaser.Easing.Linear.None, false, 100)
			.to({frame: 4}, 100, Phaser.Easing.Linear.None, false, 100)
			.to({frame: 5}, 100, Phaser.Easing.Linear.None, false, 100);
		}
		else{
			this.tweenOnChain = this.make.tween(this.buttons[col][row])
			.to({frame: 3}, 100, Phaser.Easing.Linear.None, false, 100)
			.to({frame: 4}, 100, Phaser.Easing.Linear.None, false, 100)
			.to({frame: 5}, 100, Phaser.Easing.Linear.None, false, 100);
		}
*/

	},


	// Function for animation of dots
	// button - the dots to be moved down
	// newPos - to where it should be moved
	// Draws a temporary circle that acts as animation and falls down. This circle is then removed.
	tweenButton: function (button, newPosX, newPosY) {

		console.log("Tweening Button!");
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

		// draw a circle
		tempCircle = this.graph.beginFill(color, 1);
    	tempCircle = this.graph.drawCircle(button.x+20, button.y+20, 15);

    	// make button under the circle invisible
		button.visible = false;

		// tween circle to new position
		this.add.tween(tempCircle).to({x: newPosY, y: newPosX + this.delta}, 500, Phaser.Easing.Linear.None, true);

		// make button visible again after the circle has been moved?
		button.visible = true;
		button.alpha = 0.5;

		tempCircle.kill();
	},


	printChainMatrix: function(){
		for(var row = 0; row < 8; row ++){
        	for(var col = 0; col < 8; col++){
            //Update chainText
            this.chainText[col][row].text = 'Ch: ' + this.chainMatrix[col][row];
        	}
    	}
	},


	update: function() {
		//this.findChainInRow();
		//this.findChainInCol();

		//this.tweenOnChain.onComplete.add(this.rearrangeButtons, this);

		//while( this.tweenOnChain === null || this.tweenOnChain.isRunning === false){
		//	this.rearrangeButtons();
		//}

		
		if( this.input.activePointer.isDown ){
			player.animations.play('left');
		}
		else{
        	player.frame = 4;
		}


		//Update number of moves and removed dots of the right color
		this.moves.text = 'Moves: ' + this.numberOfMoves;
		this.removedColor.text = ': ' + this.removedDotsOfLevelColor + '/' + this.numberOfDots;

		//this.printChainMatrix();

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

