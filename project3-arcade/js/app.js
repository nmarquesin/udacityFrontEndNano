// Enemies our player must avoid
class Enemy {
	constructor(posY = 231, width = 50, height = 50){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    	this.sprite = 'images/enemy-bug.png';
		this.x = randomStart();
		this.y = posY;
		this.speedIncrement = randomSpeed();
		this.width = width;
		this.height = height;
	}
	


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
	update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedIncrement;
    if (this.x > 600) {
    	this.x = randomStart();
    	this.speedIncrement = randomSpeed();
	}}

// Draw the enemy on the screen, required method for game
	render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

function randomNumInInterval(a, b) {
	return (Math.random() * (a - b) + b);
}

// This function returs a random start position off screen for enemies
function randomStart() {
	let startPos;
	const a = -600;
	const b = -200;
	startPos = randomNumInInterval(a, b);
	return startPos;
}

// This function returns a random speed withing an interval that depends on player level
function randomSpeed() {
	let speed;
	const lSpeed = 5; // lower base speed
	const hSpeed = 10; // higher base speed
	speed = randomNumInInterval(hSpeed + player.lvl, lSpeed + player.lvl); //increase random speeds when level increases
	return speed;
}

// Now write your own player class

class Player {
	constructor(posX = 200, posY = 405, width = 50, height = 50){
		this.sprite = "images/char-boy.png";
		this.posIni = [posX, posY];
		this.x = posX;
		this.y = posY;
		this.width = width;
		this.height = height;
		this.lives = 3;
		this.lvl = 0;
		this.points = 0;
		this.gameOver = false;
	}

// This class requires an update(), render() and
// a handleInput() method.
	
	update(dt) {}
	render() {
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	    return;
	    }
	    
	handleInput(move) {
		if (player.gameOver) return;
		
		const incrementY = 82;
		const incrementX = 102;
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
				if (this.x === 404){break;}
				this.x += incrementX;
				//console.log('new x is '+this.x);
				break;
			case "left":
				if (this.x === -4){break;}
				this.x -= incrementX;
				//console.log('new x is '+this.x);
				break;
		}
	}
	
}


// Now instantiate your objects.

// Place the player object in a variable called player
let player = new Player(); // player has to be instantiated before enemies because enemy speed depends on player's properties.

let e1 = new Enemy(67);
let e2 = new Enemy(149);
let e3 = new Enemy(231);

let allEnemies = [e1, e2, e3];
// Place all enemy objects in an array called allEnemies
//let allEnemies = [new Enemy(), new Enemy(-150, 149, 6)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //console.log(e.keyCode);
    //console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
    
    return;
});