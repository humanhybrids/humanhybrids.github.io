
define([
    "../Engine/RenderablePathObject",
    "../Math/Vector"
], function (RenderablePathObject, Vector) {

    return class Ship extends RenderablePathObject {

        constructor() {
            super();
            this.path = [
                new Vector(0, 20), new Vector(-10, -15), new Vector(-5, -10),
                new Vector(5, -10), new Vector(10, -15)];
        }

    }

});