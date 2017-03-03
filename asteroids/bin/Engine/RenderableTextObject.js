"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["../Math/Vector", "../Math/Rect"], function (Vector, Rect) {

    return function () {
        function RenderableTextObject() {
            _classCallCheck(this, RenderableTextObject);

            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.acceleration = new Vector(0, 0);
            this.scale = 1;

            this.text = "";
            this.fontSize = 12;
            this.textAlign = "center";
            this.textBaseline = "middle";
        }

        _createClass(RenderableTextObject, [{
            key: "update",
            value: function update(elapsed, scale) {
                this.scale = scale;
                this.velocity = this.velocity.addVector(this.acceleration.multiplyScalar(elapsed));
                this.position = this.position.addVector(this.velocity.multiplyScalar(elapsed));
            }
        }, {
            key: "render",
            value: function render(api) {
                var scale = this.scale;
                Object.assign(api, {
                    fontSize: this.fontSize * scale,
                    textAlign: this.textAlign,
                    textBaseline: this.textBaseline
                });
                api.drawText(this.text, this.position.multiplyScalar(scale));
            }
        }, {
            key: "checkBounds",
            value: function checkBounds(bounds) {
                if (!bounds.containsPoint(this.position)) {
                    this.destroy();
                }
            }
        }, {
            key: "checkCollision",
            value: function checkCollision(object) {
                return null;
            }
        }, {
            key: "getBoundingRect",
            value: function getBoundingRect() {
                return new Rect();
            }
        }]);

        return RenderableTextObject;
    }();
});