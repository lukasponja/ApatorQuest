var runningStageStates = {
    init: 0, running: 1,
};
var runningStageState = runningStageStates.init;
var runningStage = new PIXI.Container();
var runningStageDynamicObjects = [];
var player = undefined;
var collisionManager = new CollisionManagerClass();
var collectablesManager = new CollectablesManager(collisionManager, runningStage, 10, 200);
var gui;


function runningStateUpdate(dt) {
    if (runningStageState == runningStageStates.init) {
        initAllRunningStageObjects();
        runningStageState = runningStageStates.running;
        soundManager.playSound(soundManager.sounds.backgroundMusic);
        //soundManager.setVolume(soundManager.sounds.backgroundMusic, 0.2);
    }
    else if (runningStageState == runningStageStates.running) {
        updateRunningStageDynamicObjects(dt);
        collisionManager.checkForCollisions();
        collectablesManager.manageCollectables(dt);
        gui.update(dt);
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
    player.setPosition(new PIXI.Point(100, 200));
    runningStageDynamicObjects.push(player);
    collisionManager.mainCollisionLayer.push(player);

    gui = new GUI();
    runningStage.addChild(gui.container);

    console.log('initAllRunningStageObjects');
}
