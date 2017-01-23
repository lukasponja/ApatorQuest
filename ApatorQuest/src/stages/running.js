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
var background;
var runningSpeed = 200;
var levelTimer = 0;
var noiseFilter = new PIXI.filters.NoiseFilter();
var blurFilter = new PIXI.filters.BlurFilter();
var fxaaFilter = new PIXI.filters.FXAAFilter();
var voidFilter = new PIXI.filters.VoidFilter();
runningStage.filters= [noiseFilter];


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

    levelTimer += dt;
    if (levelTimer > 1) {
        levelTimer = 0;
        if (runningSpeed < 800) {
            runningSpeed += 2;
        }
        //console.log(runningSpeed);
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

    background = new BackgroundClass();
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

function changeRunningSpeed(newDeltaSpeed) {
    background.setSpeed(runningSpeed + newDeltaSpeed);
    collectablesManager.setSpeed(runningSpeed + newDeltaSpeed);
}
