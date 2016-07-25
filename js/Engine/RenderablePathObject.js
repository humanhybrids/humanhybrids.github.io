
define([
    "../Math/Vector",
    "../Math/Rect"
], function (Vector, Rect) {

    return class RenderablePathObject {

        constructor() {
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
            // api.drawRect(this.getBoundingRect());
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

        checkCollision(obj) {
            /**
             * Check if this object collides with the target object
             * @param obj RenderablePathObject
             */
            var rect = this.getBoundingRect();
            var orect = obj.getBoundingRect();
            var crect = rect.unionRect(orect);
            return crect.width < rect.width + orect.width
                && crect.height < rect.height + orect.height;
        }
        
    };

});
