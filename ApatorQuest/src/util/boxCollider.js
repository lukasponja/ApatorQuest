function BoxCollider(width, height) {
    this.width = width;
    this.height = height;
    this.position = new PIXI.Point();

    this.setPosition = function (newPosition) {
        this.position.copy(newPosition);
    }

    this.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    }
}

BoxCollider.prototype.checkCollision = function (collider1, collider2) {
    if (collider1.position.x < collider2.position.x + collider2.width &&
        collider1.position.x + collider1.width > collider2.position.x &&
        collider1.position.y < collider2.position.y + collider2.height &&
        collider1.height + collider1.position.y > collider2.position.y) {
        return true;
    }
    else {
        return false;
    }
}

BoxCollider.prototype.getCollisionInfo = function (collider1, collider2) {
    var collisionInfo = {
        top: false,
        bottom: false,
        left: false,
        right: false
    };

    if (collider1.position.y + collider1.height > collider2.position.y &&
        collider1.position.y + collider1.height < collider2.position.y + collider2.height / 2) {
        collisionInfo.top = true;
    }
    else if (collider1.position.y > collider2.position.y + collider2.height / 2 &&
        collider1.position.y < collider2.position.y + collider2.height) {
        collisionInfo.bottom = true;
    }

    if (collider1.position.x + collider1.width > collider2.position.x &&
        collider1.position.x + collider1.width < collider2.position.x + collider2.width / 2) {
        collisionInfo.left = true;
    }
    else if (collider1.position.x > collider2.position.x + collider2.width / 2 &&
        collider1.position.x < collider2.position.x + collider2.width) {
        collisionInfo.right = true;
    }
    return collisionInfo;
}