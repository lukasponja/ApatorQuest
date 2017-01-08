var runningStageStates = {
    init: 0, running: 1,
};
var runningStageState = runningStageStates.init;
var runningStage = new PIXI.Container();
var runningStageDynamicObjects = [];
var player = undefined;
var collisionManager = new CollisionManagerClass();

function runningStateUpdate(dt) {
    if (runningStageState == runningStageStates.init) {
        initAllRunningStageObjects();
        runningStageState = runningStageStates.running;
    }
    else if (runningStageState == runningStageStates.running) {
        updateRunningStageDynamicObjects(dt);
        collisionManager.checkForCollisions();
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
    player = new PlayerClass();
    runningStage.addChild(player.sprite);
    runningStageDynamicObjects.push(player);
    collisionManager.mainCollisionLayer.push(player);

    //TODO: delete after test
    for (let i = 0; i < 5; i++) {
        let xeno = new XenoClass()
        xeno.setPosition(new PIXI.Point(getRandomInt(50, gameWidth-50), getRandomInt(50, gameHeight-50)));
        runningStage.addChild(xeno.sprite);
        collisionManager.otherCollisionLayer.push(xeno);
    }

    console.log('initAllRunningStageObjects');
}