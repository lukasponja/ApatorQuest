/* 
 * CollectablesManager manages collectable items in the stage.
 * It requires collision manager and stage objects to be passed in
 * as well as maximum number of collectables and their initial speed.
 *
 */
function CollectablesManager(collisionManager, stage, max, speed) {
    this.collMgr = collisionManager;
    this.stage = stage;
    this.collectables = [];
    this.speed = speed;
    this.max = max;

    // creates a single collectable and a sprite to the screen
    this.createCollectable = function(coll, x, y) {
        coll.setPosition(new PIXI.Point(x, y));
        this.stage.addChild(coll.sprite);
        this.collMgr.otherCollisionLayer.push(coll);
        this.collectables.push(coll);
    };

    // adds missing collectables (if any)
    this.spawnCollectables = function() {
        var diff = this.max - this.collectables.length; 
        if (diff > 0) {
            for (i = 0; i < diff; i++) {
                var x;
                if (this.collectables.length == 0) {
                    x = gameWidth;
                } else {
                    x = this.collectables[this.collectables.length - 1].position.x;
                    x += 200;
                }
                var y = getRandomInt(3, 8);
                let xeno = new XenoClass();
                this.createCollectable(xeno, x, y*xeno.sprite.height);
            }
        }
    };

    // destroyes picked up collectables or the ones that have passed the container borders
    this.destroyPickedCollectables = function() {
        for (var i = 0; i < this.collectables.length; i++) {
            if (this.collectables[i].tag == "Ghost" || this.collectables[i].position.x < -200) {
                this.collectables.splice(i, 1);
            }
        }
    };

    // moves collectables across the stage
    this.moveCollectables = function(dt) {
        for (var i = 0; i < this.collectables.length; i++) {
            var p = new PIXI.Point(this.collectables[i].position.x - this.speed*dt,
                    this.collectables[i].position.y);
            this.collectables[i].setPosition(p);
        }
    };

    // manages collectables
    this.manageCollectables = function(dt) {
        this.destroyPickedCollectables();
        this.spawnCollectables();
        this.moveCollectables(dt);
    };

    this.getSpeed = function() {
        return this.speed;
    };

    this.getMaxCollectables = function() {
        return this.max;
    };

    this.setSpeed = function(speed) {
        this.speed = speed;
    };

    this.setMaxCollectables = function(max) {
        this.max = max;
    };
}

