function PlayerClass() {
    this.texture = gameTextures.playerTexture;
    //this.sprite = new PIXI.Sprite(gameTextures.playerTexture);
    this.position = new PIXI.Point();
    this.velocity = new Vector(0, 0);
    this.tag = "Player";

    this.isGrounded = false;
    this.jumpImpulse = 15;
    this.backwardSpeed = 350; //pixels per second
    this.fowardSpeed = 150;
    this.crouchTime = 2;
    this.crouchTimer = 0;
    this.energyLevel = 100;

    this.animRunningFrames = [
        new PIXI.Rectangle(0, 0, 87, 124),
        new PIXI.Rectangle(87, 0, 87, 124),
        new PIXI.Rectangle(174, 0, 87, 124),
        new PIXI.Rectangle(261, 0, 87, 124),
        new PIXI.Rectangle(348, 0, 87, 124),
        new PIXI.Rectangle(435, 0, 87, 124)
    ];
    this.animJumpFrames = [
        new PIXI.Rectangle(0, 124, 87, 130),
        new PIXI.Rectangle(87, 124, 87, 130)
    ];
    this.crouchFrame = new PIXI.Rectangle(174, 124, 103, 100);
    this.deadFrame = new PIXI.Rectangle(277, 124, 123, 71);
    this.currentAnimFrame = 0;
    this.animFps = 8;
    this.nextFrameTime = 0;

    this.playerStates = { running: 0, jumping: 1, crouching: 2, dead: 3 };
    this.playerState = this.playerStates.running;

    this.texture.frame = this.animRunningFrames[this.currentAnimFrame];
    this.sprite = new PIXI.Sprite(this.texture);
    this.collider = new BoxCollider(this.sprite.width, this.sprite.height);

    this.update = function (dt) {
        if (this.playerState == this.playerStates.dead) {
            //check for floor
            if (this.position.y > 367 + 53) {
                this.position.y = 367 + 53;
                this.isGrounded = true;
                this.velocity.y = 0;
            }

            //apply gravity
            if (!this.isGrounded) {
                this.velocity.y += gameGravity * dt;
            }
            this.isGrounded = false
        }
        else {
            this.velocity.x = 0;
            this.animFps = 8;
            changeRunningSpeed(0);
            //check for floor
            if (this.position.y > 367) {
                this.position.y = 367;
                this.isGrounded = true;
                this.playerState = this.playerStates.running;
                this.velocity.y = 0;
            }

            //jump
            if (inputManagerUp.isDown) {
                if (this.isGrounded) {
                    this.isGrounded = false;
                    this.velocity.y = -this.jumpImpulse;
                    this.playerState = this.playerStates.jumping;
                }
            }

            //coruch
            if (inputManagerDown.isDown) {
                if (this.isGrounded) {
                    this.playerState = this.playerStates.crouching;
                    this.position.y += 24; //crouch sprite is 24px shorter
                }
            }
            else {
                if (this.playerState == this.playerStates.crouching) {
                    this.playerState = this.playerStates.running;
                    this.position.y -= 24; //crouch sprite is 24px shorter
                }
            }

            //backwards
            if (inputManagerLeft.isDown && inputManagerRight.isUp) {
                if (this.isGrounded) {
                    this.velocity.x = -this.backwardSpeed * dt;
                }
                else {
                    this.velocity.x = -(this.backwardSpeed / 4) * dt;
                }
                this.animFps = 6;
            }

            //fowards
            if (inputManagerRight.isDown && inputManagerLeft.isUp) {
                if (this.isGrounded) {
                    this.velocity.x = this.fowardSpeed * dt;
                }
                else {
                    this.velocity.x = (this.fowardSpeed / 4) * dt;
                }
                this.animFps = 15;
                changeRunningSpeed(50);
            }

            //apply gravity
            if (!this.isGrounded) {
                this.velocity.y += gameGravity * dt;
            }
            this.isGrounded = false

            //
            this.energyLevel -= 0.05;
            if (this.energyLevel < 0) {
                this.energyLevel = 0;
                this.playerState = this.playerStates.dead;
                this.position.y += 53; //dead sprite is 53px shorter
                this.velocity.x = -200 * dt;
            }

        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sprite.position.copy(this.position);
        this.collider.setPosition(this.position);

        this.animate(dt);
        this.collider.setSize(this.sprite.width, this.sprite.height);
    }

    this.setPosition = function (newPosition) {
        this.position.copy(newPosition);
        this.sprite.position.copy(newPosition);
        this.collider.setPosition(newPosition);
    }

    this.onCollision = function (other, info) {
        if (other.tag == "Item") {

            //TODO: devare after test
            //console.log("Item collected.")
            this.energyLevel += 1.3;
            soundManager.playSound(soundManager.sounds.pickUpSound);
            if (this.energyLevel > 100) {
                this.energyLevel = 100;
            }
        }
        else if (other.tag == "Floor") {
            if (info.top && !info.left && !info.right) {
                this.isGrounded = true;
                this.playerState = this.playerStates.running;
                this.velocity.y = 0;
                this.setPosition(new PIXI.Point(this.position.x, other.position.y - this.collider.height));
            }
            else if (info.bottom && !info.left && !info.right) {
                this.velocity.y = 0;
                this.setPosition(new PIXI.Point(this.position.x, other.position.y + other.collider.height));
            }

            if (info.left /*&& !info.bottom && !info.top*/) {
                this.velocity.x = 0;
                this.setPosition(new PIXI.Point(other.position.x - this.collider.width, this.position.y));
            }
            else if (info.right /*&& !info.bottom && !info.top*/) {
                this.velocity.x = 0;
                this.setPosition(new PIXI.Point(other.position.x + other.collider.width, this.position.y));
            }

        }
    }

    this.animate = function (dt) {
        if (this.playerState == this.playerStates.running) {
            this.texture.frame = this.animRunningFrames[this.currentAnimFrame];
            this.nextFrameTime += dt;
            if (this.nextFrameTime >= 1 / this.animFps) {
                this.nextFrameTime = 0;
                this.currentAnimFrame += 1;
                if (this.currentAnimFrame > this.animRunningFrames.length - 1) {
                    this.currentAnimFrame = 0;
                }
            }
        }
        else if (this.playerState == this.playerStates.jumping) {
            //up
            if (this.velocity.y < 0) {
                this.texture.frame = this.animJumpFrames[0];
            }
            //down
            else if (this.velocity.y > 0) {
                this.texture.frame = this.animJumpFrames[1];
            }
        }
        else if (this.playerState == this.playerStates.crouching) {
            this.texture.frame = this.crouchFrame;
        }
        else if (this.playerState == this.playerStates.dead) {
            this.texture.frame = this.deadFrame;
        }
    }
}
