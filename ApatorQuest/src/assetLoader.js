var loader = PIXI.loader;
var isLoadingDone = false;
var gameTextures = {
    backgroundTexture: undefined,
    floorTexture: undefined,
    xenoTexture: undefined,
    saftTexture: undefined,
    spikeTexture: undefined,
    menuBackgroundTexture: undefined,
    arrowTexture: undefined,
    playerTexture: undefined,
    parallaxTexture: undefined,
    groundTexture: undefined,
};
var textureFrames = {
    floorFrame: new PIXI.Rectangle(2, 2, 62, 33),
    xenoFrame: new PIXI.Rectangle(66, 1, 64, 51),
    saftFrame: new PIXI.Rectangle(132, 1, 34, 64),
    spikeFrame: new PIXI.Rectangle(168, 1, 66, 52),
    arrowFrame: new PIXI.Rectangle(1, 296, 64, 64),
    groundFrame: new PIXI.Rectangle(2, 362, 241, 44),
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

    gameTextures.backgroundTexture = backgroundTexture;
    gameTextures.menuBackgroundTexture = menuBackgroundTexture;

    gameTextures.floorTexture = getTextureFromFrame(atlasTexture, textureFrames.floorFrame);
    gameTextures.xenoTexture = getTextureFromFrame(atlasTexture, textureFrames.xenoFrame);
    gameTextures.saftTexture = getTextureFromFrame(atlasTexture, textureFrames.saftFrame);
    gameTextures.spikeTexture = getTextureFromFrame(atlasTexture, textureFrames.spikeFrame);
    gameTextures.arrowTexture = getTextureFromFrame(atlasTexture, textureFrames.arrowFrame);
    gameTextures.groundTexture = getTextureFromFrame(atlasTexture, textureFrames.groundFrame);

    gameTextures.playerTexture = loader.resources[texturesToLoad[3]].texture;
    gameTextures.parallaxTexture = loader.resources[texturesToLoad[4]].texture;

    isLoadingDone = true;

    console.log("All files loaded");
}

loader.add(texturesToLoad).load(loadingDone);
