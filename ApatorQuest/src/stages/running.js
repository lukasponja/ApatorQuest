var runningStageStates = {
    init: 0, running: 1,
};
var runningStageState = runningStageStates.init;
var runningStage = new PIXI.Container();
var runningStageDynamicObjects = [];
var player = undefined;
var collisionManager = new CollisionManagerClass();
var colorMatrix = new PIXI.filters.ColorMatrixFilter();
var gray = 0;

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

    var background = new BackgroundClass();
    runningStage.addChild(background.sprite);
    runningStageDynamicObjects.push(background);

    player = new PlayerClass();
    runningStage.addChild(player.sprite);
    runningStageDynamicObjects.push(player);
    collisionManager.mainCollisionLayer.push(player);

    //TODO: devare after test
    for (var i = 0; i < 5; i++) {
        var xeno = new XenoClass()
        xeno.setPosition(new PIXI.Point(getRandomInt(50, gameWidth - 50), getRandomInt(50, gameHeight - 50)));
        runningStage.addChild(xeno.sprite);
        collisionManager.otherCollisionLayer.push(xeno);

        var platform = new PlatformClass()
        platform.setPosition(new PIXI.Point(getRandomInt(50, gameWidth - 50), getRandomInt(200, gameHeight - 200)));
        runningStage.addChild(platform.sprite);
        collisionManager.otherCollisionLayer.push(platform);
    }

    console.log('initAllRunningStageObjects');
}