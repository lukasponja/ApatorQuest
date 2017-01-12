function CollisionManagerClass() {
    this.mainCollisionLayer = [];
    this.otherCollisionLayer = [];

    this.checkForCollisions = function () {
        for (var mainObject of this.mainCollisionLayer) {
            for (var other of this.otherCollisionLayer) {
                if (other.tag == "Ghost") {
                    this.otherCollisionLayer.splice(this.otherCollisionLayer.indexOf(other), 1);
                }
                else {
                    if (BoxCollider.prototype.checkCollision(mainObject.collider, other.collider)) {
                        mainObject.onCollision(other, BoxCollider.prototype.getCollisionInfo(mainObject.collider, other.collider));
                        other.onCollision(mainObject, BoxCollider.prototype.getCollisionInfo(mainObject.collider, other.collider));
                    }
                }
            }
        }
    }
}