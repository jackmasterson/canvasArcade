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
			pos: [40, 130, 220]
		},
		{
			name: 'mower',
			src: 'images/mower.png',
			pos: [310, 400]
		}
	],
	player: ko.observableArray(),
	allEnemies: ko.observableArray(),
//	allMowers: ko.observableArray(),
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
        if(en.sprite == 'images/enemy-bug.png'){
        	en.x = speed;
        }
        else{
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
        	player.x = 200;
        	player.y = 400;
            stats.init();
        }
        if(player.y == -50){
        	model.statScreen("images/winner.jpg");
        	var len = model.allEnemies().length;
        	var bugPos;
        	var mowerPos;
        	if((len > -1) && (len < 6)){
    			var bug = model.enemies[0];
    			bugPos = bug.pos;
    			bugPos.sort(function(){
    				return 0.5 - Math.random();
    			});

    			bugPos.push(bugPos[0]);
    			model.allEnemies().forEach(function(en){
					en.render();
				});

				model.allEnemies.push(new Enemy(bugPos[0], 'bug'));
        	}

        	if(len > 4) {
        		var mower = model.enemies[1];
        		mowerPos = mower.pos;
        		mowerPos.sort(function(){
        			return 0.5 - Math.random();
        		});

        		mowerPos.push(mowerPos[0]);
        		model.allEnemies().forEach(function(mow){
        			mow.render();
        		});

        		model.allEnemies.push(new Enemy(mowerPos[0], 'mower'));

        	}
        	
            stats.init();
        }

        if(-1 > player.x){
        	player.x = 0;
        }
        if(player.x > 401){
        	player.x = 400;
        }

        if((-1 > player.y) || (player.y > 401)){
        	player.y = 400;
        }

    });

};

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