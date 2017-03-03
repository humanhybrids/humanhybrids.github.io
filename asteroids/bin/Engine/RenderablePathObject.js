"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["../Math/Vector", "../Math/Rect"], function (Vector, Rect) {

    return function () {
        function RenderablePathObject() {
            _classCallCheck(this, RenderablePathObject);

            this.destroyed = false;
            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.acceleration = new Vector(0, 0);
            this.scale = 1;

            this.angle = 0;
            this.omega = 0; // angular velocity
            this.path = [];
            this._translatedPath = null;
        }

        _createClass(RenderablePathObject, [{
            key: "update",
            value: function update(elapsed, scale) {
                this.scale = scale || 1;
                this.angle += this.omega;
                this.velocity = this.velocity.addVector(this.acceleration.multiplyScalar(elapsed));
                this.position = this.position.addVector(this.velocity.multiplyScalar(elapsed));
                this._translatedPath = null;
            }
        }, {
            key: "render",
            value: function render(api) {
                api.drawPath(this.getTranslatedPath());
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.destroyed = true;
                this.onDestroyed();
            }
        }, {
            key: "onDestroyed",
            value: function onDestroyed() {}
        }, {
            key: "getTranslatedPath",
            value: function getTranslatedPath() {
                var path = this._translatedPath;
                if (!path) {
                    path = this._translatedPath = this.path.map(function (pt) {
                        return pt.rotate(this.angle).addVector(this.position).multiplyScalar(this.scale);
                    }, this);
                }
                return path;
            }
        }, {
            key: "getBoundingRect",
            value: function getBoundingRect() {
                return Rect.pathBoundingRect(this.getTranslatedPath());
            }
        }, {
            key: "checkBounds",
            value: function checkBounds(bounds) {
                var pos = this.position;
                var tl = bounds.topLeft;
                var br = bounds.bottomRight;
                if (bounds.containsPoint(pos)) return;
                if (tl.x > pos.x) {
                    pos.x = br.x;
                } else if (br.x < pos.x) {
                    pos.x = tl.x;
                }
                if (tl.y > pos.y) {
                    pos.y = br.y;
                } else if (br.y < pos.y) {
                    pos.y = tl.y;
                }
            }
        }, {
            key: "checkCollision",
            value: function checkCollision(obj) {
                /**
                 * Check if this object collides with the target object
                 * @param obj RenderablePathObject
                 */
                var rect = this.getBoundingRect();
                var orect = obj.getBoundingRect();
                var crect = rect.unionRect(orect);
                var result = crect.width < rect.width + orect.width && crect.height < rect.height + orect.height;
                if (result) {
                    this.onCollision(obj);
                }
                return result;
            }
        }, {
            key: "onCollision",
            value: function onCollision(object) {}
        }]);

        return RenderablePathObject;
    }();
});