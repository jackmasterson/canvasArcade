var model = {
	
	characters: [
		{
			name: 'Tom',
			src: 'images/char-boy.png',
			id: 'boy'
		}, 
		{
			name: 'Cathy',
			src: 'images/char-cat-girl.png',
			id: 'girl'
		},
		{
			name: 'Sarah',
			src: 'images/char-horn-girl.png',
			id: 'horn'
		},
		{
			name: 'Beth',
			src: 'images/char-pink-girl.png',
			id: 'pink'
		},
		{
			name: 'Jack',
			src: 'images/ram.png',
			id: 'ram'
		},
		{
			name: 'Bella',
			src: 'images/cat.png',
			id: 'cat'
		},
		{
			name: 'Tony',
			src: 'images/ironman.png',
			id: 'ironman'
		}
	]
};

var viewModel = {

	charSelect: function(clicked) {
		console.log(clicked);
	}

};



ko.applyBindings(viewModel);