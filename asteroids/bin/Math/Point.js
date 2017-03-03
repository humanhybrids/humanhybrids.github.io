"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {

    return function () {
        function Point(x, y) {
            _classCallCheck(this, Point);

            this.x = x;
            this.y = y;
        }

        _createClass(Point, [{
            key: "addVector",
            value: function addVector(v) {
                return new Point(this.x + v.x, this.y + v.y);
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Point(this.x, this.y);
            }
        }, {
            key: "distance",
            value: function distance(p) {
                return Math.sqrt(this.distanceSquared(p));
            }
        }, {
            key: "distanceSquared",
            value: function distanceSquared(p) {
                var x = this.x - p.x;
                var y = this.y - p.y;
                return x * x + y * y;
            }
        }], [{
            key: "random",
            value: function random(rect) {
                return new Point(Math.random() * rect.width + rect.topLeft.x, Math.random() * rect.height + rect.topLeft.y);
            }
        }]);

        return Point;
    }();
});