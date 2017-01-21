console.log('ApatorQuest');

var gameState = gameStates.loading;
var lastUpdate = 0;

var renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight);
document.body.appendChild(renderer.view);

var stageToRender = new PIXI.Container();
var soundManager = new SoundManagerClass();

function switchGameState(newState) {
  gameState = newState;
  if (gameState == gameStates.loading) {
    stageToRender = loadingStage;
  }
  else if (gameState == gameStates.menu) {
    stageToRender = mainMenuStage;
  }
  else if (gameState == gameStates.running) {
    stageToRender = runningStage;
  }
  else if (gameState == gameStates.paused) {

  }
  else if (gameState == gameStates.gameOver) {

  }
  else if (gameState == gameStates.score) {

  }
  else {
    console.log("switchGameState-> game stage not valid.");
  }
}

function gameLoop() {
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;
  dt /= 1000;

  if (gameState == gameStates.loading) {
    loadingStateUpdate(dt);
  }
  else if (gameState == gameStates.menu) {
    mainMenuStateUpdate(dt);
  }
  else if (gameState == gameStates.running) {
    runningStateUpdate(dt);
  }
  else if (gameState == gameStates.paused) {

  }
  else if (gameState == gameStates.gameOver) {

  }
  else if (gameState == gameStates.score) {

  }

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  //Render the stage to see the animation
  renderer.render(stageToRender);
}

switchGameState(gameStates.loading);
//Start the game loop
gameLoop();




