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

    let xeno = new XenoClass()
    xeno.setPosition(new PIXI.Point(200,200));
    runningStage.addChild(xeno.sprite);
    collisionManager.otherCollisionLayer.push(xeno);

    console.log('initAllRunningStageObjects');
}