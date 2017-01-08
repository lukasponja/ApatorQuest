function PlayerClass() {
    this.sprite = new PIXI.Sprite(gameTextures.playerTexture);
    this.position = new PIXI.Point();
    this.velocity = new Vector();
    this.collider = new BoxCollider(this.sprite.width, this.sprite.height);
    this.tag = "Player";

    this.update = function (dt) {
        if (inputManagerUp.isDown && inputManagerDown.isUp) {
            this.velocity.y = -10;
        }
        if (inputManagerDown.isDown && inputManagerUp.isUp) {
            this.velocity.y = 10;
        }
        if (inputManagerUp.isUp && inputManagerDown.isUp) {
            this.velocity.y = 0;
        }

        if (inputManagerLeft.isDown && inputManagerRight.isUp) {
            this.velocity.x = -10;
        }
        if (inputManagerRight.isDown && inputManagerLeft.isUp) {
            this.velocity.x = 10;
        }
        if (inputManagerLeft.isUp && inputManagerRight.isUp) {
            this.velocity.x = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sprite.position.copy(this.position);
        this.collider.setPosition(this.position);
    }

    this.onCollision = function(other) {
        if(other.tag == "Item") {

            //TODO: delete after test
            console.log("Item collected.")
        }
    }
}