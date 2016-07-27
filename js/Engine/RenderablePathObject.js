
define([
    "../Math/Vector",
    "../Math/Rect"
], function (Vector, Rect) {

    return class RenderablePathObject {

        constructor() {
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

        update(elapsed, scale) {
            this.scale = scale || 1;
            this.angle += this.omega;
            this.velocity = this.velocity.addVector(this.acceleration.multiplyScalar(elapsed));
            this.position = this.position.addVector(this.velocity.multiplyScalar(elapsed));
            this._translatedPath = null;
        }

        render(api) {
            api.drawPath(this.getTranslatedPath());
        }

        destroy() {
            this.destroyed = true;
            this.onDestroyed();
        }

        onDestroyed() {

        }

        getTranslatedPath() {
            var path = this._translatedPath;
            if (!path) {
                path = this._translatedPath = this.path.map(function (pt) {
                    return pt.rotate(this.angle).addVector(this.position).multiplyScalar(this.scale);
                }, this);
            }
            return path;
        }

        getBoundingRect() {
            return Rect.pathBoundingRect(this.getTranslatedPath());
        }

        checkBounds(bounds) {
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

        checkCollision(obj) {
            /**
             * Check if this object collides with the target object
             * @param obj RenderablePathObject
             */
            var rect = this.getBoundingRect();
            var orect = obj.getBoundingRect();
            var crect = rect.unionRect(orect);
            var result = crect.width < rect.width + orect.width
                && crect.height < rect.height + orect.height;
            if (result) {
                this.onCollision(obj);
            }
            return result;
        }

        onCollision(object) {

        }

    };

});
