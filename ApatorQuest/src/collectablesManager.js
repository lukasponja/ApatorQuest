var collectablesSpeed = 5;
const MAX_COLLECTABLES = 10;

/* 
 * CollectablesManager manages collectable items in the stage.
 * It requires collision manager and stage objects to be passed in.
 *
 */
function CollectablesManager(collisionManager, stage) {
    this.collMgr = collisionManager;
    this.stage = stage;
    this.collectables = [];

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
        if (this.collectables.length < MAX_COLLECTABLES) {
            for (i = 0; i < MAX_COLLECTABLES - this.collectables.length; i++) {
                let xeno = new XenoClass();
                this.createCollectable(xeno);
            }
        }
    };

    // destroyes picked up collectables
    this.destroyPickedCollectables = function() {
        for (var i = 0; i < this.collectables.length; i++) {
            if (this.collectables[i].tag == "Ghost" || this.collectables[i].x < -100) {
                this.collectables.splice(i, 1);
            }
        }
    };

    // moves collectables across the stage
    this.moveCollectables = function() {
        for (var i = 0; i < this.collectables.length; i++) {
            var p = new PIXI.Point(this.collectables[i].position.x - collectablesSpeed,
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
}

