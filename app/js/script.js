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
	sprite: ko.observableArray(),

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

	allEnemies: ko.observableArray()
};

var viewModel = {
	
	init: function(){
		createBugs();
		startMeUp();
	}

};

var Enemy = function(y) {
	var that = this;
	this.sprite = 'images/enemy-bug.png';
	this.x = 100;
	this.y = y;

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

    this.sprite = model.sprite();
    this.x = 200;
    this.y = 400;
};

var playerSelect = {
	init: function(clicked) {
		console.log(clicked)
		clicked.jqClass = "."+clicked.classed;

		
		
		model.sprite.push(clicked.src);
		console.log(model.sprite());
		this.player = new Player();

		$('.menu').fadeOut();
	}
};



ko.applyBindings(viewModel.init());