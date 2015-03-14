//shouldn't be needed because I do it in HTML
//Create the canvas
var canvas = document.createElement("canvas"); //create the canvas
var ctx = canvas.getContext("2d"); //used to issue drawing commands
canvas.width = 1024; //set width
canvas.height = 768; //set height
document.body.appendChild(canvas); //add it to the document


//Background image
var bgReady = false; //waits for the image to load before drawing it to avoid DOM errors
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "http://upload.wikimedia.org/wikipedia/commons/b/b5/Te_Pureora_forest_1.jpg";

//Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
};
heroImage.src = "https://gp6.googleusercontent.com/-mEyL34SDfqY/AAAAAAAAAAI/AAAAAAAAAAA/RH3B9RN0W6U/s48-c-k-no/photo.jpg";

//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
    monsterReady = true;
};
monsterImage.src = "https://gp5.googleusercontent.com/-DyGav9oI6LY/AAAAAAAAAAI/AAAAAAAAAAA/pt38gwfDxVE/s48-c-k-no/photo.jpg";

//Game objects
var hero = {
    speed : 100; //pixels per second
    x: 0;
    y: 0;
};
var monster = {
    x: 0;
    y: 0;
};
var monstersCaught = 0;

//keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//reset some stuff to begin a new game/level/whatever
var reset = function () {
    /* I don't want this
    //Reset the game when the player catches a monster
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    */
    //put the monster somewhere random
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//Update game objects to create movement
var update = function (modifier) {
    //worth noting (0,0) in the canvas is the top left corner
    if (38 in keysDown) { //move hero up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { //move hero down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { //move hero left
        hero.x -= hero.speed * modifier;
    }
    if (38 in keysDown) { //move hero right
        hero.x += hero.speed * modifier;
    }
    
    //Are the hero and monster touching? If so reset
    if (
        hero.x <= (monster.x + 32) &&
        monster.x <= (hero.x + 32) &&
        hero.y <= (monster.x + 32) &&
        monster.y <= (hero.x + 32)
        ) {
          ++monstersCaught;
          reset();
        }
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

// Let's play this game!
var then = Date.now();
reset();
main();
