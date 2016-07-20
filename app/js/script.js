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
	enemies: [
		{
			name: 'bug',
			src: 'images/enemy-bug.png',
			pos: [40, 130, 220, 40, 130]
		},
		{
			name: 'mower',
			src: 'images/mower.png',
			pos: [310]
		},
		{
			name: 'obstacle',
			src: 'images/monster.png',
			pos: [40, 130, 220]
		}
	],
	player: ko.observableArray(),
	allEnemies: ko.observableArray(),
	allObstacles: ko.observable(),
//	allMowers: ko.observableArray(),
	statScreen: ko.observable(),
	level: ko.observable(1)
};

var viewModel = {
	
	init: function(){
		createBugs();
		levelUp.init();

	}

};

var levelUp = {

	init: function() {
		level = model.level();
		console.log(level);
	},

	render: function() {
		//console.log(this);
		++level;
		model.level(level);
		//console.log(level);
		if(level >3){
			var obstX, obstY;
			obstX = Math.ceil(Math.random() * 400) + 1;
			obstY = Math.floor(Math.random() * 400) + 1;
			obstacle = new Obstacle(obstX, obstY);		
			model.allObstacles(obstacle);
			obstacle.update();
		}
	}
};

var createBugs = function() {

	model.enemies.forEach(function(en){
		if(en.name == 'bug'){
			en.pos.forEach(function(posit){
				model.allEnemies.push(new Enemy(posit, 'bug'));
			})
		}
	});
};


var Enemy = function(y, name) {
	var that = this;
	var time, enemyNum;
	
	if(name == 'bug'){
		this.sprite = 'images/enemy-bug.png';
		this.y = y;
	}
	else{
		this.sprite = 'images/mower.png';
		this.y = 310;
	}
	
	this.x = 100;
};

//var allEnemies = [new Enemy(), new Enemy()];

Enemy.prototype.update = function() {
    var time = new Date().getTime() * (0.0002);
    var len = model.allEnemies().length;
    var enemyNum;

    for (var i = 0; i < len; i++) {
    	var speed = (Math.tan(time * enemyNum) * 600 + 100);
        enemyNum = i + 1;
        en = model.allEnemies()[i];
        en.x = speed;
  		if(en.sprite == 'images/mower.png'){
  			en.x = -speed;
  		}
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

var Obstacle = function(x, y) {

	this.sprite = ["images/enemy.png"];
	this.x = x;
	this.y = y;
};

var playerSelect = {
	
	init: function(clicked) {
	
		model.player.push(clicked.src);

		$('.menu').fadeOut(function(){
			$('canvas').fadeIn();
			$('.level').fadeIn();
		});
	
		startMeUp();
	}
};


 //detects collisions with obstacles and enemies
//needs refactoring
Player.prototype.update = function(dt) {
    
    model.allEnemies().forEach(function(en){
        var equal = player.x == (Math.floor(en.x/100)*100 || Math.ceil(en.x));

        if(equal && (player.y == en.y)) {

            stats.loser();
        }
    });

    if(model.allObstacles() !== undefined){
    	obstacle.update();
    }

    if(-1 > player.x){
    	player.x = 0;
    }
    if(player.x > 401){
    	player.x = 400;
    }

    if(-1 > player.y){
    	player.y=400;
    	stats.winner();
    }
    if(player.y > 401){
    	player.y = 400;
    }


};

var stats = {

	loser: function() {
        model.statScreen("images/loser.jpg");
       	player.x = 200;
       	player.y = 400;

		stats.render();
	},

	winner: function() {
    	model.statScreen("images/winner.jpg");
		stats.render();
		var len = model.allEnemies().length;
	
		levelUp.render();
	},

	render: function() {

		$('.stat').slideDown(function(){
			$('.stat').slideUp();
		});
		
	}

};

Obstacle.prototype.update = function() {
	//console.log(model.allObstacles());
	var obst = model.allObstacles();
	var obstX = obst.x;
	var obstY = obst.y;
	console.log(obst.x, player.x);
	var equalX = (Math.floor(obstX/100)*100 || Math.ceil(obstX)) == player.x;
	var equalY = (Math.floor(obstY/100)*100 || Math.ceil(obstY)) == player.x;
	
	if(equalX && equalY){
		console.log('equal!');
	}
}


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

Obstacle.prototype.render = function() {
	
	ctx.drawImage(Resources.get(this.sprite),
		this.x, this.y);
};
var player = new Player();
var obstacle = new Obstacle();





ko.applyBindings(viewModel.init());