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
	allEnemies: ko.observableArray(),
	allObstacles: ko.observableArray(),
	allMowers: ko.observableArray(),
	allGems: ko.observableArray(),
	lives: ko.observableArray(),
	statScreen: ko.observable(),
	level: ko.observable(1),
	points: ko.observable(0)
	
};

var viewModel = {
	
	init: function(){
		viewModel.createBugs();
		canvas = document.createElement('canvas');
	},

	clearIt: function(){
		var which = ['player', 'allObstacles', 
			'allMowers', 'allGems', 'lives'];
		
		which.forEach(function(each){
			var itemToClear = eval('model.' + each + 
				'.removeAll()');
			return itemToClear;
		});
	},

	playerSelect: function(clicked) {
		//starts the game over on playerSelect
		viewModel.clearIt();
		model.level(1);
		level = model.level();

		model.points(0);
		points = model.points();

		model.player.push(clicked.src);

		$('.menu').fadeOut(function(){
			$('.fade-in').fadeIn();
		});
		
		viewModel.addLives();
		startMeUp();
	},

	levelUp: function() {

		++level;
		
		model.level(level);

		if(level > 1){
			model.allGems.removeAll();
			viewModel.createEnemies('obstacle');
			viewModel.createEnemies('gem');
		}

		if(level > 2){
			viewModel.createEnemies('mower');
		}
	},

	addPoints: function() {
		points = points + 10;
		model.points(points);
	},

	addLives: function() {

		for(var i = 0; i < 3; i++){
			model.lives.push('life');
		}
	},

	createBugs: function() {
		var posit = [40, 130, 220, 40, 130];

		posit.forEach(function(eachPos){
			model.allEnemies.push(new Enemy(eachPos));
		});
	},

	generateRandomCoord: function(){
		function floorIt(coordArray){
			coordArray = eval(coordArray);
			return coordArray[Math.floor(Math.random() 
				* coordArray.length)];
		};

		var yArray = [400, 310, 220, 130, 40]
		var xArray = [400, 300, 200, 100]
		var coordX = floorIt(xArray);
		var coordY = floorIt(yArray);

		return [coordX, coordY];
	},

	createEnemies: function(type) {

		var rand = viewModel.generateRandomCoord();
		var x = rand[0];
		var y = rand[1];
		var capFirst = type[0].toUpperCase();
		var capStr = capFirst + type.substring(1);
		var make = eval(capStr);
		var allTypes = eval('model.all'+capStr+'s');

		if(type !== 'mower'){
			type = new make(x,y);
		}
		else{
			type = new make();
		}
		
		allTypes.push(type);
		allTypes().forEach(function(each){	
			each.render();
		});
	},

	speedEval: function(type) {

		var time = new Date().getTime() * (0.0002);
		var len = eval('model.all'+type+'().length');
		var enemyNum;

		for(var i=0; i < len; i++){
			var speed = (Math.tan(time * enemyNum) * 600 + 100);
	        enemyNum = i + 1;
	        en = eval('model.all' + type + '()[i]');
	        console.log('en: ', en);
	        if(type === 'Enemies'){
	        	en.x = speed;
	        }
	        if(type === 'Mowers'){
	        	en.x = -speed;
	        }    
		}
	},

	collision: function(which) {

    	which.forEach(function(en){
	        var enFloor = Math.floor(en.x/100)*100;
	        var enCeil = Math.ceil(en.x);
	        var equal = (player.x == ( enFloor || enCeil )
	        	&& player.y == en.y);

	        if(equal) {
	        	if(en.sprite !=='images/gem.png'){
	        		statsView.loser();
	        	}
	        	if(en.sprite == 'images/gem.png'){
	        		model.allGems.removeAll();
	        		viewModel.addPoints();
	        	}
	        }		
    	});
	},

	retry: function(){
		var canvas = $('canvas');
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		$('.stat').fadeOut(function(){
			$('.menu').fadeIn();
		});
	}

};

var Enemy = function(y) {

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

	this.sprite = "images/rock.png";
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

Enemy.prototype.update= function(){
	viewModel.speedEval('Enemies');
};

Mower.prototype.update = function(){
	viewModel.speedEval('Mowers')
};

Player.prototype.update = function(dt) {
	viewModel.collision(model.allObstacles());
	viewModel.collision(model.allMowers());
	viewModel.collision(model.allEnemies());
	viewModel.collision(model.allGems());

    if(-1 > player.x){
    	player.x = 0;
    }
    if(player.x > 401){
    	player.x = 400;
    }

    if(-1 > player.y){
    	player.x=200;
    	player.y=400;
    	statsView.winner();
    }
    if(player.y > 401){
    	player.y = 400;
    }   
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
       		model.statScreen(false);
       		model.statScreen('images/gameover.jpg');
       		statsView.gameStatus();
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
		if(currentLevel < 8){
			statsView.render();
		}
		if(currentLevel === 8){
			model.statScreen(false);
			model.statScreen('images/champion.jpg');
			statsView.gameStatus();
		}
			
		viewModel.levelUp();
		viewModel.addPoints();
	},

	gameStatus: function() {
		$('canvas').fadeOut(function(){
			$('.stat').fadeIn();
			$('.again').fadeIn();
		});
	},

	render: function() {

		$('.stat').slideDown(function(){
			$('.stat').slideUp();
		});
	}
};



Player.prototype.render = function() {
	
    ctx.drawImage(Resources.get(this.sprite), 
    	this.x, this.y);
};

Obstacle.prototype.render = function() {
	
	ctx.drawImage(Resources.get(this.sprite),
		this.x, this.y);
};

Mower.prototype.render = function() {

	ctx.drawImage(Resources.get(this.sprite), 
		this.x, this.y);
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};

Gem.prototype.render = function() {

	ctx.drawImage(Resources.get(this.sprite), 
		this.x, this.y);
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

var player = new Player();
var obstacle = new Obstacle();
var gem = new Gem();


ko.applyBindings(viewModel.init());