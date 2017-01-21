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

        /*for (var mainIndex = 0; mainIndex < this.mainCollisionLayer.length; mainIndex++) {
            for (var otherIndex = 0; otherIndex < this.otherCollisionLayer.length; otherIndex++) {
                if (this.otherCollisionLayer[otherIndex].tag == "Ghost") {
                    this.otherCollisionLayer.splice(otherIndex, 1);
                }
                else {
                    if (BoxCollider.prototype.checkCollision(this.mainCollisionLayer[mainIndex].collider,
                        this.otherCollisionLayer[otherIndex].collider)) {
                        this.mainCollisionLayer[mainIndex].onCollision(this.otherCollisionLayer[otherIndex],
                            BoxCollider.prototype.getCollisionInfo(this.mainCollisionLayer[mainIndex].collider,
                                this.otherCollisionLayer[otherIndex].collider));
                        this.otherCollisionLayer[otherIndex].onCollision(this.mainCollisionLayer[mainIndex],
                            BoxCollider.prototype.getCollisionInfo(this.mainCollisionLayer[mainIndex].collider,
                                this.otherCollisionLayer[otherIndex].collider));
                    }
                }
            }
        }*/
    }
}