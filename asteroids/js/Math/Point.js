
define(function () {

    return class Point {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        addVector(v) {
            return new Point(
                this.x + v.x,
                this.y + v.y
            );
        }

        clone() {
            return new Point(this.x, this.y);
        }

        distance(p) {
            return Math.sqrt(this.distanceSquared(p));
        }

        distanceSquared(p) {
            var x = this.x - p.x;
            var y = this.y - p.y;
            return x * x + y * y;
        }

        static random(rect) {
            return new Point(
                Math.random() * rect.width + rect.topLeft.x,
                Math.random() * rect.height + rect.topLeft.y
            );
        }

    }

});
