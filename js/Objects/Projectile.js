
define([
    "../Engine/RenderablePathObject",
    "../Math/Vector",
    "./Asteroid"
], function (RenderablePathObject, Vector, Asteroid) {

    return class Projectile extends RenderablePathObject {

        constructor() {
            super();
            this.path = [new Vector(1, 2), new Vector(-1, 2), new Vector(-1, -4), new Vector(1, -4)];
        }

        checkBounds(bounds) {
            if (!bounds.containsPoint(this.position)) {
                this.destroy();
            }
        }

        onCollision(other) {
            if (other instanceof Asteroid) {
                other.destroy();
            }
        }

    }

});