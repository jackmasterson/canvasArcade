// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = 100;
    this.y = y;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //enemy speed 

    var time = new Date().getTime() * (0.0002);

    for (var i = 0; i < allEnemies.length; i++) {
        //   console.log(allEnemies[0].x);
        allEnemies[i].x = (Math.tan(time) * 600 + 10);

        var speed = (Math.tan(time) * 600 + 100);

        allEnemies[0].x = speed + 1000;
        allEnemies[1].x = speed - 1000;
        allEnemies[3].x = (Math.tan(time * 0.05) * 600 + 100);
        allEnemies[4].x = (Math.tan(time * 2.05) * 600 + 100);
        allEnemies[i].x = speed - (time * 500);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = ['images/char-cat-girl.png'];
    this.x = 200;
    this.y = 400;
};


Player.prototype.update = function(dt) {

    //detects if there is a collision between the player and either the
    //water or an enemy/obstacle by comparing each's x and y coordinates.
    //if they all equal the same values, then it initiates the startOver
    //function, resetting the player's x and y coordinates and adding to
    //either the Losses or the Levels value
    //detects if there is a collision between the player and either the
    //water or an enemy/obstacle by comparing each's x and y coordinates.
    //if they all equal the same values, then it initiates the startOver
    //function, resetting the player's x and y coordinates and adding to
    //either the Losses or the Levels value

    Player.prototype.collisionDetection = function() {
        for (var c = 0; c < allEnemies.length; c++) {
            var en = allEnemies[c];

            var plCoord = [player.x, player.y];
            var enCoord = [en.x, en.y];

            if (player.x == Math.floor(en.x) && player.y == en.y) {
                Player.prototype.youLose();
            } else {
                if (player.x == Math.ceil(en.x) && player.y == en.y) {
                    Player.prototype.youLose();
                }
                if (player.y == -50) {
                    Player.prototype.youWin();
                }
            }
        }
        for (c = 0; c < allObstacles.length; c++) {
            var ob = allObstacles[c];
            //              console.log(allObstacles[c].y);
            if (player.x == Math.floor(ob.x) && player.y == (ob.y - 90)) {
                Player.prototype.youLose();
            } else {
                if (player.x == Math.ceil(ob.x) && player.y == (ob.y - 90)) {
                    Player.prototype.youLose();
                }

            }
        }
        for (c = 0; c < allMowers.length; c++) {
            var mow = allMowers[c];
            //              console.log(allObstacles[c].y);
            if (player.x == Math.floor(mow.x) && player.y == (mow.y)) {
                Player.prototype.youLose();
            } else {
                if (player.x == Math.ceil(mow.x) && player.y == (mow.y)) {
                    Player.prototype.youLose();
                }
                console.log(mow.y);
            }
        }
    };

    Player.prototype.collisionDetection();

    //detects when the collision is with an enemy or obstacle and
    //quickly toggles the 'loser' graphic

    Player.prototype.youLose = function() {
        Player.prototype.startOver();
        if ($('#loser').css('display') == 'none') {
            $('#loser').toggle(1000);
        }
        if ($('#loser').css('display') == 'block') {
            $('#loser').toggle(1000);
        }

        var currentValue = parseInt($('#losses').text(), 10);
        var newValue = currentValue + 1;
        $('#losses').text(newValue);

        allLives.pop();

        if (newValue == 3) {
            Player.prototype.gameOver();
        }
    };

    //displays the 'Game Over' graphic
    Player.prototype.gameOver = function() {
        $('body').append('#gameOver');
        if ($('#gameOver').css('display') == 'none') {
            $('#gameOver').toggle(2000);
        }
    }
};

//detects if the collision is with water, toggles the 'winner winner'
//graphic; invokes the levelUp function; adds a life if you reach level
// 5, displays the champion graphic if you get to level 10
//also invokes the levelFour function which adds lawn mower enemies
// at level four and beyond

Player.prototype.youWin = function() {
    Player.prototype.startOver();
    if ($('#winner').css('display') == 'none') {
        $('#winner').toggle(1500);
    }
    if ($('#winner').css('display') == 'block') {
        $('#winner').toggle(1500);
    }
    var currentValue = parseInt($('#wins').text(), 10);
    var newValue = currentValue + 1;
    $('#wins').text(newValue);

    Player.prototype.levelUp();

    if (newValue == 5) {
        allLives.push(new Life(400, 500));
    }
    if (newValue == 10) {
        if ($('#champion').css('display') == 'none') {
            $('#champion').toggle(2500);
        }
    }

    if (newValue > 3) {
        Player.prototype.levelFour();
    }
};

Player.prototype.startOver = function() {
    player.x = 200;
    player.y = 400;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//controls player movement
Player.prototype.handleInput = function() {

    if (event.keyCode == 37) {
        this.x -= 100;
    }
    if (event.keyCode == 39) {
        this.x += 100;
    }
    if (event.keyCode == 38) {
        this.y -= 90;
    }
    if (event.keyCode == 40) {
        this.y += 90;
    }

    //ensures player remains on the screen
    if (this.x > 490) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
};

//with each levelUp, a new obstacle is added at a random x and y coordinate

Player.prototype.levelUp = function() {
    var Obstacle = function(randX, randY) {
        var xCoord = [0, 100, 200, 300, 400];
        var yCoord = [130, 220, 310];
        this.sprite = 'images/enemy.png';
        this.x = randX = xCoord[Math.floor(Math.random() * xCoord.length)];
        this.y = randY = yCoord[Math.floor(Math.random() * yCoord.length)];
    };

    Obstacle.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    allObstacles.push(new Obstacle());
};

//adds lawn mower enemies that work on the grass tiles and come from
//right to left
Player.prototype.levelFour = function() {

    var Mower = function(randX, randY) {
        var xCoord = [130, 50, 0, 350];
        var yCoord = [310, 400];
        this.sprite = 'images/mower.png';
        this.x = randX = xCoord[Math.floor(Math.random() * xCoord.length)];
        this.y = randY = yCoord[Math.floor(Math.random() * yCoord.length)];

    };


    Mower.prototype.update = function(dt) {
        var time = new Date().getTime() * (0.0002);


        for (i = 0; i < allMowers.length; i++) {
            //   console.log(allEnemies[0].x);
            allMowers[i].x = -(Math.tan(time) * 600 + 100 * [i]);
        }
    };

    Mower.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    allMowers.push(new Mower());
};


//displays number of lives left in the lower right hand corner
var Life = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/lives.png';
    this.x = x;
    this.y = y;

};



Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//the following works to set up the Game Menu, where you can select
// a character and start the game
var Menu = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

};
Menu.prototype.render = function() {
    ctx2.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var menu = new Menu();

var allEnemies = [new Enemy(40), new Enemy(220), new Enemy(130),
    new Enemy(40), new Enemy(220), new Enemy(130), new Enemy()
];

var player = new Player();

var allObstacles = [];

var allMowers = [];

var allLives = [new Life(475, 500), new Life(450, 500),
    new Life(425, 500)
];



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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

});