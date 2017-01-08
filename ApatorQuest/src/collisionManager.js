function CollisionManagerClass() {
    this.mainCollisionLayer = [];
    this.otherCollisionLayer = [];

    this.checkForCollisions = function () {
        for (let mainObject of this.mainCollisionLayer) {
            for (let other of this.otherCollisionLayer) {
                if (other.tag == "Ghost") {
                    this.otherCollisionLayer.splice(this.otherCollisionLayer.indexOf(other), 1);
                }
                else {
                    if (BoxCollider.prototype.checkCollision(mainObject.collider, other.collider)) {
                        mainObject.onCollision(other);
                        other.onCollision(mainObject);
                    }
                }
            }
        }
    }
}