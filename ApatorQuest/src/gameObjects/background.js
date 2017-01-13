function BackgroundClass() {
    this.container = new PIXI.Container();
    this.backgroundSprite = new PIXI.extras.TilingSprite(gameTextures.backgroundTexture, renderer.width, renderer.height);
    this.container.addChild(this.backgroundSprite);

    this.parallaxSprite = new PIXI.extras.TilingSprite(gameTextures.parallaxTexture, renderer.width, 452);
    this.parallaxSprite.position.set(0, 122);
    this.container.addChild(this.parallaxSprite);

    this.groundSprite = new PIXI.extras.TilingSprite(gameTextures.groundTexture, renderer.width, 44);
    this.groundSprite.position.set(0, 490);
    this.container.addChild(this.groundSprite);

    this.position = new PIXI.Point();
    this.speed = 10;

    this.update = function (dt) {
        this.backgroundSprite.tilePosition.x -= this.speed * dt;
        this.parallaxSprite.tilePosition.x -= this.speed * 3 * dt;
        this.groundSprite.tilePosition.x -= this.speed * 20 * dt;
    }
}