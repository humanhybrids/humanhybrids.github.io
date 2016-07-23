
define([
    "./Vector",
    "./RenderablePathObject",
    "./KeyCodes",
    "./ContextAPI"
], function(Vector, RenderablePathObject, KeyCodes, ContextAPI) {

    function Environment(canvas) {
        this.canvas = canvas;
        this.api = new ContextAPI(canvas);
        this.time = null;
        this.pressed = { };
        this.ship = null;
        this.asteroids = [];
        this.projectiles = [];
        this.width = 1080;
        this.height = 1080;
        this.handlers = { };
        this.setHandlers({
            A: function() {
                this.ship.angle -= 0.1;
            },
            D: function() {
                this.ship.angle += 0.1;
            },
            W: function() {
                var ship = this.ship;
                ship.velocity = ship.velocity.addVector(new Vector(0, 5).rotate(ship.angle));
            },
            S: function() {
                var ship = this.ship;
                ship.velocity = ship.velocity.addVector(new Vector(0, 5).multiplyScalar(-1).rotate(ship.angle));
            },
            SPACE: function() {
                this.projectiles.push(this._createProjectile());
            }
        });
    }

    Environment.prototype = {
        isOutOfBounds: function(r) {
            var x = r.position.x;
            var y = r.position.y;
            return x < 0 || x > this.width || y < 0 || y > this.height;
        },
        checkBounds: function(r) {
            var maxx = this.width;
            var maxy = this.height;
            var pos = r.position;
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
        },
        begin: function() {
            window.addEventListener("resize", this._onWindowResize.bind(this));
            this._onWindowResize();

            this.ship = this._createShip();
            for (var i = 0; i < 20; i++) { this.asteroids.push(this._createAsteroid()); }

            window.addEventListener("keydown", event => this.pressed[event.keyCode] = true);
            window.addEventListener("keyup", event => delete this.pressed[event.keyCode]);
            requestAnimationFrame(timestamp => {
                this.time = timestamp;
                requestAnimationFrame(this.process.bind(this));
            });
        },
        process: function(timestamp) {
            requestAnimationFrame(this.process.bind(this));
            var api = this.api;
            var elapsed = (timestamp - this.time) / 1000;
            var scale = this.canvas.width / this.width;

            for (var key in this.pressed) {
                var handler = this.handlers[key];
                handler && handler.call(this);
            }

            // clear the canvas
            api.clear();

            this._processObject(elapsed, scale, this.ship);
            this.asteroids.forEach(this._processObject.bind(this, elapsed, scale));

            // update projectiles
            this.projectiles.forEach(function(projectile, index) {
                projectile.update(elapsed);
                if (this.isOutOfBounds(projectile)) {
                    this.projectiles.splice(index, 1);
                } else {
                    projectile.render(api, scale);
                }
            }, this);

            this.time = timestamp;
        },
        setHandlers: function(handlers) {
            for (var key in handlers) {
                this.handlers[KeyCodes[key]] = handlers[key];
            }
        },
        _processObject: function(elapsed, scale, obj) {
            obj.update(elapsed);
            this.checkBounds(obj);
            obj.render(this.api, scale);
        },
        _onWindowResize: function() {
            var canvas = this.canvas;
            var edge = Math.min(window.innerWidth, window.innerHeight) - 30;
            canvas.height = canvas.width = edge;
        },
        _createShip: function() {
            var res = this.width;
            return Object.assign(new RenderablePathObject(), {
                path: [new Vector(0, 20), new Vector(-10, -15), new Vector(-5, -10), new Vector(5, -10), new Vector(10, -15)],
                position: new Vector(res / 2, res / 2)
            });
        },
        _createAsteroid: function() {
            var path = [new Vector(-30, 10), new Vector(-10, 30), new Vector(10, 30), new Vector(30, 10), 
                        new Vector(30, -10), new Vector(10, -30), new Vector(-10, -30), new Vector(-30, -10)];
            var asteroid = Object.assign(new RenderablePathObject(), {
                path: path,
                position: new Vector(Math.random() * this.width, Math.random() * this.height),
                velocity: new Vector(2 * (Math.random() - 0.5) * 100, 2 * (Math.random() - 0.5) * 100),
                omega: (Math.random() - 0.5) * 0.1
            });
            for (var i = 0; i < path.length; i++) { 
                path[i] = path[i].multiplyScalar(1 + Math.random());
            }
            return asteroid;
        },
        _createProjectile: function() {
            var ship = this.ship;
            var front = ship.path[0].rotate(ship.angle);
            return Object.assign(new RenderablePathObject(), {
                path: [new Vector(1, 4), new Vector(-1, 4), new Vector(-1, -4), new Vector(1, -4)],
                position: ship.position.addVector(front),
                velocity: ship.velocity.addVector(front.multiplyScalar(25)),
                angle: ship.angle
            });
        }
    };

    return Environment;

});