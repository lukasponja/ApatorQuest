function PlatformClass() {
    this.sprite = new PIXI.Sprite(gameTextures.floorTexture);
    this.position = new PIXI.Point();
    this.velocity = new Vector();
    this.collider = new BoxCollider(this.sprite.width, this.sprite.height);
    this.tag = "Floor";

    this.setPosition = function (newPosition) {
        this.position.copy(newPosition);
        this.sprite.position.copy(newPosition);
        this.collider.setPosition(newPosition);
    }

    this.onCollision = function (other, info) {

    }
}