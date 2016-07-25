
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
            this.ship = null;
            this.asteroids = [];
            this.projectiles = [];
            this.api = new ContextAPI(canvas);

            this.bounds = new Rect(new Vector(0, 0), new Vector(1080, 1080));
            this.maxprojectiles = 1;

            this.handlers = {};
            this.setHandlers({
                A: function () {
                    this.ship.angle -= 0.1;
                },
                D: function () {
                    this.ship.angle += 0.1;
                },
                W: function () {
                    var ship = this.ship;
                    ship.velocity = ship.velocity.addVector(new Vector(0, 5).rotate(ship.angle));
                },
                S: function () {
                    var ship = this.ship;
                    ship.velocity = ship.velocity.addVector(new Vector(0, 5).multiplyScalar(-1).rotate(ship.angle));
                },
                SPACE: function () {
                    if (this.projectiles.length < this.maxprojectiles) {
                        this.projectiles.push(this._createProjectile());
                    }
                }
            });
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

        isOutOfBounds(point) {
            return !this.bounds.containsPoint(point);
        }

        checkBounds(pos) {
            var maxx = this.width;
            var maxy = this.height;
            if (pos.x < 0) {
                pos.x = maxx;
            } else if (pos.x > maxx) {
                pos.x = 0;
            }
            if (pos.y < 0) {
                pos.y = maxy;
            } else if (pos.y > maxy) {
                pos.y = 0;
            }
        }

        begin() {
            window.addEventListener("resize", this._onWindowResize.bind(this));
            this._onWindowResize();

            var ship = this.ship = this._createShip();
            for (var i = 0; i < 15; i++) {
                let asteroid = this._createAsteroid();
                this.asteroids.push(asteroid);
            }

            window.addEventListener("keydown", event => this.pressed[event.keyCode] = true);
            window.addEventListener("keyup", event => delete this.pressed[event.keyCode]);
            requestAnimationFrame(timestamp => {
                this.time = timestamp;
                requestAnimationFrame(this.process.bind(this));
            });
        }

        process(timestamp) {
            requestAnimationFrame(this.process.bind(this));
            var self = this;
            var api = this.api;
            var ship = this.ship;
            var message = this.message;
            var elapsed = (timestamp - this.time) / 1000;

            function proc(obj) {
                self._processObject(obj, elapsed);
            }

            for (let key in this.pressed) {
                let handler = this.handlers[key];
                ship && handler && handler.call(this);
            }

            api.clear();
            ship && proc(ship);
            message && proc(message);
            this.asteroids.forEach(proc);

            // update projectiles
            this.projectiles.forEach(function (projectile, index) {
                projectile.update(elapsed, this.scale);
                if (this.isOutOfBounds(projectile.position)) {
                    this.projectiles.splice(index, 1);
                } else {
                    projectile.render(api);
                }
            }, this);

            // check collisions
            this.asteroids.forEach(function (asteroid, a_ix) {
                if (ship && asteroid.checkCollision(ship)) {
                    this.message = Object.assign(new RenderableTextObject(), {
                        text: "YOU LOSE!",
                        position: this.ship.position
                    });
                    this.ship = null;
                }
                this.projectiles.forEach(function (projectile, p_ix) {
                    if (asteroid.checkCollision(projectile)) {
                        this.asteroids.splice(a_ix, 1);
                        this.projectiles.splice(p_ix, 1);
                    }
                }, this);
            }, this);

            var c = this.asteroids.slice();
            while (c.length > 0) {
                var asteroid = c.splice(0, 1)[0];
                c.forEach(function(other) {
                    if (asteroid.checkCollision(other)) {
                        var vel = asteroid.velocity;
                        asteroid.velocity = other.velocity;
                        other.velocity = vel;
                    }
                });
            }

            this.time = timestamp;
        }

        setHandlers(handlers) {
            for (var key in handlers) {
                this.handlers[KeyCodes[key]] = handlers[key];
            }
        }

        _processObject(obj, elapsed) {
            obj.update(elapsed, this.scale);
            this.checkBounds(obj.position);
            obj.render(this.api);
        }

        _onWindowResize() {
            var canvas = this.canvas;
            var edge = Math.min(window.innerWidth, window.innerHeight) - 30;
            canvas.height = canvas.width = edge;
        }

        _createShip() {
            return Object.assign(new Ship(), { position: new Vector(this.width / 2, this.height / 2) });
        }

        _createAsteroid() {
            return Object.assign(new Asteroid(), { position: Vector.random(this.bounds) });
        }

        _createProjectile() {
            var ship = this.ship;
            var front = ship.path[0].rotate(ship.angle);
            return Object.assign(new Projectile(), {
                position: ship.position.addVector(front),
                velocity: ship.velocity.addVector(front.multiplyScalar(25)),
                angle: ship.angle
            });
        }

    };

});
