'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {
    var v1shim = require('v1shim');
    var games = v1shim.games;
    var color = v1shim.color;

    var math = require('math');
    var random = require('random');

    var Missile_Odds = 1;
    games.init({ screen_width: 840, screen_height: 480, fps: 50 });
    var Psyduck = function () {
        var image = games.load_image("psyduck.png");
        var sound = games.load_sound("cubone.wav");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var total = 0;
        var stone = 0;
        var odds = 2;
        var missile_odds = 100;
        var health = new games.Text({ value: 100, size: 30, color: color.blue, top: 5, right: games.screen.width - 20, is_collideable: false });

        var Psyduck = function (_games$Sprite) {
            _inherits(Psyduck, _games$Sprite);

            function Psyduck(_ref) {
                var game = _ref.game,
                    x = _ref.x,
                    y = _ref.y,
                    _ref$speed = _ref.speed,
                    speed = _ref$speed === undefined ? 2 : _ref$speed,
                    _ref$odds_change = _ref.odds_change,
                    odds_change = _ref$odds_change === undefined ? 200 : _ref$odds_change;

                _classCallCheck(this, Psyduck);

                Psyduck.total += 1;

                var _this = _possibleConstructorReturn(this, (Psyduck.__proto__ || Object.getPrototypeOf(Psyduck)).call(this, { image: Psyduck.image, x: x, y: y, dx: speed }));

                _this.odds_change = odds_change;
                _this.missile_wait = 0;
                _this.image = image;
                _this.sound = sound;
                _this.MISSILE_DELAY = MISSILE_DELAY;
                _this.Left = Left;
                _this.Right = Right;
                _this.total = total;
                _this.stone = stone;
                _this.odds = odds;
                _this.missile_odds = missile_odds;
                _this.health = health;
                return _this;
            }

            _createClass(Psyduck, [{
                key: 'die',
                value: function die() {
                    var size = 9;
                    Psyduck.total -= 1;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_cubone = new Cubone({ x: this.x, y: this.y, size: size });
                    games.screen.add(new_cubone);
                    stone = random.randint(1, 3);
                    if (stone == 2) {
                        var new_waterstone = new Water_Stone({ game: this, x: 400, y: 2 });
                        games.screen.add(new_waterstone);
                        Psyduck.sound.play();
                    }

                    if (stone == 1) {
                        var new_thunderstone = new Thunder_Stone({ game: this, x: 400, y: 2 });
                        games.screen.add(new_thunderstone);
                        Psyduck.sound.play();
                    }

                    if (stone == 3) {
                        var new_firestone = new Fire_Stone({ game: this, x: 400, y: 2 });
                        games.screen.add(new_firestone);
                        Psyduck.sound.play();
                    }
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Psyduck.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'update',
                value: function update() {
                    if (random.randrange(this.odds_change) == 0) {
                        this.odds += 1;
                        this.dx = -this.dx;
                    }

                    if (random.randrange(this.missile_odds) == 0) {
                        var new_bubble = new Bubble({ Psyduck_x: this.x, Psyduck_y: this.y });
                        games.screen.add(new_bubble);
                        this.bubble_wait = Psyduck.MISSILE_DELAY;
                    }

                    if (this.odds % 2 == 0) {
                        var image2 = games.load_image("psyduck2.bmp");
                        this.set_image(image2);
                        Psyduck.Left = false;
                        Psyduck.Right = true;
                    } else {
                        image = games.load_image("psyduck.png");
                        this.set_image(image);
                        Psyduck.Left = true;
                        Psyduck.Right = false;
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.health.value <= 0) {
                        this.die();
                    }
                }
            }]);

            return Psyduck;
        }(games.Sprite);

        Psyduck.image = image;
        Psyduck.sound = sound;
        Psyduck.MISSILE_DELAY = MISSILE_DELAY;
        Psyduck.Left = Left;
        Psyduck.Right = Right;
        Psyduck.total = total;
        Psyduck.stone = stone;
        Psyduck.odds = odds;
        Psyduck.missile_odds = missile_odds;
        Psyduck.health = health;
        return Psyduck;
    }();

    var Cubone = function () {
        var image = games.load_image("cubone.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var total = 0;
        var odds = 2;
        var missile_odds = 100;
        var sound = games.load_sound("charizard.wav");
        var health = new games.Text({ value: 100, size: 30, color: color.brown, top: 25, right: games.screen.width - 20, is_collideable: false });

        var Cubone = function (_games$Sprite2) {
            _inherits(Cubone, _games$Sprite2);

            function Cubone(_ref2) {
                var size = _ref2.size,
                    x = _ref2.x,
                    y = _ref2.y,
                    _ref2$speed = _ref2.speed,
                    speed = _ref2$speed === undefined ? 2 : _ref2$speed,
                    _ref2$odds_change = _ref2.odds_change,
                    odds_change = _ref2$odds_change === undefined ? 200 : _ref2$odds_change;

                _classCallCheck(this, Cubone);

                Cubone.total += 1;

                var _this2 = _possibleConstructorReturn(this, (Cubone.__proto__ || Object.getPrototypeOf(Cubone)).call(this, { image: Cubone.image, x: x, y: y, dx: speed }));

                _this2.odds_change = odds_change;
                _this2.missile_wait = 0;
                _this2.image = image;
                _this2.MISSILE_DELAY = MISSILE_DELAY;
                _this2.Left = Left;
                _this2.Right = Right;
                _this2.total = total;
                _this2.odds = odds;
                _this2.missile_odds = missile_odds;
                _this2.sound = sound;
                _this2.health = health;
                return _this2;
            }

            _createClass(Cubone, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    Cubone.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die',
                value: function die() {
                    var size = 9;
                    Cubone.total -= 1;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_charizard = new Charizard({ x: this.x, y: this.y, size: size });
                    games.screen.add(new_charizard);
                    Cubone.sound.play();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'update',
                value: function update() {
                    this.size = 9;
                    if (random.randrange(this.odds_change) == 0) {
                        this.odds += 1;
                        this.dx = -this.dx;
                    }

                    if (random.randrange(this.missile_odds) == 0) {
                        var new_bone = new Bone({ Cubone_x: this.x, Cubone_y: this.y });
                        games.screen.add(new_bone);
                        this.bubble_wait = Cubone.MISSILE_DELAY;
                    }

                    if (this.odds % 2 == 0) {
                        var image2 = games.load_image("cubone2.bmp");
                        this.set_image(image2);
                        Cubone.Left = false;
                        Cubone.Right = true;
                    } else {
                        image = games.load_image("cubone.png");
                        this.set_image(image);
                        Cubone.Left = true;
                        Cubone.Right = false;
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.health.value <= 0) {
                        this.die();
                    }
                }
            }]);

            return Cubone;
        }(games.Sprite);

        Cubone.image = image;
        Cubone.MISSILE_DELAY = MISSILE_DELAY;
        Cubone.Left = Left;
        Cubone.Right = Right;
        Cubone.total = total;
        Cubone.odds = odds;
        Cubone.missile_odds = missile_odds;
        Cubone.sound = sound;
        Cubone.health = health;
        return Cubone;
    }();

    var Charizard = function () {
        var image = games.load_image("charizard.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var total = 0;
        var odds = 2;
        var missile_odds = 100;
        var sound = games.load_sound("snorlax.wav");
        var health = new games.Text({ value: 100, size: 30, color: color.red, top: 45, right: games.screen.width - 20, is_collideable: false });

        var Charizard = function (_games$Sprite3) {
            _inherits(Charizard, _games$Sprite3);

            function Charizard(_ref3) {
                var size = _ref3.size,
                    x = _ref3.x,
                    y = _ref3.y,
                    _ref3$speed = _ref3.speed,
                    speed = _ref3$speed === undefined ? 3 : _ref3$speed,
                    _ref3$odds_change = _ref3.odds_change,
                    odds_change = _ref3$odds_change === undefined ? 100 : _ref3$odds_change;

                _classCallCheck(this, Charizard);

                Charizard.total += 1;

                var _this3 = _possibleConstructorReturn(this, (Charizard.__proto__ || Object.getPrototypeOf(Charizard)).call(this, { image: Charizard.image, x: x, y: y, dx: speed }));

                _this3.odds_change = odds_change;
                _this3.missile_wait = 0;
                _this3.image = image;
                _this3.MISSILE_DELAY = MISSILE_DELAY;
                _this3.Left = Left;
                _this3.Right = Right;
                _this3.total = total;
                _this3.odds = odds;
                _this3.missile_odds = missile_odds;
                _this3.sound = sound;
                _this3.health = health;
                return _this3;
            }

            _createClass(Charizard, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    Charizard.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die',
                value: function die() {
                    var size = 9;
                    Charizard.total -= 1;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_snorlax = new Snorlax({ x: this.x, y: this.y, size: size });
                    games.screen.add(new_snorlax);
                    Charizard.sound.play();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'update',
                value: function update() {
                    this.size = 9;
                    if (random.randrange(this.odds_change) == 0) {
                        this.odds += 1;
                        this.dx = -this.dx;
                    }

                    if (random.randrange(this.missile_odds) == 0) {
                        var new_Fireball = new Fireball({ Charizard_x: this.x, Charizard_y: this.y });
                        games.screen.add(new_Fireball);
                        this.bubble_wait = Charizard.MISSILE_DELAY;
                    }

                    if (this.odds % 2 == 0) {
                        var image2 = games.load_image("charizard2.bmp");
                        this.set_image(image2);
                        Charizard.Left = false;
                        Charizard.Right = true;
                    } else {
                        image = games.load_image("charizard.png");
                        this.set_image(image);
                        Charizard.Left = true;
                        Charizard.Right = false;
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.health.value <= 0) {
                        this.die();
                    }
                }
            }]);

            return Charizard;
        }(games.Sprite);

        Charizard.image = image;
        Charizard.MISSILE_DELAY = MISSILE_DELAY;
        Charizard.Left = Left;
        Charizard.Right = Right;
        Charizard.total = total;
        Charizard.odds = odds;
        Charizard.missile_odds = missile_odds;
        Charizard.sound = sound;
        Charizard.health = health;
        return Charizard;
    }();

    var Snorlax = function () {
        var image = games.load_image("snorlax.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var total = 0;
        var odds = 2;
        var boundary1 = 0;
        var boundary2 = 0;
        var missile_odds = 100;
        var jump_odds = 100;
        var sound = games.load_sound("mewtwo.wav");
        var sound2 = games.load_sound("snorlax2.wav");
        var health = new games.Text({ value: 100, size: 30, color: color.white, top: 65, right: games.screen.width - 20, is_collideable: false });

        var Snorlax = function (_games$Sprite4) {
            _inherits(Snorlax, _games$Sprite4);

            function Snorlax(_ref4) {
                var size = _ref4.size,
                    x = _ref4.x,
                    y = _ref4.y,
                    _ref4$speed = _ref4.speed,
                    speed = _ref4$speed === undefined ? 3 : _ref4$speed,
                    _ref4$odds_change = _ref4.odds_change,
                    odds_change = _ref4$odds_change === undefined ? 100 : _ref4$odds_change;

                _classCallCheck(this, Snorlax);

                Snorlax.total += 1;

                var _this4 = _possibleConstructorReturn(this, (Snorlax.__proto__ || Object.getPrototypeOf(Snorlax)).call(this, { image: Snorlax.image, x: x, y: y, dx: speed }));

                _this4.odds_change = odds_change;
                _this4.missile_wait = 0;
                _this4.image = image;
                _this4.MISSILE_DELAY = MISSILE_DELAY;
                _this4.Left = Left;
                _this4.Right = Right;
                _this4.total = total;
                _this4.odds = odds;
                _this4.boundary1 = boundary1;
                _this4.boundary2 = boundary2;
                _this4.missile_odds = missile_odds;
                _this4.jump_odds = jump_odds;
                _this4.sound = sound;
                _this4.sound2 = sound2;
                _this4.health = health;
                return _this4;
            }

            _createClass(Snorlax, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    Snorlax.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die',
                value: function die() {
                    var size = 9;
                    Snorlax.total -= 1;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_mewtwo = new Mewtwo({ x: this.x, y: 400, size: size });
                    games.screen.add(new_mewtwo);
                    Snorlax.sound.play();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'update',
                value: function update() {
                    this.size = 9;
                    this.boundary1 = this.x + 350;
                    this.boundary2 = this.x - 350;
                    if (random.randrange(this.odds_change) == 0) {
                        this.odds += 1;
                        this.dx = -this.dx;
                    }

                    if (random.randrange(this.jump_odds) == 0) {
                        this.dy = -5;
                        Snorlax.sound2.play();
                    }

                    if (this.bottom < 350) {
                        this.dy = -this.dy;
                    }

                    if (this.top > 390) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.top > 400) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.odds % 2 == 0) {
                        var image2 = games.load_image("snorlax2.bmp");
                        this.set_image(image2);
                        Charizard.Left = false;
                        Charizard.Right = true;
                    } else {
                        image = games.load_image("snorlax.png");
                        this.set_image(image);
                        Charizard.Left = true;
                        Charizard.Right = false;
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = this.overlapping_sprites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var sprite = _step.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    this.x += 50;
                                    sprite.x -= 50;
                                } else {
                                    sprite.x += 50;
                                    this.x -= 50;
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }

                    if (this.health.value <= 0) {
                        this.die();
                    }
                }
            }]);

            return Snorlax;
        }(games.Sprite);

        Snorlax.image = image;
        Snorlax.MISSILE_DELAY = MISSILE_DELAY;
        Snorlax.Left = Left;
        Snorlax.Right = Right;
        Snorlax.total = total;
        Snorlax.odds = odds;
        Snorlax.boundary1 = boundary1;
        Snorlax.boundary2 = boundary2;
        Snorlax.missile_odds = missile_odds;
        Snorlax.jump_odds = jump_odds;
        Snorlax.sound = sound;
        Snorlax.sound2 = sound2;
        Snorlax.health = health;
        return Snorlax;
    }();

    var Mewtwo = function () {
        var image = games.load_image("mewtwo.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var odds = 2;
        var missile_odds = 50;
        var health = new games.Text({ value: 150, size: 30, color: color.purple, top: 85, right: games.screen.width - 20, is_collideable: false });

        var Mewtwo = function (_games$Sprite5) {
            _inherits(Mewtwo, _games$Sprite5);

            function Mewtwo(_ref5) {
                var size = _ref5.size,
                    x = _ref5.x,
                    y = _ref5.y,
                    _ref5$speed = _ref5.speed,
                    speed = _ref5$speed === undefined ? 3 : _ref5$speed,
                    _ref5$odds_change = _ref5.odds_change,
                    odds_change = _ref5$odds_change === undefined ? 100 : _ref5$odds_change;

                _classCallCheck(this, Mewtwo);

                var _this5 = _possibleConstructorReturn(this, (Mewtwo.__proto__ || Object.getPrototypeOf(Mewtwo)).call(this, { image: Mewtwo.image, x: x, y: y, dx: speed }));

                _this5.odds_change = odds_change;
                _this5.missile_wait = 0;
                _this5.image = image;
                _this5.MISSILE_DELAY = MISSILE_DELAY;
                _this5.Left = Left;
                _this5.Right = Right;
                _this5.odds = odds;
                _this5.missile_odds = missile_odds;
                _this5.health = health;
                return _this5;
            }

            _createClass(Mewtwo, [{
                key: 'win',
                value: function win() {
                    var end_message = new games.Message({ value: "You Win!", size: 90, color: color.blue, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    games.screen.add(end_message);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Mewtwo.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.win();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'update',
                value: function update() {
                    this.size = 9;
                    if (random.randrange(this.odds_change) == 0) {
                        this.odds += 1;
                        this.dx = -this.dx;
                    }

                    if (random.randrange(this.missile_odds) == 0) {
                        var new_Shadowball = new Shadowball({ Mewtwo_x: this.x, Mewtwo_y: this.y });
                        games.screen.add(new_Shadowball);
                        this.bubble_wait = Mewtwo.MISSILE_DELAY;
                    }

                    if (this.odds % 2 == 0) {
                        var image2 = games.load_image("mewtwo2.png");
                        this.set_image(image2);
                        Mewtwo.Left = false;
                        Mewtwo.Right = true;
                    } else {
                        image = games.load_image("mewtwo.png");
                        this.set_image(image);
                        Mewtwo.Left = true;
                        Mewtwo.Right = false;
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.health.value <= 0) {
                        this.die();
                    }
                }
            }]);

            return Mewtwo;
        }(games.Sprite);

        Mewtwo.image = image;
        Mewtwo.MISSILE_DELAY = MISSILE_DELAY;
        Mewtwo.Left = Left;
        Mewtwo.Right = Right;
        Mewtwo.odds = odds;
        Mewtwo.missile_odds = missile_odds;
        Mewtwo.health = health;
        return Mewtwo;
    }();

    var Eevee = function () {
        var image = games.load_image("eevee.png");
        var sound = games.load_sound("eevee3.wav");
        var soundend = games.load_sound("gameover.wav");
        var MISSILE_DELAY = 25;
        var JUMP_DELAY = 50;
        var Left = false;
        var Right = false;
        var total = 0;
        var health = new games.Text({ value: 100, size: 30, color: color.red, top: 5, right: games.screen.width - 710, is_collideable: false });
        var stone = new games.Text({ value: "Eevee", size: 30, color: color.white, top: 5, right: games.screen.width - 745, is_collideable: false });

        var Eevee = function (_games$Sprite6) {
            _inherits(Eevee, _games$Sprite6);

            function Eevee(_ref6) {
                var x = _ref6.x,
                    y = _ref6.y;

                _classCallCheck(this, Eevee);

                var _this6 = _possibleConstructorReturn(this, (Eevee.__proto__ || Object.getPrototypeOf(Eevee)).call(this, { image: Eevee.image, x: x, y: y }));

                _this6.missile_wait = 0;
                _this6.jump_wait = 0;
                _this6.image = image;
                _this6.sound = sound;
                _this6.soundend = soundend;
                _this6.MISSILE_DELAY = MISSILE_DELAY;
                _this6.JUMP_DELAY = JUMP_DELAY;
                _this6.Left = Left;
                _this6.Right = Right;
                _this6.total = total;
                _this6.health = health;
                _this6.stone = stone;
                return _this6;
            }

            _createClass(Eevee, [{
                key: 'end',
                value: function end() {
                    var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    Eevee.soundend.play();
                    games.screen.add(end_message);
                }
            }, {
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.end();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    Eevee.total = 1;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.health.destroy();
                    this.stone.destroy();
                    Jolteon.health.destroy();
                    Flareon.health.destroy();
                    Jolteon.stone.destroy();
                    Flareon.stone.destroy();
                    var new_vaporeon = new Vaporeon({ x: 400, y: 400 });
                    games.screen.add(new_vaporeon);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    Eevee.total = 2;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.health.destroy();
                    this.stone.destroy();
                    Vaporeon.health.destroy();
                    Flareon.health.destroy();
                    Vaporeon.stone.destroy();
                    Flareon.stone.destroy();
                    var new_jolteon = new Jolteon({ x: this.x, y: 400 });
                    games.screen.add(new_jolteon);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    Eevee.total = 3;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.health.destroy();
                    this.stone.destroy();
                    Vaporeon.health.destroy();
                    Jolteon.health.destroy();
                    Vaporeon.stone.destroy();
                    Jolteon.stone.destroy();
                    var new_flareon = new Flareon({ x: this.x, y: 400 });
                    games.screen.add(new_flareon);
                }
            }, {
                key: 'die5',
                value: function die5() {
                    Eevee.total = 4;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.health.destroy();
                    this.stone.destroy();
                    var new_mew = new Mew({ x: this.x, y: 400 });
                    games.screen.add(new_mew);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Eevee.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'water_evolve',
                value: function water_evolve() {
                    Eevee.stone.value = "Vaporean";
                }
            }, {
                key: 'update',
                value: function update() {
                    if (games.keyboard.is_pressed(games.K_LEFT)) {
                        var image2 = games.load_image("eevee2.bmp");
                        this.set_image(image2);
                        Eevee.Left = true;
                        Eevee.Right = false;
                        this.x -= 2;
                    }

                    if (games.keyboard.is_pressed(games.K_RIGHT)) {
                        image = games.load_image("eevee.png");
                        this.set_image(image);
                        Eevee.Left = false;
                        Eevee.Right = true;
                        this.x += 2;
                    }

                    if (games.keyboard.is_pressed(games.K_1) && games.keyboard.is_pressed(games.K_5) && games.keyboard.is_pressed(games.K_0)) {
                        this.die5();
                    }

                    if (games.keyboard.is_pressed(games.K_UP) && this.jump_wait == 0) {
                        Eevee.sound.play();
                        this.jump_wait = Eevee.JUMP_DELAY;
                        this.dy = -4;
                    }

                    if (this.bottom < 350) {
                        this.dy = -this.dy;
                    }

                    if (this.top > 360) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.health.value == 0) {
                        this.die();
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.missile_wait > 0) {
                        this.missile_wait -= 1;
                    }

                    if (this.jump_wait > 0) {
                        this.jump_wait -= 1;
                    }

                    if (games.keyboard.is_pressed(games.K_SPACE) && this.missile_wait == 0) {
                        var new_missile = new Missile({ Eevee_x: this.x, Eevee_y: this.y });
                        games.screen.add(new_missile);
                        this.missile_wait = Eevee.MISSILE_DELAY;
                    }
                }
            }]);

            return Eevee;
        }(games.Sprite);

        Eevee.image = image;
        Eevee.sound = sound;
        Eevee.soundend = soundend;
        Eevee.MISSILE_DELAY = MISSILE_DELAY;
        Eevee.JUMP_DELAY = JUMP_DELAY;
        Eevee.Left = Left;
        Eevee.Right = Right;
        Eevee.total = total;
        Eevee.health = health;
        Eevee.stone = stone;
        return Eevee;
    }();

    var Vaporeon = function () {
        var image = games.load_image("vaporeon.png");
        var sound = games.load_sound("vaporeon.wav");
        var soundend = games.load_sound("gameover.wav");
        var Left = false;
        var Right = false;
        var MISSILE_DELAY = 25;
        var JUMP_DELAY = 50;
        var total = 0;
        var health = new games.Text({ value: 100, size: 30, color: color.white, top: 65, right: games.screen.width - 710, is_collideable: false });
        var stone = new games.Text({ value: "Vaporeon", size: 30, color: color.blue, top: 65, right: games.screen.width - 745, is_collideable: false });

        var Vaporeon = function (_games$Sprite7) {
            _inherits(Vaporeon, _games$Sprite7);

            function Vaporeon(_ref7) {
                var x = _ref7.x,
                    y = _ref7.y;

                _classCallCheck(this, Vaporeon);

                var _this7 = _possibleConstructorReturn(this, (Vaporeon.__proto__ || Object.getPrototypeOf(Vaporeon)).call(this, { image: Vaporeon.image, x: x, y: y }));

                _this7.missile_wait = 0;
                _this7.jump_wait = 0;
                _this7.image = image;
                _this7.sound = sound;
                _this7.soundend = soundend;
                _this7.Left = Left;
                _this7.Right = Right;
                _this7.MISSILE_DELAY = MISSILE_DELAY;
                _this7.JUMP_DELAY = JUMP_DELAY;
                _this7.total = total;
                _this7.health = health;
                _this7.stone = stone;
                return _this7;
            }

            _createClass(Vaporeon, [{
                key: 'end',
                value: function end() {
                    var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    Vaporeon.soundend.play();
                    games.screen.add(end_message);
                }
            }, {
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.end();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    Eevee.total = 2;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_jolteon = new Jolteon({ x: this.x, y: this.y });
                    games.screen.add(new_jolteon);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    Eevee.total = 3;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_flareon = new Flareon({ x: this.x, y: this.y });
                    games.screen.add(new_flareon);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Vaporeon.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'water_evolve',
                value: function water_evolve() {
                    Vaporeon.stone.value = "Vaporean";
                }
            }, {
                key: 'update',
                value: function update() {
                    if (games.keyboard.is_pressed(games.K_LEFT)) {
                        var image2 = games.load_image("vaporeon2.bmp");
                        this.set_image(image2);
                        Vaporeon.Left = true;
                        Vaporeon.Right = false;
                        this.x -= 2;
                    }

                    if (games.keyboard.is_pressed(games.K_RIGHT)) {
                        image = games.load_image("vaporeon.png");
                        this.set_image(image);
                        Vaporeon.Left = false;
                        Vaporeon.Right = true;
                        this.x += 2;
                    }

                    if (games.keyboard.is_pressed(games.K_UP) && this.jump_wait == 0) {
                        Vaporeon.sound.play();
                        this.jump_wait = Vaporeon.JUMP_DELAY;
                        this.dy = -4;
                    }

                    if (this.bottom < 350) {
                        this.dy = -this.dy;
                    }

                    if (this.top > 390) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.top > 400) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.health.value == 0) {
                        this.die();
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.missile_wait > 0) {
                        this.missile_wait -= 1;
                    }

                    if (this.jump_wait > 0) {
                        this.jump_wait -= 1;
                    }

                    if (games.keyboard.is_pressed(games.K_SPACE) && this.missile_wait == 0) {
                        var new_missile = new Icebeam({ Vaporeon_x: this.x, Vaporeon_y: this.y });
                        games.screen.add(new_missile);
                        this.missile_wait = Vaporeon.MISSILE_DELAY;
                    }
                }
            }]);

            return Vaporeon;
        }(games.Sprite);

        Vaporeon.image = image;
        Vaporeon.sound = sound;
        Vaporeon.soundend = soundend;
        Vaporeon.Left = Left;
        Vaporeon.Right = Right;
        Vaporeon.MISSILE_DELAY = MISSILE_DELAY;
        Vaporeon.JUMP_DELAY = JUMP_DELAY;
        Vaporeon.total = total;
        Vaporeon.health = health;
        Vaporeon.stone = stone;
        return Vaporeon;
    }();

    var Jolteon = function () {
        var image = games.load_image("jolteon.bmp");
        var sound = games.load_sound("jolteon.wav");
        var soundend = games.load_sound("gameover.wav");
        var Left = false;
        var Right = false;
        var MISSILE_DELAY = 25;
        var JUMP_DELAY = 50;
        var total = 0;
        var health = new games.Text({ value: 100, size: 30, color: color.yellow, top: 85, right: games.screen.width - 710, is_collideable: false });
        var stone = new games.Text({ value: "Jolteon", size: 30, color: color.yellow, top: 85, right: games.screen.width - 745, is_collideable: false });

        var Jolteon = function (_games$Sprite8) {
            _inherits(Jolteon, _games$Sprite8);

            function Jolteon(_ref8) {
                var x = _ref8.x,
                    y = _ref8.y;

                _classCallCheck(this, Jolteon);

                var _this8 = _possibleConstructorReturn(this, (Jolteon.__proto__ || Object.getPrototypeOf(Jolteon)).call(this, { image: Jolteon.image, x: x, y: y }));

                _this8.missile_wait = 0;
                _this8.jump_wait = 0;
                _this8.image = image;
                _this8.sound = sound;
                _this8.soundend = soundend;
                _this8.Left = Left;
                _this8.Right = Right;
                _this8.MISSILE_DELAY = MISSILE_DELAY;
                _this8.JUMP_DELAY = JUMP_DELAY;
                _this8.total = total;
                _this8.health = health;
                _this8.stone = stone;
                return _this8;
            }

            _createClass(Jolteon, [{
                key: 'end',
                value: function end() {
                    var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    Vaporeon.soundend.play();
                    games.screen.add(end_message);
                }
            }, {
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.end();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    Eevee.total = 1;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_vaporeon = new Vaporeon({ x: this.x, y: this.y });
                    games.screen.add(new_vaporeon);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    Eevee.total = 3;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_flareon = new Flareon({ x: this.x, y: this.y });
                    games.screen.add(new_flareon);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Jolteon.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'water_evolve',
                value: function water_evolve() {
                    Jolteon.stone.value = "Jolteon";
                }
            }, {
                key: 'update',
                value: function update() {
                    if (games.keyboard.is_pressed(games.K_LEFT)) {
                        var image2 = games.load_image("jolteon2.bmp");
                        this.set_image(image2);
                        Jolteon.Left = true;
                        Jolteon.Right = false;
                        this.x -= 2;
                    }

                    if (games.keyboard.is_pressed(games.K_RIGHT)) {
                        image = games.load_image("jolteon.bmp");
                        this.set_image(image);
                        Jolteon.Left = false;
                        Jolteon.Right = true;
                        this.x += 2;
                    }

                    if (games.keyboard.is_pressed(games.K_UP) && this.jump_wait == 0) {
                        Jolteon.sound.play();
                        this.jump_wait = Jolteon.JUMP_DELAY;
                        this.dy = -4;
                    }

                    if (this.bottom < 350) {
                        this.dy = -this.dy;
                    }

                    if (this.top > 390) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.top > 400) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.health.value == 0) {
                        this.die();
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.missile_wait > 0) {
                        this.missile_wait -= 1;
                    }

                    if (this.jump_wait > 0) {
                        this.jump_wait -= 1;
                    }

                    if (games.keyboard.is_pressed(games.K_SPACE) && this.missile_wait == 0) {
                        var new_missile = new Lightning({ Jolteon_x: this.x, Jolteon_y: this.y });
                        games.screen.add(new_missile);
                        this.missile_wait = Jolteon.MISSILE_DELAY;
                    }
                }
            }]);

            return Jolteon;
        }(games.Sprite);

        Jolteon.image = image;
        Jolteon.sound = sound;
        Jolteon.soundend = soundend;
        Jolteon.Left = Left;
        Jolteon.Right = Right;
        Jolteon.MISSILE_DELAY = MISSILE_DELAY;
        Jolteon.JUMP_DELAY = JUMP_DELAY;
        Jolteon.total = total;
        Jolteon.health = health;
        Jolteon.stone = stone;
        return Jolteon;
    }();

    var Flareon = function () {
        var image = games.load_image("flareon.bmp");
        var sound = games.load_sound("flareon.wav");
        var soundend = games.load_sound("gameover.wav");
        var Left = false;
        var Right = false;
        var MISSILE_DELAY = 25;
        var JUMP_DELAY = 50;
        var total = 0;
        var health = new games.Text({ value: 100, size: 30, color: color.red, top: 105, right: games.screen.width - 710, is_collideable: false });
        var stone = new games.Text({ value: "Flareon", size: 30, color: color.red, top: 105, right: games.screen.width - 745, is_collideable: false });

        var Flareon = function (_games$Sprite9) {
            _inherits(Flareon, _games$Sprite9);

            function Flareon(_ref9) {
                var x = _ref9.x,
                    y = _ref9.y;

                _classCallCheck(this, Flareon);

                var _this9 = _possibleConstructorReturn(this, (Flareon.__proto__ || Object.getPrototypeOf(Flareon)).call(this, { image: Flareon.image, x: x, y: y }));

                _this9.missile_wait = 0;
                _this9.jump_wait = 0;
                _this9.image = image;
                _this9.sound = sound;
                _this9.soundend = soundend;
                _this9.Left = Left;
                _this9.Right = Right;
                _this9.MISSILE_DELAY = MISSILE_DELAY;
                _this9.JUMP_DELAY = JUMP_DELAY;
                _this9.total = total;
                _this9.health = health;
                _this9.stone = stone;
                return _this9;
            }

            _createClass(Flareon, [{
                key: 'end',
                value: function end() {
                    var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    Flareon.soundend.play();
                    games.screen.add(end_message);
                }
            }, {
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.end();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    Eevee.total = 1;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_vaporeon = new Vaporeon({ x: this.x, y: this.y });
                    games.screen.add(new_vaporeon);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    Eevee.total = 2;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_jolteon = new Jolteon({ x: this.x, y: this.y });
                    games.screen.add(new_jolteon);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Flareon.health.value -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'water_evolve',
                value: function water_evolve() {
                    Flareon.stone.value = "Flareon";
                }
            }, {
                key: 'update',
                value: function update() {
                    if (games.keyboard.is_pressed(games.K_LEFT)) {
                        var image2 = games.load_image("flareon2.bmp");
                        this.set_image(image2);
                        Flareon.Left = true;
                        Flareon.Right = false;
                        this.x -= 2;
                    }

                    if (games.keyboard.is_pressed(games.K_RIGHT)) {
                        image = games.load_image("flareon.bmp");
                        this.set_image(image);
                        Flareon.Left = false;
                        Flareon.Right = true;
                        this.x += 2;
                    }

                    if (games.keyboard.is_pressed(games.K_UP) && this.jump_wait == 0) {
                        Flareon.sound.play();
                        this.jump_wait = Flareon.JUMP_DELAY;
                        this.dy = -4;
                    }

                    if (this.bottom < 350) {
                        this.dy = -this.dy;
                    }

                    if (this.top > 390) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.top > 400) {
                        this.dy = 0;
                        this.y = 400;
                    }

                    if (this.health.value == 0) {
                        this.die();
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.missile_wait > 0) {
                        this.missile_wait -= 1;
                    }

                    if (this.jump_wait > 0) {
                        this.jump_wait -= 1;
                    }

                    if (games.keyboard.is_pressed(games.K_SPACE) && this.missile_wait == 0) {
                        var new_missile = new Fireball2({ Flareon_x: this.x, Flareon_y: this.y });
                        games.screen.add(new_missile);
                        this.missile_wait = Flareon.MISSILE_DELAY;
                    }
                }
            }]);

            return Flareon;
        }(games.Sprite);

        Flareon.image = image;
        Flareon.sound = sound;
        Flareon.soundend = soundend;
        Flareon.Left = Left;
        Flareon.Right = Right;
        Flareon.MISSILE_DELAY = MISSILE_DELAY;
        Flareon.JUMP_DELAY = JUMP_DELAY;
        Flareon.total = total;
        Flareon.health = health;
        Flareon.stone = stone;
        return Flareon;
    }();

    var Mew = function () {
        var image = games.load_image("mew.png");
        var soundend = games.load_sound("gameover.wav");
        var Left = false;
        var Right = false;
        var MISSILE_DELAY = 25;
        var JUMP_DELAY = 50;
        var total = 0;
        var health = 9999;

        var Mew = function (_games$Sprite10) {
            _inherits(Mew, _games$Sprite10);

            function Mew(_ref10) {
                var x = _ref10.x,
                    y = _ref10.y;

                _classCallCheck(this, Mew);

                var _this10 = _possibleConstructorReturn(this, (Mew.__proto__ || Object.getPrototypeOf(Mew)).call(this, { image: Mew.image, x: x, y: y }));

                _this10.missile_wait = 0;
                _this10.jump_wait = 0;
                _this10.image = image;
                _this10.soundend = soundend;
                _this10.Left = Left;
                _this10.Right = Right;
                _this10.MISSILE_DELAY = MISSILE_DELAY;
                _this10.JUMP_DELAY = JUMP_DELAY;
                _this10.total = total;
                _this10.health = health;
                return _this10;
            }

            _createClass(Mew, [{
                key: 'end',
                value: function end() {
                    var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    Flareon.soundend.play();
                    games.screen.add(end_message);
                }
            }, {
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    this.end();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    Eevee.total = 1;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_vaporeon = new Vaporeon({ x: this.x, y: 400 });
                    games.screen.add(new_vaporeon);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    Eevee.total = 2;
                    var size = 9;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_jolteon = new Jolteon({ x: this.x, y: 400 });
                    games.screen.add(new_jolteon);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: 400 });
                    games.screen.add(new_explosion);
                    this.destroy();
                    var new_flareon = new Flareon({ x: this.x, y: 400 });
                    games.screen.add(new_flareon);
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    Mew.health -= 10;
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'update',
                value: function update() {
                    if (games.keyboard.is_pressed(games.K_LEFT)) {
                        var image2 = games.load_image("mew2.png");
                        this.set_image(image2);
                        Mew.Left = true;
                        Mew.Right = false;
                        this.dx = -2;
                    }

                    if (games.keyboard.is_pressed(games.K_RIGHT)) {
                        image = games.load_image("mew.png");
                        this.set_image(image);
                        Mew.Left = false;
                        Mew.Right = true;
                        this.dx = 2;
                    }

                    if (games.keyboard.is_pressed(games.K_UP)) {
                        this.dy = -2;
                    }

                    if (games.keyboard.is_pressed(games.K_DOWN)) {
                        this.dy = 2;
                    }

                    if (games.keyboard.is_pressed(games.K_LEFT) && games.keyboard.is_pressed(games.K_RIGHT)) {
                        this.dy = 0;
                    }

                    if (games.keyboard.is_pressed(games.K_DOWN) && games.keyboard.is_pressed(games.K_UP)) {
                        this.dx = 0;
                    }

                    if (this.health <= 0) {
                        this.die();
                    }

                    if (this.left > games.screen.width) {
                        this.right = 0;
                    }

                    if (this.right < 0) {
                        this.left = games.screen.width;
                    }

                    if (this.missile_wait > 0) {
                        this.missile_wait -= 1;
                    }

                    if (games.keyboard.is_pressed(games.K_SPACE) && this.missile_wait == 0) {
                        var new_missile = new Psychic({ Mew_x: this.x, Mew_y: this.y });
                        games.screen.add(new_missile);
                        this.missile_wait = Mew.MISSILE_DELAY;
                    }
                }
            }]);

            return Mew;
        }(games.Sprite);

        Mew.image = image;
        Mew.soundend = soundend;
        Mew.Left = Left;
        Mew.Right = Right;
        Mew.MISSILE_DELAY = MISSILE_DELAY;
        Mew.JUMP_DELAY = JUMP_DELAY;
        Mew.total = total;
        Mew.health = health;
        return Mew;
    }();

    var Water_Stone = function () {
        var image = games.load_image("waterstone.bmp");
        var total = 0;
        var health = 10;

        var Water_Stone = function (_games$Sprite11) {
            _inherits(Water_Stone, _games$Sprite11);

            function Water_Stone(_ref11) {
                var game = _ref11.game,
                    x = _ref11.x,
                    y = _ref11.y,
                    _ref11$speed = _ref11.speed,
                    speed = _ref11$speed === undefined ? 1 : _ref11$speed;

                _classCallCheck(this, Water_Stone);

                var _this11 = _possibleConstructorReturn(this, (Water_Stone.__proto__ || Object.getPrototypeOf(Water_Stone)).call(this, { image: Water_Stone.image, x: x, y: y, dy: speed }));

                var x = 200;
                var y = 300;
                _this11.image = image;
                _this11.total = total;
                _this11.health = health;
                return _this11;
            }

            _createClass(Water_Stone, [{
                key: 'die',
                value: function die() {
                    var size = 9;
                    Water_Stone.total += 1;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.overlapping_sprites[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var sprite = _step2.value;

                            sprite.die2();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    this.destroy();
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.top < 150) {
                        var dy = 0;
                        var y = 150;
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = this.overlapping_sprites[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var sprite = _step3.value;

                                sprite.die2();
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        this.destroy();
                    }
                }
            }]);

            return Water_Stone;
        }(games.Sprite);

        Water_Stone.image = image;
        Water_Stone.total = total;
        Water_Stone.health = health;
        return Water_Stone;
    }();

    var Thunder_Stone = function () {
        var image = games.load_image("thunderstone.bmp");
        var total = 0;
        var health = 10;

        var Thunder_Stone = function (_games$Sprite12) {
            _inherits(Thunder_Stone, _games$Sprite12);

            function Thunder_Stone(_ref12) {
                var game = _ref12.game,
                    x = _ref12.x,
                    y = _ref12.y,
                    _ref12$speed = _ref12.speed,
                    speed = _ref12$speed === undefined ? 1 : _ref12$speed;

                _classCallCheck(this, Thunder_Stone);

                var _this12 = _possibleConstructorReturn(this, (Thunder_Stone.__proto__ || Object.getPrototypeOf(Thunder_Stone)).call(this, { image: Thunder_Stone.image, x: x, y: y, dy: speed }));

                var x = 200;
                var y = 300;
                _this12.image = image;
                _this12.total = total;
                _this12.health = health;
                return _this12;
            }

            _createClass(Thunder_Stone, [{
                key: 'die',
                value: function die() {
                    var size = 9;
                    Thunder_Stone.total += 2;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = this.overlapping_sprites[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var sprite = _step4.value;

                            sprite.die3();
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    this.destroy();
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.top < 150) {
                        var dy = 0;
                        var y = 150;
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = this.overlapping_sprites[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var sprite = _step5.value;

                                sprite.die3();
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        this.destroy();
                    }
                }
            }]);

            return Thunder_Stone;
        }(games.Sprite);

        Thunder_Stone.image = image;
        Thunder_Stone.total = total;
        Thunder_Stone.health = health;
        return Thunder_Stone;
    }();

    var Fire_Stone = function () {
        var image = games.load_image("firestone.bmp");
        var total = 0;
        var health = 10;

        var Fire_Stone = function (_games$Sprite13) {
            _inherits(Fire_Stone, _games$Sprite13);

            function Fire_Stone(_ref13) {
                var game = _ref13.game,
                    x = _ref13.x,
                    y = _ref13.y,
                    _ref13$speed = _ref13.speed,
                    speed = _ref13$speed === undefined ? 1 : _ref13$speed;

                _classCallCheck(this, Fire_Stone);

                var _this13 = _possibleConstructorReturn(this, (Fire_Stone.__proto__ || Object.getPrototypeOf(Fire_Stone)).call(this, { image: Fire_Stone.image, x: x, y: y, dy: speed }));

                var x = 200;
                var y = 300;
                _this13.image = image;
                _this13.total = total;
                _this13.health = health;
                return _this13;
            }

            _createClass(Fire_Stone, [{
                key: 'die',
                value: function die() {
                    var size = 9;
                    Fire_Stone.total += 3;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = this.overlapping_sprites[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var sprite = _step6.value;

                            sprite.die4();
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }

                    this.destroy();
                }
            }, {
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.top < 150) {
                        var dy = 0;
                        var y = 150;
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = this.overlapping_sprites[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var sprite = _step7.value;

                                sprite.die4();
                            }
                        } catch (err) {
                            _didIteratorError7 = true;
                            _iteratorError7 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                    _iterator7.return();
                                }
                            } finally {
                                if (_didIteratorError7) {
                                    throw _iteratorError7;
                                }
                            }
                        }

                        this.destroy();
                    }
                }
            }]);

            return Fire_Stone;
        }(games.Sprite);

        Fire_Stone.image = image;
        Fire_Stone.total = total;
        Fire_Stone.health = health;
        return Fire_Stone;
    }();

    var Missile = function () {
        var image = games.load_image("missile.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var BUFFER = 0;
        var health = 10;

        var Missile = function (_games$Sprite14) {
            _inherits(Missile, _games$Sprite14);

            _createClass(Missile, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Missile(_ref14) {
                var Eevee_x = _ref14.Eevee_x,
                    Eevee_y = _ref14.Eevee_y;

                _classCallCheck(this, Missile);

                var x = Eevee_x + 100;
                var y = Eevee_y;
                if (Eevee.Right == true) {
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Eevee_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this14 = _possibleConstructorReturn(this, (Missile.__proto__ || Object.getPrototypeOf(Missile)).call(this, { image: Missile.image, x: x, y: y, dx: dx, dy: dy }));

                _this14.lifetime = Missile.LIFETIME;
                if (Eevee.Right == true) {
                    var image2 = games.load_image("missile.bmp");
                    _this14.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("missile2.bmp");
                    _this14.set_image(image2);
                    x = Eevee_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                _this14.image = image;
                _this14.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this14.LIFETIME = LIFETIME;
                _this14.BUFFER = BUFFER;
                _this14.health = health;
                return _this14;
            }

            _createClass(Missile, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                }
            }, {
                key: 'update',
                value: function update() {
                    _get(Missile.prototype.__proto__ || Object.getPrototypeOf(Missile.prototype), 'update', this).call(this);
                    this.lifetime -= 1;
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = this.overlapping_sprites[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var sprite = _step8.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError8 = true;
                            _iteratorError8 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                    _iterator8.return();
                                }
                            } finally {
                                if (_didIteratorError8) {
                                    throw _iteratorError8;
                                }
                            }
                        }
                    }
                }
            }]);

            return Missile;
        }(games.Sprite);

        Missile.image = image;
        Missile.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Missile.LIFETIME = LIFETIME;
        Missile.BUFFER = BUFFER;
        Missile.health = health;
        return Missile;
    }();

    var Bubble = function () {
        var image = games.load_image("bubbles.png");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;

        var Bubble = function (_games$Sprite15) {
            _inherits(Bubble, _games$Sprite15);

            _createClass(Bubble, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Bubble(_ref15) {
                var Psyduck_x = _ref15.Psyduck_x,
                    Psyduck_y = _ref15.Psyduck_y;

                _classCallCheck(this, Bubble);

                var x = Psyduck_x;
                var y = Psyduck_y;
                if (Psyduck.Right == true) {
                    x = Psyduck_x + 100;
                    y = Psyduck_y;
                    var dx = 5;
                    var dy = 0;
                }

                if (Psyduck.Left == true) {
                    x = Psyduck_x - 100;
                    y = Psyduck_y;
                    var dx = -5;
                    var dy = 0;
                }

                var _this15 = _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this, { image: Bubble.image, x: x, y: y, dx: dx, dy: dy }));

                if (Psyduck.Right == true) {
                    var image2 = games.load_image("bubbles.png");
                    _this15.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("bubbles2.png");
                    _this15.set_image(image2);
                    x = Psyduck_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                _this15.image = image;
                _this15.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this15.LIFETIME = LIFETIME;
                _this15.health = health;
                return _this15;
            }

            _createClass(Bubble, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Bubble.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = this.overlapping_sprites[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var sprite = _step9.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }
                    }
                }
            }]);

            return Bubble;
        }(games.Sprite);

        Bubble.image = image;
        Bubble.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Bubble.LIFETIME = LIFETIME;
        Bubble.health = health;
        return Bubble;
    }();

    var Bone = function () {
        var images = ["bone.bmp", "bone.bmp", "bone.bmp", "bone.bmp", "bone.bmp", "bone.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp"];
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var BUFFER = 0;
        var health = 10;

        var Bone = function (_games$Animation) {
            _inherits(Bone, _games$Animation);

            _createClass(Bone, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Bone(_ref16) {
                var Cubone_x = _ref16.Cubone_x,
                    Cubone_y = _ref16.Cubone_y;

                _classCallCheck(this, Bone);

                var x = Cubone_x - 100;
                var y = Cubone_y;
                if (Cubone.Right == true) {
                    x = Cubone_x + 100;
                    y = Cubone_y;
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Cubone_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this16 = _possibleConstructorReturn(this, (Bone.__proto__ || Object.getPrototypeOf(Bone)).call(this, { images: Bone.images, x: x, y: y, dx: dx, dy: dy }));

                _this16.lifetime = Bone.LIFETIME;
                _this16.images = images;
                _this16.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this16.LIFETIME = LIFETIME;
                _this16.BUFFER = BUFFER;
                _this16.health = health;
                return _this16;
            }

            _createClass(Bone, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                }
            }, {
                key: 'update',
                value: function update() {
                    _get(Bone.prototype.__proto__ || Object.getPrototypeOf(Bone.prototype), 'update', this).call(this);
                    this.lifetime -= 1;
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = this.overlapping_sprites[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var sprite = _step10.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError10 = true;
                            _iteratorError10 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }
                            } finally {
                                if (_didIteratorError10) {
                                    throw _iteratorError10;
                                }
                            }
                        }
                    }
                }
            }]);

            return Bone;
        }(games.Animation);

        Bone.images = images;
        Bone.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Bone.LIFETIME = LIFETIME;
        Bone.BUFFER = BUFFER;
        Bone.health = health;
        return Bone;
    }();

    var Fireball = function () {
        var image = games.load_image("fireball.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;

        var Fireball = function (_games$Sprite16) {
            _inherits(Fireball, _games$Sprite16);

            _createClass(Fireball, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Fireball(_ref17) {
                var Charizard_x = _ref17.Charizard_x,
                    Charizard_y = _ref17.Charizard_y;

                _classCallCheck(this, Fireball);

                var x = Charizard_x - 100;
                var y = Charizard_y;
                if (Charizard.Right == true) {
                    x = Charizard_x + 100;
                    y = Charizard_y;
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Charizard_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this17 = _possibleConstructorReturn(this, (Fireball.__proto__ || Object.getPrototypeOf(Fireball)).call(this, { image: Fireball.image, x: x, y: y, dx: dx, dy: dy }));

                if (Charizard.Right == true) {
                    var image2 = games.load_image("fireball2.bmp");
                    _this17.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("fireball.bmp");
                    _this17.set_image(image2);
                    x = Charizard_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                _this17.image = image;
                _this17.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this17.LIFETIME = LIFETIME;
                _this17.health = health;
                return _this17;
            }

            _createClass(Fireball, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Fireball.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion11 = true;
                        var _didIteratorError11 = false;
                        var _iteratorError11 = undefined;

                        try {
                            for (var _iterator11 = this.overlapping_sprites[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                var sprite = _step11.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError11 = true;
                            _iteratorError11 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                    _iterator11.return();
                                }
                            } finally {
                                if (_didIteratorError11) {
                                    throw _iteratorError11;
                                }
                            }
                        }
                    }
                }
            }]);

            return Fireball;
        }(games.Sprite);

        Fireball.image = image;
        Fireball.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Fireball.LIFETIME = LIFETIME;
        Fireball.health = health;
        return Fireball;
    }();

    var Shadowball = function () {
        var image = games.load_image("shadowball.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;

        var Shadowball = function (_games$Sprite17) {
            _inherits(Shadowball, _games$Sprite17);

            _createClass(Shadowball, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Shadowball(_ref18) {
                var Mewtwo_x = _ref18.Mewtwo_x,
                    Mewtwo_y = _ref18.Mewtwo_y;

                _classCallCheck(this, Shadowball);

                var x = Mewtwo_x - 100;
                var y = Mewtwo_y;
                if (Mewtwo.Right == true) {
                    x = Mewtwo_x + 100;
                    y = Mewtwo_y;
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Mewtwo_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this18 = _possibleConstructorReturn(this, (Shadowball.__proto__ || Object.getPrototypeOf(Shadowball)).call(this, { image: Shadowball.image, x: x, y: y, dx: dx, dy: dy }));

                _this18.image = image;
                _this18.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this18.LIFETIME = LIFETIME;
                _this18.health = health;
                return _this18;
            }

            _createClass(Shadowball, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Shadowball.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion12 = true;
                        var _didIteratorError12 = false;
                        var _iteratorError12 = undefined;

                        try {
                            for (var _iterator12 = this.overlapping_sprites[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                var sprite = _step12.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError12 = true;
                            _iteratorError12 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                    _iterator12.return();
                                }
                            } finally {
                                if (_didIteratorError12) {
                                    throw _iteratorError12;
                                }
                            }
                        }
                    }
                }
            }]);

            return Shadowball;
        }(games.Sprite);

        Shadowball.image = image;
        Shadowball.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Shadowball.LIFETIME = LIFETIME;
        Shadowball.health = health;
        return Shadowball;
    }();

    var Icebeam = function () {
        var image = games.load_image("icebeam.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;

        var Icebeam = function (_games$Sprite18) {
            _inherits(Icebeam, _games$Sprite18);

            _createClass(Icebeam, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Icebeam(_ref19) {
                var Vaporeon_x = _ref19.Vaporeon_x,
                    Vaporeon_y = _ref19.Vaporeon_y;

                _classCallCheck(this, Icebeam);

                var x = Vaporeon_x + 100;
                var y = Vaporeon_y;
                if (Vaporeon.Right == true) {
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Vaporeon_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this19 = _possibleConstructorReturn(this, (Icebeam.__proto__ || Object.getPrototypeOf(Icebeam)).call(this, { image: Icebeam.image, x: x, y: y, dx: dx, dy: dy }));

                if (Vaporeon.Right == true) {
                    var image2 = games.load_image("icebeam.bmp");
                    _this19.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("icebeam.png");
                    _this19.set_image(image2);
                    x = Vaporeon_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                _this19.image = image;
                _this19.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this19.LIFETIME = LIFETIME;
                _this19.health = health;
                return _this19;
            }

            _createClass(Icebeam, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Icebeam.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion13 = true;
                        var _didIteratorError13 = false;
                        var _iteratorError13 = undefined;

                        try {
                            for (var _iterator13 = this.overlapping_sprites[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                var sprite = _step13.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError13 = true;
                            _iteratorError13 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                    _iterator13.return();
                                }
                            } finally {
                                if (_didIteratorError13) {
                                    throw _iteratorError13;
                                }
                            }
                        }
                    }
                }
            }]);

            return Icebeam;
        }(games.Sprite);

        Icebeam.image = image;
        Icebeam.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Icebeam.LIFETIME = LIFETIME;
        Icebeam.health = health;
        return Icebeam;
    }();

    var Psychic = function () {
        var image = games.load_image("psychic.png");
        var VELOCITY_FACTOR = 15;
        var LIFETIME = 40;
        var health = 10;

        var Psychic = function (_games$Sprite19) {
            _inherits(Psychic, _games$Sprite19);

            _createClass(Psychic, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Psychic(_ref20) {
                var Mew_x = _ref20.Mew_x,
                    Mew_y = _ref20.Mew_y;

                _classCallCheck(this, Psychic);

                var x = Mew_x + 100;
                var y = Mew_y;
                if (Mew.Right == true) {
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Mew_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this20 = _possibleConstructorReturn(this, (Psychic.__proto__ || Object.getPrototypeOf(Psychic)).call(this, { image: Psychic.image, x: x, y: y, dx: dx, dy: dy }));

                _this20.image = image;
                _this20.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this20.LIFETIME = LIFETIME;
                _this20.health = health;
                return _this20;
            }

            _createClass(Psychic, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Icebeam.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    _get(Psychic.prototype.__proto__ || Object.getPrototypeOf(Psychic.prototype), 'update', this).call(this);
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion14 = true;
                        var _didIteratorError14 = false;
                        var _iteratorError14 = undefined;

                        try {
                            for (var _iterator14 = this.overlapping_sprites[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                var sprite = _step14.value;

                                sprite.decrease_health();
                                sprite.decrease_health();
                                sprite.decrease_health();
                                sprite.decrease_health();
                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 150;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError14 = true;
                            _iteratorError14 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                    _iterator14.return();
                                }
                            } finally {
                                if (_didIteratorError14) {
                                    throw _iteratorError14;
                                }
                            }
                        }
                    }
                }
            }]);

            return Psychic;
        }(games.Sprite);

        Psychic.image = image;
        Psychic.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Psychic.LIFETIME = LIFETIME;
        Psychic.health = health;
        return Psychic;
    }();

    var Lightning = function () {
        var image = games.load_image("lightning.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;

        var Lightning = function (_games$Sprite20) {
            _inherits(Lightning, _games$Sprite20);

            _createClass(Lightning, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Lightning(_ref21) {
                var Jolteon_x = _ref21.Jolteon_x,
                    Jolteon_y = _ref21.Jolteon_y;

                _classCallCheck(this, Lightning);

                var x = Jolteon_x + 100;
                var y = Jolteon_y;
                if (Jolteon.Right == true) {
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Jolteon_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this21 = _possibleConstructorReturn(this, (Lightning.__proto__ || Object.getPrototypeOf(Lightning)).call(this, { image: Lightning.image, x: x, y: y, dx: dx, dy: dy }));

                _this21.image = image;
                _this21.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this21.LIFETIME = LIFETIME;
                _this21.health = health;
                return _this21;
            }

            _createClass(Lightning, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Lightning.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion15 = true;
                        var _didIteratorError15 = false;
                        var _iteratorError15 = undefined;

                        try {
                            for (var _iterator15 = this.overlapping_sprites[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                var sprite = _step15.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError15 = true;
                            _iteratorError15 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                    _iterator15.return();
                                }
                            } finally {
                                if (_didIteratorError15) {
                                    throw _iteratorError15;
                                }
                            }
                        }
                    }
                }
            }]);

            return Lightning;
        }(games.Sprite);

        Lightning.image = image;
        Lightning.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Lightning.LIFETIME = LIFETIME;
        Lightning.health = health;
        return Lightning;
    }();

    var Fireball2 = function () {
        var image = games.load_image("fireball2.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;

        var Fireball2 = function (_games$Sprite21) {
            _inherits(Fireball2, _games$Sprite21);

            _createClass(Fireball2, [{
                key: 'die',
                value: function die() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                    this.destroy();
                }
            }, {
                key: 'die2',
                value: function die2() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die3',
                value: function die3() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }, {
                key: 'die4',
                value: function die4() {
                    var new_explosion = new Explosion({ x: this.x, y: this.y });
                    games.screen.add(new_explosion);
                }
            }]);

            function Fireball2(_ref22) {
                var Flareon_x = _ref22.Flareon_x,
                    Flareon_y = _ref22.Flareon_y;

                _classCallCheck(this, Fireball2);

                var x = Flareon_x + 100;
                var y = Flareon_y;
                if (Flareon.Right == true) {
                    var dx = 5;
                    var dy = 0;
                } else {
                    x = Flareon_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                var _this22 = _possibleConstructorReturn(this, (Fireball2.__proto__ || Object.getPrototypeOf(Fireball2)).call(this, { image: Fireball2.image, x: x, y: y, dx: dx, dy: dy }));

                if (Flareon.Right == true) {
                    var image2 = games.load_image("fireball2.bmp");
                    _this22.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("fireball.bmp");
                    _this22.set_image(image2);
                    x = Flareon_x - 100;
                    var dx = -5;
                    var dy = 0;
                }

                _this22.image = image;
                _this22.VELOCITY_FACTOR = VELOCITY_FACTOR;
                _this22.LIFETIME = LIFETIME;
                _this22.health = health;
                return _this22;
            }

            _createClass(Fireball2, [{
                key: 'decrease_health',
                value: function decrease_health() {
                    this.health -= 10;
                    this.lifetime = Fireball2.LIFETIME;
                }
            }, {
                key: 'update',
                value: function update() {
                    if (this.health == 0) {
                        this.die();
                    }

                    if (this.overlapping_sprites) {
                        var _iteratorNormalCompletion16 = true;
                        var _didIteratorError16 = false;
                        var _iteratorError16 = undefined;

                        try {
                            for (var _iterator16 = this.overlapping_sprites[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                var sprite = _step16.value;

                                sprite.decrease_health();
                                if (sprite.x < this.x) {
                                    sprite.x -= 25;
                                } else {
                                    sprite.x += 25;
                                }

                                this.destroy();
                            }
                        } catch (err) {
                            _didIteratorError16 = true;
                            _iteratorError16 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                    _iterator16.return();
                                }
                            } finally {
                                if (_didIteratorError16) {
                                    throw _iteratorError16;
                                }
                            }
                        }
                    }
                }
            }]);

            return Fireball2;
        }(games.Sprite);

        Fireball2.image = image;
        Fireball2.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Fireball2.LIFETIME = LIFETIME;
        Fireball2.health = health;
        return Fireball2;
    }();

    var Explosion = function () {
        var sound = games.load_sound("boom.wav");
        var images = ["explosion1.bmp", "explosion2.bmp", "explosion3.bmp", "explosion4.bmp", "explosion5.bmp", "explosion6.bmp", "explosion7.bmp", "explosion8.bmp", "explosion9.bmp"];

        var Explosion = function (_games$Animation2) {
            _inherits(Explosion, _games$Animation2);

            function Explosion(_ref23) {
                var x = _ref23.x,
                    y = _ref23.y;

                _classCallCheck(this, Explosion);

                var _this23 = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, { images: Explosion.images, x: x, y: y, repeat_interval: 4, n_repeats: 1, is_collideable: false }));

                Explosion.sound.play();
                _this23.sound = sound;
                _this23.images = images;
                return _this23;
            }

            return Explosion;
        }(games.Animation);

        Explosion.sound = sound;
        Explosion.images = images;
        return Explosion;
    }();

    var Game = function () {
        var Game = function () {
            function Game() {
                _classCallCheck(this, Game);

                this.level = 0;
                this.sound = games.load_sound("psyduck.wav");
                this.Eevee = new Eevee({ x: 100, y: 400 });
                games.screen.add(this.Eevee);
                this.Psyduck = new Psyduck({ game: this, x: 600, y: 400 });
                games.screen.add(this.Psyduck);
                this.sound.play();
                if (Psyduck.total == 0) {
                    this.cubone = new Cubone({ game: this, x: 600, y: 400 });
                    games.screen.add(this.Cubone);
                }

                if (Psyduck.total == 0 && Cubone.total == 0) {
                    this.charizard = new Charizard({ game: this, x: 600, y: 400 });
                    games.screen.add(this.Charizard);
                }

                if (Psyduck.total == 0 && Cubone.total == 0 && Charizard.total == 0) {
                    this.snorlax = new Snorlax({ game: this, x: 600, y: 400 });
                    games.screen.add(this.Snorlax);
                }

                if (Psyduck.total == 0 && Cubone.total == 0 && Charizard.total == 0 && Snorlax.total) {
                    this.mewtwo = new Mewtwo({ game: this, x: 600, y: 400 });
                    games.screen.add(this.Mewtwo);
                }

                if (Eevee.total == 1) {
                    this.vaporeon = new Vaporeon({ x: 200, y: 400 });
                    games.screen.add(this.vaporeon);
                }

                if (Eevee.total == 2) {
                    this.jolteon = new Jolteon({ x: 200, y: 400 });
                    games.screen.add(this.jolteon);
                }

                if (Eevee.total == 3) {
                    this.flareon = new Flareon({ x: 200, y: 400 });
                    games.screen.add(this.flareon);
                }

                if (Eevee.total == 4) {
                    this.mew = new Mew({ x: 200, y: 400 });
                }

                if (Psyduck.stone == 0) {
                    Psyduck.total = random.randint(1, 3);
                    if (Psyduck.stone == 1) {
                        this.waterstone = new Water_Stone({ game: this, x: 400, y: 2 });
                        games.screen.add(this.waterstone);
                    }

                    if (Psyduck.stone == 2) {
                        this.thunderstone = new Thunder_Stone({ game: this, x: 300, y: 2 });
                        games.screen.add(this.thunderstone);
                    }

                    if (Psyduck.stone == 3) {
                        this.firestone = new Fire_Stone({ game: this, x: 200, y: 2 });
                        games.screen.add(this.firestone);
                    }
                }
            }

            _createClass(Game, [{
                key: 'play',
                value: function play() {
                    games.music.load("clocks.mid");
                    games.music.play(-100);
                    var armory_image = games.load_image("armory.jpg");
                    games.screen.background = armory_image;
                    games.screen.mainloop();
                }
            }, {
                key: 'end',
                value: function end() {
                    var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    games.screen.add(end_message);
                }
            }, {
                key: 'win',
                value: function win() {
                    var end_message = new games.Message({ value: "You Win!", size: 90, color: color.blue, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                    games.screen.add(end_message);
                }
            }]);

            return Game;
        }();

        return Game;
    }();

    function main() {
        var pokekombat = new Game();
        pokekombat.play();
    }

    main();
});