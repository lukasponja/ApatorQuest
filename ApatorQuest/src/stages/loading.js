var loadingTextStyle = {
    fontFamily: 'Arial',
    fontSize: '55px',
    fontWeight: 'bold',
    fill: '#FFFFFF',
    stroke: '#35786f',
    strokeThickness: 5,
};

var loadingStageStates = {
    init: 0, loading: 1,
};
var loadingStageState = loadingStageStates.init;

var loadingStage = new PIXI.Container();
var loadingText = new PIXI.Text("Loading...", loadingTextStyle);


function loadingStateUpdate(dt) {
    if (loadingStageState == loadingStageStates.init) {
        loadingText.anchor.set(0.5);
        loadingText.position.set(gameWidth / 2, gameHeight / 2);
        loadingStage.addChild(loadingText);

        loadingStageState = loadingStageStates.loading;
    }
    else if (loadingStageState == loadingStageStates.loading) {
        if (isLoadingDone == true) {
            switchGameState(gameStates.menu);
        }
    }

}
