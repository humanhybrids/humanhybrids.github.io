"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["./Point"], function (Point) {

    return function () {
        function Rect(topLeftX, topLeftY, bottomRightX, bottomRightY) {
            _classCallCheck(this, Rect);

            this.topLeft = new Point(topLeftX || 0, topLeftY || 0);
            this.bottomRight = new Point(bottomRightX || 0, bottomRightY || 0);
        }

        _createClass(Rect, [{
            key: "unionRect",
            value: function unionRect(rect) {
                return new Rect(Math.min(this.topLeft.x, rect.topLeft.x), Math.min(this.topLeft.y, rect.topLeft.y), Math.max(this.bottomRight.x, rect.bottomRight.x), Math.max(this.bottomRight.y, rect.bottomRight.y));
            }
        }, {
            key: "unionPoint",
            value: function unionPoint(point) {
                return new Rect(Math.min(this.topLeft.x, point.x), Math.min(this.topLeft.y, point.y), Math.max(this.bottomRight.x, point.x), Math.max(this.bottomRight.y, point.y));
            }
        }, {
            key: "containsPoint",
            value: function containsPoint(point) {
                return point.x > this.topLeft.x && point.x < this.bottomRight.x && point.y > this.topLeft.y && point.y < this.bottomRight.y;
            }
        }, {
            key: "width",
            get: function get() {
                return this.bottomRight.x - this.topLeft.x;
            },
            set: function set(value) {
                this.bottomRight.x = this.topLeft.x + value;
            }
        }, {
            key: "height",
            get: function get() {
                return this.bottomRight.y - this.topLeft.y;
            },
            set: function set(value) {
                this.bottomRight.y = this.topLeft.y + value;
            }
        }, {
            key: "topRight",
            get: function get() {
                return new Point(this.bottomRight.x, this.topLeft.y);
            }
        }, {
            key: "bottomLeft",
            get: function get() {
                return new Point(this.topLeft.x, this.bottomRight.y);
            }
        }], [{
            key: "pathBoundingRect",
            value: function pathBoundingRect(path) {
                return path.reduce(function (rect, pt) {
                    var tl = rect.topLeft;
                    var br = rect.bottomRight;
                    tl.x = Math.min(tl.x, pt.x);
                    tl.y = Math.min(tl.y, pt.y);
                    br.x = Math.max(br.x, pt.x);
                    br.y = Math.max(br.y, pt.y);
                    return rect;
                }, new Rect(Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE));
            }
        }]);

        return Rect;
    }();
});