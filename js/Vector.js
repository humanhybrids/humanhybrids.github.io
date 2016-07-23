
define(function() {

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

function V(x, y) {
    return new Vector(x, y);
}

Vector.prototype = {
    rotate: function(angle) {
        var sina = Math.sin(angle);
        var cosa = Math.cos(angle);
        return new Vector(
            this.x * cosa - this.y * sina,
            this.y * cosa + this.x * sina
        );
    },
    addVector: function(vec) {
        return new Vector(
            this.x + vec.x,
            this.y + vec.y
        );
    },
    multiplyScalar: function(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        );
    }
};

return Vector;

});
