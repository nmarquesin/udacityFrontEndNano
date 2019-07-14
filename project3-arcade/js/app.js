// Enemies our player must avoid
class Enemy {
	constructor(posX = -160, posY = 231, speed = 5, width = 50, height = 50){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    	this.sprite = 'images/enemy-bug.png';
		this.x = posX;
		this.xIni = posX;
		this.y = posY;
		this.speedIncrement = speed;
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
    if (this.x > 1000) this.x = this.xIni;
	}

// Draw the enemy on the screen, required method for game
	render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

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
	}

// This class requires an update(), render() and
// a handleInput() method.
	
	update(dt) {}
	render() {
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	    return;
	    }
	    
	handleInput(move) {
		const incrementY = 82;
		const incrementX = 102;
		switch (move) {
			case "up":
				if (this.y === -5){break;}
				this.y -= incrementY;
				console.log('new y is '+this.y);
				break;
			case "down":
				if (this.y === 405){break;}
				this.y += incrementY;
				console.log('new y is '+this.y);
				break;
			case "right":
				if (this.x === 404){break;}
				this.x += incrementX;
				console.log('new x is '+this.x);
				break;
			case "left":
				if (this.x === -4){break;}
				this.x -= incrementX;
				console.log('new x is '+this.x);
				break;
		}
	}
	
}


// Now instantiate your objects.

/*
// Random positions and speeds for enemies
function randPosAndSpeed(p) {
	// Randomly decides if enemy will be in row 1, 2 or 3.
	let yRow = Math.floor(Math.random() * Math.floor(3));
	let posY;
	switch(yRow){
		case 0: 
			posY = 67; // y value for row 1
			break;
		case 1: 
			posY = 149; // y value for row 2
			break;
		case 2: 
			posY = 231; // y value for row 3
			break;
		default:
		}
		
	let posX = -200; // enemies start off-canvas
	
	let speed = function (level) {
		let maxBaseSpeed = 10;
		let minBaseSpeed = 5;
		return Math.random() * ((maxBaseSpeed + p.lvl) - (minBaseSpeed + p.lvl)) + (minBaseSpeed + p.lvl); //increase random speeds when level increases
	}
	
	console.log(posX, posY, speed);
  return [posX, posY, speed];
}

// Make 4 enemies
let allEnemies = [];
for (let e = 0; e < 4; e++) {
	allEnemies.push(new Enemy(randPosAndSpeed(player)));

let xYS1 = randPosAndSpeed(player);
let xYS2 = randPosAndSpeed(player);
let xYS3 = randPosAndSpeed(player);
let xYS4 = randPosAndSpeed(player);
*/
let e1 = new Enemy(-200, 67, 7);
let e2 = new Enemy(-200, 149, 5);
let e3 = new Enemy(-200, 231, 10);


let allEnemies = [e1, e2, e3];
// Place all enemy objects in an array called allEnemies
//let allEnemies = [new Enemy(), new Enemy(-150, 149, 6)];

// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(e.keyCode);
    console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
    
    return;
});