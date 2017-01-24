/* CreationEngine manages collectable/collidable items in the stage.
 * It requires collision manager and stage objects to be passed in
 * as well as maximum number of collectables and their initial speed.
 */
function CreationEngine(collisionManager, stage, max, speed) {
    this.collMgr = collisionManager;
    this.stage = stage;
    this.collectables = [];
    this.collidables = [];
    this.speed = speed;
    this.max = max;

    // creates a single collectable and a sprite to the screen
    this.createCollectable = function(coll, x, y) {
        coll.setPosition(new PIXI.Point(x, y));
        this.stage.addChild(coll.sprite);
        this.collMgr.otherCollisionLayer.push(coll);
        this.collectables.push(coll);
    };

    // creates a single collidable and ads a sprite to the screen
    this.createCollidable = function(coll, x, y) {
        coll.setPosition(new PIXI.Point(x, y));
        this.stage.addChild(coll.sprite);
        this.collMgr.otherCollisionLayer.push(coll);
        this.collidables.push(coll);
    };

    // adds missing collectables (if any) and spawn random obstacles
    this.populateScreen = function() {
        let diff = this.max - this.collectables.length; 
        if (diff > 0) {
            for (i = 0; i < diff; i++) {
                let x;
                if (this.collectables.length == 0) {
                    x = gameWidth;
                } else {
                    let len = this.collectables.length;
                    x = this.collectables[len - 1].position.x;
                    x += 200;
                }
                let xeno = new XenoClass();
                let y = getRandomInt(3, 8) * xeno.sprite.height;
                this.createCollectable(xeno, x, y);

                if (y < gameHeight/2) {
                    let platform = new PlatformClass()
                    let side = getRandomInt(-1, 1);
                    this.createCollidable(platform, x + side*50, y + 150);
                }
            }
        }
    };

    // destroyes picked up collectables or the ones that have passed the screen borders
    // destroyes collidables that have passed the screen borders
    this.updateItemsStates = function() {
        for (var i = 0; i < this.collectables.length; i++) {
            if (this.collectables[i].tag == "Ghost" ||
                this.collectables[i].position.x < -200) {
                this.collectables.splice(i, 1);
            }
        }

        for (var i = 0; i < this.collidables.length; i++) {
            if (this.collidables[i].position.x < -200) {
                this.collidables.splice(i, 1);
            }
        }
    };

    // moves collectables across the stage
    this.updateItemsPositions = function(dt) {
        for (let i = 0; i < this.collectables.length; i++) {
            let p1 = new PIXI.Point(
                this.collectables[i].position.x - this.speed*dt,
                this.collectables[i].position.y
            );
            this.collectables[i].setPosition(p1);
        }

        for (let i = 0; i < this.collidables.length; i++) {
            let p2 = new PIXI.Point(
                this.collidables[i].position.x - this.speed*dt,
                this.collidables[i].position.y
            );
            this.collidables[i].setPosition(p2);
        }
    };

    // manages collectables
    this.run = function(dt) {
        this.populateScreen();
        this.updateItemsStates();
        this.updateItemsPositions(dt);
    };

    this.getObjectsSpeed = function() {
        return this.speed;
    };

    this.getObjectsCap = function() {
        return this.max;
    };

    this.setObjectsSpeed = function(speed) {
        this.speed = speed;
    };

    this.setObjectsCap = function(max) {
        this.max = max;
    };
}

