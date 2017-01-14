var gameWidth = 800;
var gameHeight = 534;
var gameGravity = 30;

var gameStates = {
  loading: 0, running:1, paused: 2, gameOver: 3, score: 4, menu: 5 
};
var gameObjectTags = {
  player: 0, item:1, obsticle:2
};

var texturesToLoad = [
    'assets/gfx/background.png',
    'assets/gfx/objectsAtlas.png',
    'assets/gfx/mainMenuBackground.png',
    'assets/gfx/player.png',
    'assets/gfx/parallax.png'
];

var gameObjectPositions = {
  mainManuPlayTextPosition: new PIXI.Point(93, 382),
  mainManuHighScoreTextPosition: new PIXI.Point(93, 464),
  mainManuArrowPlayPosition: new PIXI.Point(29, 384),
  mainManuArrowHighScorePosition: new PIXI.Point(29, 457),
  mainManuApatorTitlePosition: new PIXI.Point(272, 1),
  mainManuQuestTitlePosition: new PIXI.Point(322, 58),
};