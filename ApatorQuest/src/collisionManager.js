function CollisionManagerClass() {
    this.mainCollisionLayer = [];
    this.otherCollisionLayer = [];

    this.checkForCollisions = function () {
        for (let mainObject of this.mainCollisionLayer) {
            for (let other of this.otherCollisionLayer) {
                if (BoxCollider.prototype.checkCollision(mainObject.collider, other.collider)) {
                    mainObject.onCollision(other);
                }
            }
        }
    }
}