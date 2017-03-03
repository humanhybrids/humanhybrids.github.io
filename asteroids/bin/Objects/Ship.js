"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["../Engine/RenderablePathObject", "../Engine/RenderableTextObject", "../Math/Vector", "./Asteroid"], function (RenderablePathObject, RenderableTextObject, Vector, Asteroid) {

    return function (_RenderablePathObject) {
        _inherits(Ship, _RenderablePathObject);

        function Ship() {
            _classCallCheck(this, Ship);

            var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this));

            _this.path = [new Vector(0, 20), new Vector(-10, -15), new Vector(-5, -10), new Vector(5, -10), new Vector(10, -15)];
            return _this;
        }

        _createClass(Ship, [{
            key: "onCollision",
            value: function onCollision(other) {
                if (other instanceof Asteroid) {
                    this.destroy();
                }
            }
        }]);

        return Ship;
    }(RenderablePathObject);
});