var loader = PIXI.loader;
var isLoadingDone = false;
var gameSprites = {
    backgroundSprite: undefined,
    floorSprite: undefined,
    xenoSprite: undefined,
    saftSprite: undefined,
    spikeSprite: undefined,
    menuBackgroundSprite: undefined,
    arrowSprite: undefined,
    playerSprite: undefined,
};
var textureFrames = {
    floorFrame: new PIXI.Rectangle(2, 2, 62, 33),
    xenoFrame: new PIXI.Rectangle(66, 1, 64, 51),
    saftFrame: new PIXI.Rectangle(132, 1, 34, 64),
    spikeFrame: new PIXI.Rectangle(168, 1, 66, 52),
    arrowFrame: new PIXI.Rectangle(1, 296, 64, 64),
    playerFrame: new PIXI.Rectangle(66, 296, 68, 125),
};

function getTextureFromFrame(newTexture, newFrame) {
    var texture = new PIXI.Texture(newTexture);
    texture.frame = newFrame;
    return texture;
}

function loadingDone() {
    var backgroundTexture = loader.resources[texturesToLoad[0]].texture;
    var atlasTexture = loader.resources[texturesToLoad[1]].texture;
    var menuBackgroundTexture = loader.resources[texturesToLoad[2]].texture;

    gameSprites.backgroundSprite = new PIXI.Sprite(backgroundTexture);
    gameSprites.menuBackgroundSprite = new PIXI.Sprite(menuBackgroundTexture);

    gameSprites.floorSprite = new PIXI.Sprite(getTextureFromFrame(atlasTexture, textureFrames.floorFrame));
    gameSprites.xenoSprite = new PIXI.Sprite(getTextureFromFrame(atlasTexture, textureFrames.xenoFrame));
    gameSprites.saftSprite = new PIXI.Sprite(getTextureFromFrame(atlasTexture, textureFrames.saftFrame));
    gameSprites.spikeSprite = new PIXI.Sprite(getTextureFromFrame(atlasTexture, textureFrames.spikeFrame));
    gameSprites.arrowSprite = new PIXI.Sprite(getTextureFromFrame(atlasTexture, textureFrames.arrowFrame));
    gameSprites.playerSprite = new PIXI.Sprite(getTextureFromFrame(atlasTexture, textureFrames.playerFrame));

    isLoadingDone = true;

    console.log("All files loaded");
}

loader.add(texturesToLoad).load(loadingDone);
