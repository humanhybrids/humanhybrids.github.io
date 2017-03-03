"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["../Math/Vector", "../Math/Rect", "./RenderableTextObject", "../Objects/Ship", "../Objects/Asteroid", "../Objects/Projectile", "../Util/KeyCodes", "../Util/ContextAPI"], function (Vector, Rect, RenderableTextObject, Ship, Asteroid, Projectile, KeyCodes, ContextAPI) {

    return function () {
        function Environment(canvas) {
            _classCallCheck(this, Environment);

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

        _createClass(Environment, [{
            key: "begin",
            value: function begin() {
                var _this = this;

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

                window.addEventListener("keydown", function (event) {
                    return _this.pressed[event.keyCode] = true;
                });
                window.addEventListener("keyup", function (event) {
                    return delete _this.pressed[event.keyCode];
                });
                this.setHandlers({
                    A: function A() {
                        return ship.angle -= 0.1;
                    },
                    D: function D() {
                        return ship.angle += 0.1;
                    },
                    W: function W() {
                        return ship.velocity = ship.velocity.addVector(new Vector(0, 5).rotate(ship.angle));
                    },
                    S: function S() {
                        return ship.velocity = ship.velocity.addVector(new Vector(0, 5).multiplyScalar(-1).rotate(ship.angle));
                    },
                    SPACE: function SPACE() {
                        if (!ship.destroyed && _this.projectileCount < _this.maxProjectiles) {
                            var projectile = _this.createProjectile(ship);
                            objects.push(projectile);
                            ++_this.projectileCount;
                        }
                    }
                });

                requestAnimationFrame(function (timestamp) {
                    _this.time = timestamp;
                    requestAnimationFrame(_this.process);
                });
            }
        }, {
            key: "_process",
            value: function _process(timestamp) {
                requestAnimationFrame(this.process);
                var elapsed = (timestamp - this.time) / 1000;

                for (var key in this.pressed) {
                    var handler = this.handlers[key];
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
        }, {
            key: "setHandlers",
            value: function setHandlers(handlers) {
                for (var key in handlers) {
                    this.handlers[KeyCodes[key]] = handlers[key];
                }
            }
        }, {
            key: "resize",
            value: function resize() {
                var canvas = this.canvas;
                var edge = Math.min(window.innerWidth, window.innerHeight) - 20;
                canvas.height = canvas.width = edge;
            }
        }, {
            key: "createShip",
            value: function createShip() {
                var _this2 = this;

                var center = new Vector(this.width / 2, this.height / 2);
                return Object.assign(new Ship(), {
                    position: center,
                    onDestroyed: function onDestroyed() {
                        _this2.objects.push(Object.assign(new RenderableTextObject(), {
                            text: "Game Over",
                            position: center,
                            fontSize: 34
                        }));
                    }
                });
            }
        }, {
            key: "createAsteroid",
            value: function createAsteroid() {
                var _this3 = this;

                var pos = Vector.random(this.bounds);
                if (Math.random() < 0.5) {
                    pos.x = 0;
                } else {
                    pos.y = 0;
                }
                return Object.assign(new Asteroid(), {
                    position: pos,
                    onDestroyed: function onDestroyed() {
                        --_this3.asteroidCount;
                        for (; _this3.asteroidCount < _this3.maxAsteroids; ++_this3.asteroidCount) {
                            _this3.objects.push(_this3.createAsteroid());
                        }
                        _this3.score += 50;
                        _this3.scoreBoard.text = _this3.score;
                        _this3.maxAsteroids = 10 + _this3.score / 1000;
                        _this3.maxProjectiles = 1 + _this3.score / 1000;
                    }
                });
            }
        }, {
            key: "createProjectile",
            value: function createProjectile(ship) {
                var _this4 = this;

                var front = ship.path[0].rotate(ship.angle);
                return Object.assign(new Projectile(), {
                    position: ship.position.addVector(front),
                    velocity: ship.velocity.addVector(front.multiplyScalar(25)),
                    angle: ship.angle,
                    onDestroyed: function onDestroyed() {
                        return --_this4.projectileCount;
                    }
                });
            }
        }, {
            key: "width",
            get: function get() {
                return this.bounds.width;
            }
        }, {
            key: "height",
            get: function get() {
                return this.bounds.height;
            }
        }, {
            key: "scale",
            get: function get() {
                return this.canvas.width / this.width;
            }
        }, {
            key: "process",
            get: function get() {
                var process = this.__process;
                if (!process) {
                    process = this.___process = this._process.bind(this);
                }
                return process;
            }
        }]);

        return Environment;
    }();
});