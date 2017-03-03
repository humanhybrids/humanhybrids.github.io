"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["./Point"], function (Point) {

    return function () {
        /**
         * Represents a line or line segment between two points
         */

        function Line(x1, y1, x2, y2) {
            _classCallCheck(this, Line);

            this.A = new Point(x1, y1);
            this.B = new Point(x2, y2);
        }

        _createClass(Line, [{
            key: "comparePoint",
            value: function comparePoint(point) {
                /**
                 * Determine if a point is above, below, or on the line
                 * @param point Point
                 */
                return point.y - (this.slope * point.x + this.intercept);
            }
        }, {
            key: "pointInSegment",
            value: function pointInSegment(p) {
                var a = this.A;
                var b = this.B;
                var prec = 10000000000; // precision
                return Math.round(prec * (p.distance(a) + p.distance(b))) === Math.round(prec * a.distance(b));
            }
        }, {
            key: "intersectsSegment",
            value: function intersectsSegment(segment) {
                /**
                 * determine whether two line segments cross
                 * @param segment Line
                 * @returns boolean
                 */
                var intersection = this.lineIntersection(segment);
                return this.pointInSegment(intersection) && segment.pointInSegment(intersection);
            }
        }, {
            key: "lineIntersection",
            value: function lineIntersection(line) {
                /**
                 * find the intersection of this line and another
                 * @param line Line
                 * @returns Point
                 */
                var x = (line.intercept - this.intercept) / (this.slope - line.slope);
                return new Point(x, this.slope * x + this.intercept);
            }
        }, {
            key: "slope",
            get: function get() {
                var a = this.A;
                var b = this.B;
                return (a.y - b.y) / (a.x - b.x);
            }
        }, {
            key: "intercept",
            get: function get() {
                var a = this.A;
                return this.slope * -a.x + a.y;
            }
        }, {
            key: "length",
            get: function get() {
                return this.A.distance(this.B);
            }
        }]);

        return Line;
    }();
});