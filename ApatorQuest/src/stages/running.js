var runningStageStates = {
    init: 0, running: 1,
};
var runningStageState = runningStageStates.init;
var runningStage = new PIXI.Container();
var runningStageDynamicObjects = [];
var player = undefined;

function runningStateUpdate(dt) {
    if (runningStageState == runningStageStates.init) {
        initAllRunningStageObjects();
        runningStageState = runningStageStates.running;
    }
    else if (runningStageState == runningStageStates.running) {
        updateRunningStageDynamicObjects(dt);
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

    console.log('initAllRunningStageObjects');
}