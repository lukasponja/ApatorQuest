
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.distance = function (vector) {
    this.length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    this.normalizedVector = new Vector(vector.x / this.length, vector.y / this.length);
    return this.normalizedVector;
}

Vector.prototype.normalize = function (vector) {
    this.length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    this.normalizedVector = new Vector(vector.x / this.length, vector.y / this.length);
    return this.normalizedVector;
}

Vector.prototype.direction = function (targetPosition, startPosition) {
    this.direction = new Vector(targetPosition.x - startPosition.x, targetPosition.y - startPosition.y);
    return this.normalize(this.direction);
}



