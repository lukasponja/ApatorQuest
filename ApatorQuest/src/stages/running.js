var runningStageStates = {
    init: 0, running: 1,
};
var runningStageState = runningStageStates.init;
var runningStage = new PIXI.Container();
var runningStageDynamicObjects = [];
var player = undefined;
var collisionManager = new CollisionManagerClass();

var collectables = [];
const MAX_COLLECTABLES = 10;


function runningStateUpdate(dt) {
    if (runningStageState == runningStageStates.init) {
        initAllRunningStageObjects();
        runningStageState = runningStageStates.running;
    }
    else if (runningStageState == runningStageStates.running) {
        updateRunningStageDynamicObjects(dt);
        collisionManager.checkForCollisions();
        manageCollectables();
    }
}

function updateRunningStageDynamicObjects(dt) {
    var updatedRunningStageDynamicObjects = [];
    for (var objectIndex = 0; objectIndex < runningStageDynamicObjects.length; objectIndex++) {
        if (runningStageDynamicObjects[objectIndex] != undefined) {
            runningStageDynamicObjects[objectIndex].update(dt);
            updatedRunningStageDynamicObjects.push(runningStageDynamicObjects[objectIndex]);
        }
    }
    runningStageDynamicObjects = updatedRunningStageDynamicObjects;
}

function initAllRunningStageObjects() {
    runningStage.removeChildren();
    runningStageDynamicObjects = [];

    var background = new BackgroundClass();
    runningStage.addChild(background.container);
    runningStageDynamicObjects.push(background);

    player = new PlayerClass();
    runningStage.addChild(player.sprite);
    player.setPosition(new PIXI.Point(100,200));
    runningStageDynamicObjects.push(player);
    collisionManager.mainCollisionLayer.push(player);

    //TODO: delete after test
     addCollectable(new XenoClass());
    /*for (var i = 0; i < 5; i++) {
        addCollectable(new XenoClass());

        var platform = new PlatformClass()
        platform.setPosition(new PIXI.Point(getRandomInt(50, gameWidth - 50), getRandomInt(200, gameHeight - 200)));
        runningStage.addChild(platform.sprite);
        collisionManager.otherCollisionLayer.push(platform);
    }*/

    console.log('initAllRunningStageObjects');
}

var prevCollLenght = 0;
function manageCollectables() {
    var len = collectables.length;

    for (var i = 0; i < len; i++) {
        if (collectables[i].tag == "Ghost") {
            collectables.splice(i, 1);
        }
        len = collectables.length;
    }

    if (prevCollLenght === len)
        return;

    if (len < MAX_COLLECTABLES) {
        var rnd = getRandomInt(0, 100)
        console.log(rnd);
        if ((rnd % 5) === 0 || len === 0) {
            fillCollectables();
        }
    }

    prevCollLenght = len;
}

function fillCollectables() {
    var max = getRandomInt(1, MAX_COLLECTABLES - collectables.length);
    
    for (i = 0; i < max; i++) {
        let xeno = new XenoClass();
        addCollectable(xeno);
    }
}

function addCollectable(coll) {
        coll.setPosition(new PIXI.Point(getRandomInt(50, gameWidth - 50), getRandomInt(50, gameHeight - 50)));
        runningStage.addChild(coll.sprite);
        collisionManager.otherCollisionLayer.push(coll);
        collectables.push(coll);
}
