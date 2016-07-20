var model = {
	
	characters: [
		{
			name: 'Tom',
			src: 'images/char-boy.png',
			classed: 'boy'
		}, 
		{
			name: 'Cathy',
			src: 'images/char-cat-girl.png',
			classed: 'girl'
		},
		{
			name: 'Sarah',
			src: 'images/char-horn-girl.png',
			classed: 'horn'
		},
		{
			name: 'Beth',
			src: 'images/char-pink-girl.png',
			classed: 'pink'
		},
		{
			name: 'Jack',
			src: 'images/ram.png',
			classed: 'ram'
		},
		{
			name: 'Bella',
			src: 'images/cat.png',
			classed: 'cat'
		},
		{
			name: 'Tony',
			src: 'images/ironman.png',
			classed: 'ironman'
		}
	],
	player: ko.observableArray(),

	enemies: [
		{
			name: 'bug',
			src: 'images/enemy-bug.png',
			pos: [40, 130, 220]
		},
		{
			name: 'mower',
			src: 'images/mower.png',
			pos: [310, 400]
		}
	],

	allEnemies: ko.observableArray(),
	statScreen: ko.observable("images/winner.jpg")
};

var viewModel = {
	
	init: function(){
		createBugs();
	}

};
var createBugs = function() {

	model.enemies.forEach(function(en){
		if(en.name == 'bug'){
			en.pos.forEach(function(posit){
				model.allEnemies.push(new Enemy(posit));
			})
		}
	});
};
var Enemy = function(y) {
	var that = this;
	this.sprite = 'images/enemy-bug.png';
	this.x = 100;
	this.y = y;

};

//var allEnemies = [new Enemy(), new Enemy()];

Enemy.prototype.update = function() {
    var enemyNum, speed;
    var time = new Date().getTime() * (0.0002);
    var len = model.allEnemies().length;

    for (var i = 0; i < len; i++) {
        enemyNum = i + 1;
        speed = (Math.tan(time * enemyNum) * 600 + 100);
        model.allEnemies()[i].x = speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};


var Player = function() {

    this.sprite = model.player();
    this.x = 200;
    this.y = 400;
};

var playerSelect = {
	
	init: function(clicked) {
	
		model.player.push(clicked.src);

		$('.menu').fadeOut(function(){
			$('canvas').fadeIn();
		});
	
		startMeUp();
	}
};


 //detects collisions with obstacles and enemies

Player.prototype.update = function(dt) {
    model.allEnemies().forEach(function(en){
        var equal = player.x == (Math.floor(en.x/100)*100 || Math.ceil(en.x));
        var ceilEqual = player.x == Math.ceil(en.x/100)*100;

        if(equal && (player.y == en.y)) {
        	model.statScreen("images/loser.jpg");
            stats.init();
        }
        if(player.y == -50){
        	model.statScreen("images/winner.jpg");
            stats.init();
        }

        if((-1 < player.x) && (player.x < 401)){
        	
        }
        else{
        	console.log('out of bounds!');
        	console.log(player.x);

        }
        if((-1 < player.y) && (player.y < 401)){
        	
        }
        else {
        	console.log('out of bounds!');
        	console.log(player.y);
        }

    });

};

x = [400, 310, 220, 130, 40]
y = [0-400]

var stats = {

	init: function() {

		$('.stat').slideDown(function(){
			$('.stat').slideUp();
		});
	}

};



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
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});












Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var player = new Player();

ko.applyBindings(viewModel.init());