"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["./Point"], function (Point) {

    return function (_Point) {
        _inherits(Vector, _Point);

        /**
         * even though vectors and points are theoretically
         * different concepts they share much of the same 
         * functionality
         */

        function Vector(x, y) {
            _classCallCheck(this, Vector);

            return _possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, x, y));
        }

        _createClass(Vector, [{
            key: "addVector",
            value: function addVector(vec) {
                return new Vector(this.x + vec.x, this.y + vec.y);
            }
        }, {
            key: "clone",
            value: function clone() {
                return new Vector(this.x, this.y);
            }
        }, {
            key: "multiplyScalar",
            value: function multiplyScalar(scalar) {
                scalar = Number(scalar);
                scalar = isNaN(scalar) ? 1 : scalar;
                return new Vector(this.x * scalar, this.y * scalar);
            }
        }, {
            key: "rotate",
            value: function rotate(angle) {
                var sina = Math.sin(angle);
                var cosa = Math.cos(angle);
                return new Vector(this.x * cosa - this.y * sina, this.y * cosa + this.x * sina);
            }
        }, {
            key: "subtractVector",
            value: function subtractVector(vector) {
                return new Vector(this.x - vector.x, this.y - vector.y);
            }
        }, {
            key: "distance",
            value: function distance(vector) {
                return this.subtractVector(vector).length;
            }
        }, {
            key: "normalize",
            value: function normalize() {
                return this.multiplyScalar(1 / this.length);
            }
        }, {
            key: "length",
            get: function get() {
                var x = this.x,
                    y = this.y;
                return Math.sqrt(x * x + y * y);
            }
        }], [{
            key: "random",
            value: function random(rect) {
                var pt = _get(Vector.__proto__ || Object.getPrototypeOf(Vector), "random", this).call(this, rect);
                return new Vector(pt.x, pt.y);
            }
        }]);

        return Vector;
    }(Point);
});