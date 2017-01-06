
function menuSelectorClass() {
    this.sprite = gameSprites.arrowSprite;
    this.position = new PIXI.Point();
    this.animPositionOffset = 15; //px
    this.movingSpeed = 30; //px per second
    this.defaultPosition = new PIXI.Point();
    this.velocity = new PIXI.Point();
    this.menuOptions = {
        play: 0, highScore: 1
    };
    this.menuOption = this.menuOptions.play;

    this.update = function (dt) {
        if (this.position.x >= this.defaultPosition.x && this.velocity.x >= 0) {
            this.velocity.x = -this.movingSpeed * dt;
        }
        if (this.position.x < this.defaultPosition.x - this.animPositionOffset && this.velocity.x < 0) {
            this.velocity.x = this.movingSpeed * dt;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sprite.position.copy(this.position);

        if (inputManagerDown.isDown && this.position.y != gameObjectPositions.mainManuArrowHighScorePosition.y) {
            this.setPosition(gameObjectPositions.mainManuArrowHighScorePosition);
            this.menuOption = this.menuOptions.highScore;
        }

        if (inputManagerUp.isDown && this.position.y != gameObjectPositions.mainManuArrowPlayPosition.y) {
            this.setPosition(gameObjectPositions.mainManuArrowPlayPosition);
            this.menuOption = this.menuOptions.play;
        }
    }

    this.setPosition = function (newPosition) {
        this.defaultPosition.set(newPosition.x, newPosition.y);
        this.position.set(newPosition.x, newPosition.y);
        this.sprite.position.set(newPosition.x, newPosition.y);
    }
}