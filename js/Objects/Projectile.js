
define([
    "../Engine/RenderablePathObject",
    "../Math/Vector"
], function (RenderablePathObject, Vector) {

    return class Projectile extends RenderablePathObject {

        constructor() {
            super();
            this.path = [new Vector(1, 2), new Vector(-1, 2), new Vector(-1, -4), new Vector(1, -4)];
        }

    }

});