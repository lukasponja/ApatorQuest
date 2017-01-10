function BoxCollider(width, height) {
    this.width = width;
    this.height = height;
    this.position = new PIXI.Point();

    this.setPosition = function (newPosition) {
        this.position.copy(newPosition);
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

BoxCollider.prototype.getCollisionInfo = function(collider1, collider2) {
    
}