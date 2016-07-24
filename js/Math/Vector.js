
define(function () {

    return class Vector {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        get length() {
            var x = this.x, y = this.y;
            return Math.sqrt(x * x + y * y);
        }

        addVector(vec) {
            return new Vector(
                this.x + vec.x,
                this.y + vec.y
            );
        }

        clone() {
            return new Vector(this.x, this.y);
        }

        multiplyScalar(scalar) {
            scalar = Number(scalar);
            scalar = isNaN(scalar) ? 1 : scalar;
            return new Vector(
                this.x * scalar,
                this.y * scalar
            );
        }

        rotate(angle) {
            var sina = Math.sin(angle);
            var cosa = Math.cos(angle);
            return new Vector(
                this.x * cosa - this.y * sina,
                this.y * cosa + this.x * sina
            );
        }

        subtractVector(vector) {
            return new Vector(
                this.x - vector.x,
                this.y - vector.y
            );
        }

    }

});
