"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["../Engine/RenderablePathObject", "../Math/Vector", "./Projectile", "./Ship"], function (RenderablePathObject, Vector, Projectile, Ship) {

    return function (_RenderablePathObject) {
        _inherits(Asteroid, _RenderablePathObject);

        function Asteroid() {
            _classCallCheck(this, Asteroid);

            var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this));

            var path = [new Vector(-30, 10), new Vector(-10, 30), new Vector(10, 30), new Vector(30, 10), new Vector(30, -10), new Vector(10, -30), new Vector(-10, -30), new Vector(-30, -10)];
            Object.assign(_this, {
                path: path,
                velocity: new Vector(2 * (Math.random() - 0.5) * 100, 2 * (Math.random() - 0.5) * 100),
                omega: (Math.random() - 0.5) * 0.1
            });
            for (var i = 0; i < path.length; i++) {
                path[i] = path[i].multiplyScalar(1 + Math.random());
            }
            return _this;
        }

        _createClass(Asteroid, [{
            key: "onCollision",
            value: function onCollision(other) {
                switch (other.constructor) {
                    case Ship:
                        other.destroy();
                        break;
                    case Asteroid:
                        var velocity = this.velocity;
                        this.velocity = other.velocity;
                        other.velocity = velocity;
                        this.position = this.position.addVector(this.position.subtractVector(other.position).normalize());
                        break;
                    case Projectile:
                        this.destroy();
                        other.destroy();
                        break;
                }
            }
        }]);

        return Asteroid;
    }(RenderablePathObject);
});