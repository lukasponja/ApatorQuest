var runningStageStates = {
    init: 0, running: 1,
};
var runningStageState = runningStageStates.init;
var runningStage = new PIXI.Container();
var runningStageDynamicObjects = [];
var player = undefined;
var collisionManager = new CollisionManagerClass();
var gui;

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

    //TODO: delete after test
    createCollectable(new XenoClass());

    gui = new GUI();
    runningStage.addChild(gui.container);

    console.log('initAllRunningStageObjects');
}

function manageCollectables() {
    destroyPickedCollectables();
    spawnCollectables();
    moveCollectables();
}

function createCollectable(coll) {
    coll.setPosition(new PIXI.Point(gameWidth + getRandomInt(0, 1500), getRandomInt(100, gameHeight - 100)));
    runningStage.addChild(coll.sprite);
    collisionManager.otherCollisionLayer.push(coll);
    collectables.push(coll);
}

function spawnCollectables() {
    if (collectables.length < MAX_COLLECTABLES) {
        for (i = 0; i < MAX_COLLECTABLES - collectables.length; i++) {
            let xeno = new XenoClass();
            createCollectable(xeno);
        }
    }
}

function destroyPickedCollectables() {
    for (var i = 0; i < collectables.length; i++) {
        if (collectables[i].tag == "Ghost") {
            collectables.splice(i, 1);
        }
    }
}

function moveCollectables() {
    for (var i = 0; i < collectables.length; i++) {
        collectables[i].sprite.position.x--;
        collectables[i].position.x--;
        collectables[i].collider.setPosition(collectables[i].position);
    }
}
