"use strict";
// Parent class with common elements of classes Enemy, Player and Gem
class Character {
	constructor(sprite, x, y, scale = true, width = 50, height = 50, draw) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.draw = draw;
	}
	render() {
		if (this.scale) {
			if (gem.draw) {
			    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
			    }
			return;
	    } else {	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	    }
    }
}

// Enemies in the game
class Enemy extends Character {
	constructor(sprite, x, y, scale, width, height)
	{
    	super(sprite, x, y, scale, width, height);
		this.speedIncrement = randomSpeed();
	}
	
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	    this.x += this.speedIncrement * dt;
	    if (this.x > 650) {
	    	this.x = randomStart();
	    	this.speedIncrement = randomSpeed();
		}
	}
}

// Gems are bonus items that appear on certain "levels"
class Gem extends Character {
	constructor(sprite, x, y, scale, width, height, draw)
	{
    	super(sprite, x, y, scale, width, height, draw);
    	
		this.draw = false;
		this.code = 2;
		this.x = 0;
		this.sprites = ["images/GemBlue.png", "images/GemGreen.png", "images/GemOrange.png"];
		this.sprite = this.sprites[this.code];
		this.power = function () {
			switch (this.code) {
			case 0:
				player.lvl -= 5;
				console.log('Your enemies are now slower!');
				break;
			case 1:
				if (player.lives < 5) {
					player.lives += 1;
					console.log('You won a life!');
					} else {player.points += 1000;
					console.log('You won 1000 extra points!');}
				break;
			case 2:
				if (player.points > 0) {
					player.points -= 100;
					player.points *= 2;
					console.log('Your points doubled!');
					} else {player.points = 0;
						console.log('Your score is back to zero.');}
				break;
			default: return;
			}
		}
	}
}

// Player class
class Player extends Character {
	constructor(sprite, x, y, scale, width, height) {
		super(sprite, x, y, scale, width, height);
		this.posIni = [this.x, this.y];
		this.lives = 3;
		this.lvl = 0;
		this.points = 0;
		this.gameOver = false;
	}
	    
	handleInput(move) {
		if (player.gameOver) return;
		
		const incrementY = 82;
		const incrementX = 100;
		switch (move) {
			case "up":
				if (this.y === -5){break;}
				this.y -= incrementY;
				//console.log('new y is '+this.y);
				break;
			case "down":
				if (this.y === 405){break;}
				this.y += incrementY;
				//console.log('new y is '+this.y);
				break;
			case "right":
				if (this.x === 400){break;}
				this.x += incrementX;
				//console.log('new x is '+this.x);
				break;
			case "left":
				if (this.x === 0){break;}
				this.x -= incrementX;
				//console.log('new x is '+this.x);
				break;
		}
	}
}

// This function returns a random integer between two numbers 
function randomNumInInterval(a, b) {
	return (Math.floor(Math.random() * (a - b) + b));
}

// This function returns a random start position off screen for enemies
function randomStart() {
	let startPos;
	const a = -600
	const b = -150;
	startPos = randomNumInInterval(a, b);
	return startPos;
}

// This function returns a random speed withing an interval that depends on player level
function randomSpeed() {
	let speed;
	const lSpeed = 50; // lower base speed
	const hSpeed = 200; // higher base speed
	speed = randomNumInInterval(hSpeed + player.lvl * 10, lSpeed + player.lvl * 10); //increase random speeds when level increases
	return speed;
}

// Now instantiate your objects.

// Place the player object in a variable called player
let player = new Player("images/char-boy.png", 200, 405, false); // player has to be instantiated before enemies because enemy speed depends on player's properties.

let enemyLair = [{}]; // Enemy objects stay in the enemyLair array of objects until they are transfered to allEnemies array. This happens when player progresses in the game.
let yArray = [67, 149, 231]; // array with heights of enemies on screen

// Populate array enemyLair with enemies.
for (let enemyTrio = 0; enemyTrio < 2; enemyTrio++) {
	for (let y in yArray) {
		enemyLair.push(new Enemy('images/enemy-bug.png', randomStart(), yArray[y], false));
	}
}

// Place start enemy object in allEnemies
let allEnemies = [enemyLair.pop()];

// Create a gem
let gem = new Gem(null, 0, 50, true, 45, 60);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    
    return;
});

// Event listener to click on control buttons
document.addEventListener('click', function(event) {
		let btn = event.target.id;
		return player.handleInput(btn);
		} );