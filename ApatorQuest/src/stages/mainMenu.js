var playTextStyle = {
    fontFamily: 'Arial',
    fontSize: '55px',
    fontWeight: 'bold',
    fill: '#FFFFFF',
    stroke: '#003d7c',
    strokeThickness: 7
};
var highScoreTextStyle = {
    fontFamily: 'Arial',
    fontSize: '40px',
    fontWeight: 'bold',
    fill: '#FFFFFF',
    stroke: '#003d7c',
    strokeThickness: 5
};

var mainMenuStageStates = {
    init: 0, running: 1,
};
var mainMenuStageState = mainMenuStageStates.init;

var mainMenuStage = new PIXI.Container();
var mainMenuDynamicObjects = [];
var menuSelector = undefined;

function mainMenuStateUpdate(dt) {
    if (mainMenuStageState == mainMenuStageStates.init) {
        initAllMainMenuObjects();
        mainMenuStageState = mainMenuStageStates.running;
    }
    else if (mainMenuStageState == mainMenuStageStates.running) {
        updateMainMenuDynamicObjects(dt);
    }

    if (inputManagerRight.isDown && menuSelector.menuOption == menuSelector.menuOptions.play) {
        mainMenuStageState = mainMenuStageStates.init;
        switchGameState(gameStates.running);
    }

    // TODO: remove after test
    if (inputManagerLeft.hold(1000)) {
        console.log("left: ", inputManagerLeft.holdTime);
    }
    if (inputManagerUp.hold(1000)) {
        console.log("up: ", inputManagerUp.holdTime);
    }
    if (inputManagerRight.hold(1000)) {
        console.log("right: ", inputManagerRight.holdTime);
    }
    if (inputManagerDown.hold(1000)) {
        console.log("down: ", inputManagerDown.holdTime);
    }
}

function updateMainMenuDynamicObjects(dt) {
    var updatedMainMenuDynamicObjects = [];
    for (var objectIndex = 0; objectIndex < mainMenuDynamicObjects.length; objectIndex++) {
        if (mainMenuDynamicObjects[objectIndex] != undefined) {
            mainMenuDynamicObjects[objectIndex].update(dt);
            updatedMainMenuDynamicObjects.push(mainMenuDynamicObjects[objectIndex]);
        }
    }
    mainMenuDynamicObjects = updatedMainMenuDynamicObjects;
}

function initAllMainMenuObjects() {
    mainMenuStage.removeChildren();
    var background = gameSprites.menuBackgroundSprite;
    mainMenuStage.addChild(background);
    var playText = new PIXI.Text("Play", playTextStyle);
    mainMenuStage.addChild(playText);
    playText.position.copy(gameObjectPositions.mainManuPlayTextPosition);
    var highScoreText = new PIXI.Text("High Score", highScoreTextStyle);
    mainMenuStage.addChild(highScoreText);
    highScoreText.position.copy(gameObjectPositions.mainManuHighScoreTextPosition);

    mainMenuDynamicObjects = [];
    menuSelector = new menuSelectorClass();
    menuSelector.setPosition(gameObjectPositions.mainManuArrowPlayPosition);
    mainMenuStage.addChild(menuSelector.sprite);
    mainMenuDynamicObjects.push(menuSelector);
}
