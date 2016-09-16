
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
            this.maxAsteroids = 10;
            this.asteroidCount = 0;
            this.handlers = {};
            this.score = 0;
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
            for (; this.asteroidCount < this.maxAsteroids; ++this.asteroidCount) {
                this.objects.push(this.createAsteroid());
            }
            var sb = this.scoreBoard = Object.assign(new RenderableTextObject(), {
                text: this.score,
                position: new Vector(this.width / 2, 30),
                fontSize: 20
            });
            objects.push(sb);

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
                requestAnimationFrame(this.process);
            });
        }

        _process(timestamp) {
            requestAnimationFrame(this.process);
            var elapsed = (timestamp - this.time) / 1000;

            for (let key in this.pressed) {
                let handler = this.handlers[key];
                handler && handler.call(this);
            }

            this.api.clear();
            for (var i = 0; i < this.objects.length; i++) {
                var object = this.objects[i];
                if (object.destroyed) {
                    this.objects.splice(this.objects.indexOf(object), 1);
                    continue;
                }
                object.update(elapsed, this.scale);
                object.checkBounds(this.bounds);
                object.render(this.api);
                for (var j = i + 1; j < this.objects.length; j++) {
                    object.checkCollision(this.objects[j]);
                }
            }

            this.time = timestamp;
        }

        get process() {
            var process = this.__process;
            if (!process) {
                process = this.___process = this._process.bind(this);
            }
            return process;
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
            var center = new Vector(this.width / 2, this.height / 2);
            return Object.assign(new Ship(), { 
                position: center,
                onDestroyed: () => {
                    this.objects.push(Object.assign(new RenderableTextObject(), {
                        text: "Game Over",
                        position: center,
                        fontSize: 34
                    }));
                }
            });
        }

        createAsteroid() {
            var pos = Vector.random(this.bounds);
            if (Math.random() < 0.5) {
                pos.x = 0;
            } else {
                pos.y = 0;
            }
            return Object.assign(new Asteroid(), { 
                position: pos,
                onDestroyed: () => {
                    --this.asteroidCount;
                    for (; this.asteroidCount < this.maxAsteroids; ++this.asteroidCount) {
                        this.objects.push(this.createAsteroid());
                    }
                    this.score += 50;
                    this.scoreBoard.text = this.score;
                    this.maxAsteroids = 10 + this.score / 1000;
                    this.maxProjectiles = 1 + this.score / 1000;
                }
            });
        }

        createProjectile(ship) {
            var front = ship.path[0].rotate(ship.angle);
            return Object.assign(new Projectile(), {
                position: ship.position.addVector(front),
                velocity: ship.velocity.addVector(front.multiplyScalar(25)),
                angle: ship.angle,
                onDestroyed: () => --this.projectileCount
            });
        }

    };

});
