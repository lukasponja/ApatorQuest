function PlayerClass() {
    this.sprite = new PIXI.Sprite(gameTextures.playerTexture);
    this.position = new PIXI.Point();
    this.velocity = new Vector(0, 0);
    this.collider = new BoxCollider(this.sprite.width, this.sprite.height);
    this.tag = "Player";
    this.isGrounded = false;
    this.jumpImpulse = 15;
    this.horizontalSpeed = 350; //pixels per second

    this.update = function (dt) {
        this.velocity.x = 0;
        if (this.position.y > 400) {
            this.isGrounded = true;
            this.velocity.y = 0;
        }

        if (inputManagerUp.isDown) {
            if (this.isGrounded) {
                this.isGrounded = false;
                this.velocity.y = -this.jumpImpulse;
            }
        }

        if (inputManagerLeft.isDown && inputManagerRight.isUp) {
            if (this.isGrounded) {
                this.velocity.x = -this.horizontalSpeed * dt;
            }
            else {
                this.velocity.x = -this.horizontalSpeed * dt / 2;
            }

        }
        if (inputManagerRight.isDown && inputManagerLeft.isUp) {
            if (this.isGrounded) {
                this.velocity.x = this.horizontalSpeed * dt;
            }
            else {
                this.velocity.x = this.horizontalSpeed * dt / 2;
            }
        }

        if (!this.isGrounded) {
            this.velocity.y += gameGravity * dt;
        }
        this.isGrounded = false


        /*if (inputManagerUp.isDown && inputManagerDown.isUp) {
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
        }*/

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sprite.position.copy(this.position);
        this.collider.setPosition(this.position);
    }

    this.setPosition = function (newPosition) {
        this.position.copy(newPosition);
        this.sprite.position.copy(newPosition);
        this.collider.setPosition(newPosition);
    }

    this.onCollision = function (other, info) {
        if (other.tag == "Item") {

            //TODO: devare after test
            console.log("Item collected.")
        }
        else if (other.tag == "Floor") {
            if (info.top) {
                this.isGrounded = true;
                this.velocity.y = 0;
                this.setPosition(new PIXI.Point(this.position.x, other.position.y - this.collider.height));
            }
            else if (info.bottom) {
                this.velocity.y = 0;
                this.setPosition(new PIXI.Point(this.position.x, other.position.y + other.collider.height));
            }

            if (info.left && !info.bottom && !info.top) {
                this.velocity.x = 0;
                this.setPosition(new PIXI.Point(other.position.x - this.collider.width, this.position.y));
            }
            else if(info.right && !info.bottom && !info.top) {
                this.velocity.x = 0;
                this.setPosition(new PIXI.Point(other.position.x + other.collider.width, this.position.y));
            }

        }
    }
}