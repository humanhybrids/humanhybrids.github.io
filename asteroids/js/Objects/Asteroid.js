
define([
    "../Engine/RenderablePathObject",
    "../Math/Vector",
    "./Projectile",
    "./Ship"
], function (RenderablePathObject, Vector, Projectile, Ship) {

    return class Asteroid extends RenderablePathObject {

        constructor() {
            super();
            var path = [new Vector(-30, 10), new Vector(-10, 30), new Vector(10, 30), new Vector(30, 10),
                new Vector(30, -10), new Vector(10, -30), new Vector(-10, -30), new Vector(-30, -10)];
            Object.assign(this, {
                path: path,
                velocity: new Vector(2 * (Math.random() - 0.5) * 100, 2 * (Math.random() - 0.5) * 100),
                omega: (Math.random() - 0.5) * 0.1
            });
            for (var i = 0; i < path.length; i++) {
                path[i] = path[i].multiplyScalar(1 + Math.random());
            }
        }

        onCollision(other) {
            switch (other.constructor) {
                case Ship:
                    other.destroy();
                    break;
                case Asteroid:
                    let velocity = this.velocity;
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

    };

});
