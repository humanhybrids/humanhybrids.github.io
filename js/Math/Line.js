
define([
    "./Point"
],function(Point) {

    return class Line {
        /**
         * Represents a line or line segment between two points
         */

        constructor(a, b) {
            this.A = a;
            this.B = b;
        }

        get slope() {
            var a = this.A;
            var b = this.B;
            return (a.y - b.y) / (a.x - b.x);
        }

        get intercept() {
            var a = this.A;
            return this.slope * -a.x + a.y; 
        }

        get length() {
            return this.A.distance(this.B);
        }

        comparePoint(point) {
            /**
             * Determine if a point is above, below, or on the line
             * @param point Point
             */
            return point.y - (this.slope * point.x + this.intercept);
        }

        pointInSegment(point) {
            var a = this.A;
            var b = this.B;
            var p = 1000000; // precision
            return Math.round(p * (point.distance(a) + point.distance(b))) === Math.round(p * a.distance(b));
        }

        intersectsSegment(segment) {
            /**
             * determine whether two line segments cross
             * @param segment Line
             * @returns boolean
             */
            var intersection = this.lineIntersection(segment);
            return this.pointInSegment(intersection) && segment.pointInSegment(intersection);
        }

        lineIntersection(line) {
            /**
             * find the intersection of this line and another
             * @param line Line
             * @returns Point
             */
            var x = (line.intercept - this.intercept) / (this.slope - line.slope);
            return new Point(x, this.slope * x + this.intercept);
        }

    }

});