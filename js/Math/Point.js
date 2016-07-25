
define(function () {

    return class Point {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        addVector(vec) {
            return new Point(
                this.x + vec.x,
                this.y + vec.y
            );
        }

        clone() {
            return new Point(this.x, this.y);
        }

        subtractPoint(point) {
            return new Vector(
                this.x - point.x,
                this.y - point.y
            );
        }

        distance(point) {
            return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
        }

        static random(rect) {
            return new Point(
                Math.random() * rect.width + rect.topLeft.x,
                Math.random() * rect.height + rect.topLeft.y
            );
        }

    }

});
