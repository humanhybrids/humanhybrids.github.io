
define([
    "../Engine/RenderablePathObject",
    "../Engine/RenderableTextObject",
    "../Math/Vector",
    "./Asteroid"
], function (RenderablePathObject, RenderableTextObject, Vector, Asteroid) {

    return class Ship extends RenderablePathObject {

        constructor() {
            super();
            this.path = [
                new Vector(0, 20), new Vector(-10, -15), new Vector(-5, -10),
                new Vector(5, -10), new Vector(10, -15)];
        }

        onCollision(other) {
            if (other instanceof Asteroid) {
                this.destroy();
            }
        }

    }

});