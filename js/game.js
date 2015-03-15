// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "http://www.joshgrib.com/projects/gpp2015/images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "http://www.joshgrib.com/projects/gpp2015/images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "http://www.joshgrib.com/projects/gpp2015/images/monster.png";

// Game objects
var hero = {
	speed: 2500 // movement in pixels per second
};
var monster = {
	speed: 100
};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var i = 0;

// Reset the game when the player catches a monster
var reset = function () {
	
	if (i == 0){
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
		i = 1;
	} else {
		hero.x = monster.x;
		hero.y = monster.y;
	}

	// Place the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 96));
	monster.y = 32 + (Math.random() * (canvas.height - 96));
};

// Update game objects
var update = function (modifier) {
	//stop hero from leaving the box
	if (hero.x >= 448) {
		hero.x = 448;
	}
	if (hero.y >= 416) {
		hero.y = 416;
	}
	if (hero.x <= 32) {
		hero.x = 32;
	}
	if (hero.y <= 32) {
		hero.y = 32;
	}
	
	//stop monster from leaving the box
	if (monster.x >= 448) {
		monster.x = 448;
	}
	if (monster.y >= 416) {
		monster.y = 416;
	}
	if (monster.x <= 32) {
		monster.x = 32;
	}
	if (monster.y <= 32) {
		monster.y = 32;
	}
	
	//direction controls
	if (38 in keysDown) { // Player holding up
		hero.y -= 2 * hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += 2 * hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= 2 * hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += 2 * hero.speed * modifier;
	}
	
	//Have monster evade hero
	if ((hero.x - monster.x) <= 0) {
		monster.x += monster.speed * modifier;
	}
	if ((hero.x - monster.x) > 0) {
		monster.x -= monster.speed * modifier;
	}
	if ((hero.y - monster.y) <= 0) {
		monster.y += monster.speed * modifier;
	}
	if ((hero.y - monster.y) > 0) {
		monster.y -= monster.speed * modifier;
	}
	
	
	//Have hero chase monster
	if ((hero.x - monster.x) <= 0) {
		hero.x += hero.speed * modifier;
	}
	if ((hero.x - monster.x) > 0) {
		hero.x -= hero.speed * modifier;
	}
	if ((hero.y - monster.y) <= 0) {
		hero.y += hero.speed * modifier;
	}
	if ((hero.y - monster.y) > 0) {
		hero.y -= hero.speed * modifier;
	}
	
	
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	var timer = Date();
	var time = 60000 - (Date() - time);
	
	var d = new Date();
	d.setSeconds(60);
	var n = d.getSeconds();
	
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters captured: " + monstersCaught, 32, 4);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Lets play this game!
var then = Date.now();
reset();
main();
