function BackgroundClass() {
    this.sprite = new PIXI.extras.TilingSprite(gameTextures.backgroundTexture, renderer.width, renderer.height);
    this.position = new PIXI.Point();
    this.speed = 10;

    this.update = function (dt) {
        this.sprite.tilePosition.x -= this.speed * dt;
    }
}