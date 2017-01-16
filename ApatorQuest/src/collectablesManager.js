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

    // creates a single collectable outside of the visible stage area
    this.createCollectable = function(coll) {
        coll.setPosition(new PIXI.Point(gameWidth + getRandomInt(200, 1500),
                getRandomInt(100, gameHeight - 100)));
        this.stage.addChild(coll.sprite);
        this.collMgr.otherCollisionLayer.push(coll);
        this.collectables.push(coll);
    };

    // adds missing collectables (if any)
    this.spawnCollectables = function() {
        var diff = this.max - this.collectables.length; 
        if (diff > 0) {
            for (i = 0; i < diff; i++) {
                let xeno = new XenoClass();
                this.createCollectable(xeno);
            }
        }
    };

    // destroyes picked up collectables or the ones that have passed the container borders
    this.destroyPickedCollectables = function() {
        for (var i = 0; i < this.collectables.length; i++) {
            if (this.collectables[i].tag == "Ghost" || this.collectables[i].position.x < -100) {
                this.collectables.splice(i, 1);
            }
        }
    };

    // moves collectables across the stage
    this.moveCollectables = function() {
        for (var i = 0; i < this.collectables.length; i++) {
            var p = new PIXI.Point(this.collectables[i].position.x - this.speed,
                    this.collectables[i].position.y);
            this.collectables[i].setPosition(p);
        }
    };

    // manages collectables
    this.manageCollectables = function() {
        this.destroyPickedCollectables();
        this.spawnCollectables();
        this.moveCollectables();
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

