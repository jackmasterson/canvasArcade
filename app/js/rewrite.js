const store = {
    visuals: {},
    defaults: [{
        type: 'hero',
        src: 'char-boy',
        category: 'good',
        amt: 1,
        pos: [200, 371]
    }, {
        type: 'bug',
        category: 'enemy',
        src: 'enemy-bug',
        amt: 3,
        pos: [0, 39]
    }, {
        type: 'mower',
        category: 'enemy',
        src: 'mower',
        amt: 2,
        pos: [0, 371]
    }]
}
let level = 0;

const create = {
    canvas: function() {

        canvas = document.createElement('canvas');
        startMeUp();
    },
    visuals: function(newGame) {
        // stubbed
        let selected = 'char-boy';
        let defaults = store.defaults;
        let nextLevel = {};

        newGame ? defaults : nextLevel;
        let t = 0;
        for (let def of defaults) {
            let defX = def.pos[0];
            let defY = def.pos[1];

            for (let k = 0; k < def.amt; k++) {
                if (def.category === 'enemy') {
                    defY = def.pos[1] + 83 * (k);
                }
                new Visual(defX * (k + 1), defY, def.type, def.src, def.category, def.amt, k + 1);
            }
        }
        store.runIt = true;
        movements.moveHero();
    },
};

class Visual {
    constructor(x, y, type, src, category, amt, incr) {
        this.sprite = 'images/' + src + '.png';
        this.type = type;
        this.category = category;
        this.x = x;
        this.y = y;
        this.num = incr;
        this.img = Resources.get(this.sprite);
        this.storeVisuals(this);
    }

    storeVisuals(obj) {
        if (!store.visuals[obj.type]) {
            store.visuals[obj.type] = [];
        }
        store.visuals[obj.type].push(obj);
        work.drawVisualsOnCanvas(store.visuals[this.type]);
    }

    update(vis, dt) {
        let time = new Date().getTime() * (0.0002);
        let speed = (Math.tan(time * vis.num) * 600 + 100);
        if (vis.type === 'bug') {
            vis.x = speed;
        } else if (vis.type === 'mower') {
            vis.x = -speed;
        }
        movements.watchForCollisions(store.visuals);
    }
}

const work = {

    drawVisualsOnCanvas() {
        let visuals = store.visuals;
        let keys = Object.keys(store.visuals);
        for (let key of keys) {
            let vis = visuals[key];
            work.finishDraw(vis);
        }
    },

    finishDraw(array) {
        for (let obj of array) {
            ctx.drawImage(obj.img, obj.x, obj.y);
        }
    }

}

const movements = {

    moveHero: function() {
        document.addEventListener('keyup', function(event) {
            let hero = store.visuals.hero[0];
            let allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
            };
            movements.handleInput(allowedKeys[event.keyCode], hero);
        });
    },

    handleInput: function(event, obj) {
        if (obj.x > 0) {
            if (event === 'left') {
                obj.x -= 100;
            }
        }

        if (obj.x < 400) {
            if (event === 'right') {
                obj.x += 100;
            }
        }

        if (obj.y > 38.5) {
            if (event === 'up') {
                obj.y -= 83;
            }
        } else {
            reward.winner(obj);
        }
        
        if (obj.y < 370) {
            if (event === 'down') {
                obj.y += 83;
            }
        }
    },

    watchForCollisions: function(visuals) {
        let hero = visuals.hero[0];
        let bugs = visuals.bug;
        let mowers = visuals.mower;
        let xMargin = 15;
        for (let bug of bugs) {
            let withinY = Math.abs(bug.y - hero.y) === 0;
            let withinX = Math.abs(bug.x - hero.x) < xMargin;
            if (withinY && withinX) {
                hero.x = 200;
                hero.y = 53 * 7;
            }
        }

        for (let mower of mowers) {
            let withinY = Math.abs(mower.y - hero.y) === 0;
            let withinX = Math.abs(mower.x - hero.x) < xMargin;
            if (withinY && withinX) {
                console.log('loser!');
                hero.x = 200;
                hero.y = 53 * 7;
            }
        }
    }
}

const reward = {
    winner: function(obj) {
        console.log('winner!');
        obj.y = 53 * 7;
        obj.x = 200;
    }
}
create.canvas();

