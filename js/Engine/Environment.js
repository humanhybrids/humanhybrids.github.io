
define([
    "../Math/Vector",
    "../Math/Rect",
    "./RenderableTextObject",
    "../Objects/Ship",
    "../Objects/Asteroid",
    "../Objects/Projectile",
    "../Util/KeyCodes",
    "../Util/ContextAPI"
], function (Vector, Rect, RenderableTextObject, Ship, Asteroid, Projectile, KeyCodes, ContextAPI) {

    return class Environment {

        constructor(canvas) {
            this.canvas = canvas;
            this.time = null;
            this.pressed = {};
            this.objects = [];
            this.api = new ContextAPI(canvas);
            this.bounds = new Rect(0, 0, 1080, 1080);
            this.maxProjectiles = 1;
            this.projectileCount = 0;
            this.handlers = {};
        }

        get width() {
            return this.bounds.width;
        }

        get height() {
            return this.bounds.height;
        }

        get scale() {
            return this.canvas.width / this.width;
        }

        begin() {
            var objects = this.objects;
            window.addEventListener("resize", this.resize.bind(this));
            this.resize();

            var ship = this.createShip();
            objects.push(ship);
            for (var i = 0; i < 15; i++) {
                objects.push(this.createAsteroid());
            }

            window.addEventListener("keydown", event => this.pressed[event.keyCode] = true);
            window.addEventListener("keyup", event => delete this.pressed[event.keyCode]);
            this.setHandlers({
                A: () => ship.angle -= 0.1,
                D: () => ship.angle += 0.1,
                W: () => ship.velocity = ship.velocity.addVector(new Vector(0, 5).rotate(ship.angle)),
                S: () => ship.velocity = ship.velocity.addVector(new Vector(0, 5).multiplyScalar(-1).rotate(ship.angle)),
                SPACE: () => {
                    if (!ship.destroyed && this.projectileCount < this.maxProjectiles) {
                        let projectile = this.createProjectile(ship);
                        objects.push(projectile);
                        ++this.projectileCount;
                    }
                }
            });

            requestAnimationFrame(timestamp => {
                this.time = timestamp;
                requestAnimationFrame(this.process.bind(this));
            });
        }

        process(timestamp) {
            requestAnimationFrame(this.process.bind(this));
            var api = this.api;
            var elapsed = (timestamp - this.time) / 1000;

            for (let key in this.pressed) {
                let handler = this.handlers[key];
                handler && handler.call(this);
            }

            api.clear();
            this.objects.forEach(obj => {
                obj.update(elapsed, this.scale);
                obj.checkBounds(this.bounds);
                obj.render(this.api);
            });
            for (var i = 0; i < this.objects.length; i++) {
                for (var j = i + 1; j < this.objects.length; j++) {
                    this.objects[i].checkCollision(this.objects[j]);
                }
            }

            this.time = timestamp;
        }

        destroyObject(object) {
            this.objects.splice(this.objects.indexOf(object), 1);
        }

        setHandlers(handlers) {
            for (var key in handlers) {
                this.handlers[KeyCodes[key]] = handlers[key];
            }
        }

        resize() {
            var canvas = this.canvas;
            var edge = Math.min(window.innerWidth, window.innerHeight) - 20;
            canvas.height = canvas.width = edge;
        }

        createShip() {
            var self = this;
            return Object.assign(new Ship(), {
                position: new Vector(this.width / 2, this.height / 2),
                onDestroyed: function () { self.destroyObject(this); }
            });
        }

        createAsteroid() {
            var self = this;
            return Object.assign(new Asteroid(), {
                position: Vector.random(this.bounds),
                onDestroyed: function () { self.destroyObject(this); }
            });
        }

        createProjectile(ship) {
            var self = this;
            var front = ship.path[0].rotate(ship.angle);
            return Object.assign(new Projectile(), {
                position: ship.position.addVector(front),
                velocity: ship.velocity.addVector(front.multiplyScalar(25)),
                angle: ship.angle,
                onDestroyed: function () {
                    self.destroyObject(this);
                    --self.projectileCount;
                }
            });
        }

    };

});
