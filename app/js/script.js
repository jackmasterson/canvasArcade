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
	allObstacles: ko.observableArray(),
	lives: ko.observableArray(),
	allMowers: ko.observableArray(),
	statScreen: ko.observable(),
	level: ko.observable(1),
	gems: ko.observableArray()
};

var viewModel = {
	
	init: function(){
		viewModel.createBugs();
		canvas = document.createElement('canvas');
	},

	//initial menu actions, once player selects a character
	playerSelect: function(clicked) {
		model.player.removeAll();
		model.allObstacles.removeAll();
		model.allMowers.removeAll();
		
		model.level(1);

		model.player.push(clicked.src);

		$('.menu').fadeOut(function(){
			$('canvas').fadeIn();
			$('.level').fadeIn();
			$('.lives').fadeIn();
		});
		
		viewModel.levelInit();
		viewModel.addLives();
		startMeUp();
	},

	levelInit: function() {
		level = model.level();
	},

	levelUp: function() {

		++level;
		model.level(level);
		var yArray = [400, 310, 220, 130, 40]
		var xArray = [400, 300, 200, 100]
		var obstY = yArray[Math.floor(Math.random() 
			* yArray.length)];
		var obstX = xArray[Math.floor(Math.random()
			* xArray.length)];

		var gemY = yArray[Math.floor(Math.random() 
			* yArray.length)];
		var gemX = xArray[Math.floor(Math.random()
			* xArray.length)];

		if(level > 2){
			
			obstacle = new Obstacle(obstX, obstY);
			model.allObstacles.push(obstacle);
			console.log(model.allObstacles());

			model.allObstacles().forEach(function(obst){
				obst.update();
				obst.render();
			});
			gemAdd = new Gem(gemX, gemY);
			model.gems.removeAll();
			model.gems.push(gemAdd);
			model.gems().forEach(function(gem){
				gem.render();
				gem.update();

			})
		}

		if(level > 4){
			mower = new Mower();
			model.allMowers.push(mower);
			model.allMowers().forEach(function(mow){
				mow.update();
				mow.render();
			})

		}
	},

	addLives: function() {

		model.lives(['life', 'life', 'life']);
	},

	createBugs: function() {
		model.enemies.forEach(function(en){
			if(en.name == 'bug'){
				en.pos.forEach(function(posit){
					model.allEnemies.push(new Enemy(posit, 'bug'));
				})
			}
		});
	}

};




var Enemy = function(y, name) {
	var that = this;
	var time, enemyNum;
	

		this.sprite = 'images/enemy-bug.png';
		this.y = y;
	
	this.x = 100;
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

var Mower = function() {
	this.sprite = 'images/mower.png';
	this.x = 450;
	this.y = 310;
};

var Gem = function(x, y) {
	this.sprite = 'images/gem.png';
	this.x = x;
	this.y = y;
};

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

Mower.prototype.update = function() {
    var time = new Date().getTime() * (0.0002);
    var len = model.allMowers().length;
    var enemyNum;

    for (var i = 0; i < len; i++) {
    	enemyNum = i + 1;
    	var speed = (Math.tan(time * enemyNum) * 600 + 100);
        
        en = model.allMowers()[i];
        en.x = -speed;
    }
};

//updates the player and collision detection
Player.prototype.update = function(dt) {
    
    model.allEnemies().forEach(function(en){
        var equal = player.x == (Math.floor(en.x/100)*100 || Math.ceil(en.x));

        if(equal && (player.y == en.y)) {

            statsView.loser();
        }
    });
    model.allMowers().forEach(function(mow){
    	

    	mowFloor = Math.floor(mow.x/100)*100;
    	mowCeil = Math.ceil(mow.x);


    	var equal = player.x == ( mowFloor || mowCeil );

    	if(equal && (player.y == mow.y)){
    		statsView.loser();
    	}
    });
    if(model.allObstacles() !== undefined){
    	obstacle.update();
    //	obst2.update();
    }

    if(-1 > player.x){
    	player.x = 0;
    }
    if(player.x > 401){
    	player.x = 400;
    }

    if(-1 > player.y){
    	player.y=400;
    	statsView.winner();
    }
    if(player.y > 401){
    	player.y = 400;
    }
};


Obstacle.prototype.update = function() {

	var obst = model.allObstacles();
	var playerY = player.y + 90;
	obst.forEach(function(each){

		equalX = each.x == player.x;
		equalY = each.y == playerY;
		if(equalX && equalY){
			statsView.loser();
		}
	})
};

Gem.prototype.update = function() {

};

//updates depending on if the player
//wins, loses, beats the game, games over, etc
var statsView = {

	loser: function() {
        model.statScreen("images/loser.jpg");
       	player.x = 200;
       	player.y = 400;
       
       	model.lives.shift();
       	if(model.lives().length === 0){
       		statsView.gameOver();
       	}
		else {
       		statsView.render();
       	}
		
	},

	winner: function() {
    	model.statScreen("images/winner.jpg");
		
		var len = model.allEnemies().length;
		var currentLevel = model.level() + 1;
		if(currentLevel === 4){
			model.lives.push('life');
		}
		if(currentLevel === 10){
			statsView.gameWon();
		}
		else{
			statsView.render();
		}
		viewModel.levelUp();
	},

	gameOver: function(){
		model.statScreen('images/gameover.jpg');
		$('canvas').fadeOut(function(){
			$('.stat').fadeIn();
			$('.again').fadeIn();
		});
	},

	gameWon: function() {
		model.statScreen('images/champion.jpg');
		$('canvas').fadeOut(function(){
			$('.stat').fadeIn();
			$('.again').fadeIn();
		})
	},

	render: function() {

		$('.stat').slideDown(function(){
			$('.stat').slideUp();
		});
		
	}

};

//if the user wants to play again after 
//a game over or beating the game
var retry = {

	init: function(){
		var canvas = $('canvas');
		//model.allObstacles() === {};
	//	model.allObstacles({});
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		$('.stat').fadeOut(function(){
			$('.menu').fadeIn();
		});
	}
};



Player.prototype.render = function() {
	
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Obstacle.prototype.render = function() {
	
	ctx.drawImage(Resources.get(this.sprite),
		this.x, this.y);
};

Mower.prototype.render = function() {

	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};

Gem.prototype.render = function() {

	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//next two functions add listeners so the player moves correctly
//on keyups
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

var mower = new Mower();
var player = new Player();
var obstacle = new Obstacle();




ko.applyBindings(viewModel.init());