"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define([], function () {

    var BASE_IMAGE_URL = './images/';
    var BASE_SOUND_URL = './sounds/';

    var images = {};

    var Rect = function () {
        _createClass(Rect, null, [{
            key: 'union',
            value: function union(r1, r2) {
                var x = Math.min(r1.x, r2.x);
                var y = Math.min(r1.y, r2.y);
                var width = Math.max(r1.x + r1.width, r2.x + r2.width) - x;
                var height = Math.max(r1.y + r1.height, r2.y + r2.height) - y;
                return new Rect({ x: x, y: y, width: width, height: height });
            }
        }]);

        function Rect(_ref) {
            var x = _ref.x,
                y = _ref.y,
                width = _ref.width,
                height = _ref.height;

            _classCallCheck(this, Rect);

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        return Rect;
    }();

    var Screen = function () {
        function Screen(_ref2) {
            var width = _ref2.width,
                height = _ref2.height,
                _ref2$fps = _ref2.fps,
                fps = _ref2$fps === undefined ? 60 : _ref2$fps,
                background = _ref2.background;

            _classCallCheck(this, Screen);

            var canvas = this.canvas = document.createElement("canvas");
            Object.assign(canvas, { width: width, height: height });
            document.body.appendChild(canvas);
            this.objects = [];
            this.paused = false;
            this.fps = fps;
            this.background = background;
            this.context = canvas.getContext("2d");
        }

        _createClass(Screen, [{
            key: 'add',
            value: function add(object) {
                this.objects.push(object);
            }
        }, {
            key: 'remove',
            value: function remove(object) {
                this.objects.splice(this.objects.indexOf(object), 1);
            }
        }, {
            key: 'region',
            value: function region(_ref3) {
                var _ref3$x = _ref3.x,
                    x = _ref3$x === undefined ? 0 : _ref3$x,
                    _ref3$y = _ref3.y,
                    y = _ref3$y === undefined ? 0 : _ref3$y,
                    width = _ref3.width,
                    height = _ref3.height;

                return this.objects.filter(function (obj) {
                    if (!(obj instanceof Sprite) || !obj.is_collideable) return false;
                    var u = Rect.union({ x: x, y: y, width: width, height: height }, obj);
                    return u.width < width + obj.width && u.height < height + obj.height;
                });
            }
        }, {
            key: 'quit',
            value: function quit() {
                window.location.reload(true);
            }
        }, {
            key: 'mainloop',
            value: function mainloop(t) {
                var _this = this;

                if (this.background) {
                    this.context.drawImage(this.background, 0, 0, this.width, this.height);
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var obj = _step.value;

                        if (obj.destroyed) {
                            this.remove(obj);
                            continue;
                        }
                        obj.tick();
                        obj.update();
                        obj.render(this.context);
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

                if (!this.paused) window.requestAnimationFrame(function (t) {
                    return _this.mainloop(t);
                });
            }
        }, {
            key: 'width',
            get: function get() {
                return this.canvas.width;
            }
        }, {
            key: 'height',
            get: function get() {
                return this.canvas.height;
            }
        }]);

        return Screen;
    }();

    var Renderable = function () {
        function Renderable(_ref4) {
            var _ref4$x = _ref4.x,
                x = _ref4$x === undefined ? 0 : _ref4$x,
                _ref4$y = _ref4.y,
                y = _ref4$y === undefined ? 0 : _ref4$y,
                _ref4$dx = _ref4.dx,
                dx = _ref4$dx === undefined ? 0 : _ref4$dx,
                _ref4$dy = _ref4.dy,
                dy = _ref4$dy === undefined ? 0 : _ref4$dy;

            _classCallCheck(this, Renderable);

            this.destroyed = false;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
        }

        _createClass(Renderable, [{
            key: 'destroy',
            value: function destroy() {
                this.destroyed = true;
            }
        }, {
            key: 'tick',
            value: function tick() {
                this.x += this.dx;
                this.y += this.dy;
            }
        }, {
            key: 'update',
            value: function update() {}
        }, {
            key: 'render',
            value: function render(context) {}
        }]);

        return Renderable;
    }();

    var Text = function (_Renderable) {
        _inherits(Text, _Renderable);

        function Text(_ref5) {
            var value = _ref5.value,
                top = _ref5.top,
                right = _ref5.right,
                _ref5$x = _ref5.x,
                x = _ref5$x === undefined ? 0 : _ref5$x,
                _ref5$y = _ref5.y,
                y = _ref5$y === undefined ? 0 : _ref5$y,
                _ref5$size = _ref5.size,
                size = _ref5$size === undefined ? 12 : _ref5$size,
                _ref5$color = _ref5.color,
                color = _ref5$color === undefined ? "black" : _ref5$color,
                _ref5$is_collideable = _ref5.is_collideable,
                is_collideable = _ref5$is_collideable === undefined ? false : _ref5$is_collideable,
                _ref5$dx = _ref5.dx,
                dx = _ref5$dx === undefined ? 0 : _ref5$dx,
                _ref5$dy = _ref5.dy,
                dy = _ref5$dy === undefined ? 0 : _ref5$dy;

            _classCallCheck(this, Text);

            var _this2 = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, { x: x || right, y: y || top, dx: dx, dy: dy, is_collideable: is_collideable }));

            _this2.value = value;
            _this2.size = size;
            _this2.color = color;
            _this2.right = right;
            _this2.top = top;
            games.screen.add(_this2);
            return _this2;
        }

        _createClass(Text, [{
            key: 'render',
            value: function render(context) {
                context.font = this.size + 'px serif';
                context.fillStyle = this.color;
                var met = context.measureText(this.value);
                context.fillText(this.value, this.right - met.width, this.size + this.top);
            }
        }]);

        return Text;
    }(Renderable);

    var Message = function (_Text) {
        _inherits(Message, _Text);

        function Message(_ref6) {
            var value = _ref6.value,
                _ref6$size = _ref6.size,
                size = _ref6$size === undefined ? 20 : _ref6$size,
                _ref6$color = _ref6.color,
                color = _ref6$color === undefined ? "black" : _ref6$color,
                x = _ref6.x,
                y = _ref6.y,
                _ref6$lifetime = _ref6.lifetime,
                lifetime = _ref6$lifetime === undefined ? -1 : _ref6$lifetime,
                _ref6$after_death = _ref6.after_death,
                after_death = _ref6$after_death === undefined ? null : _ref6$after_death,
                _ref6$is_collideable = _ref6.is_collideable,
                is_collideable = _ref6$is_collideable === undefined ? false : _ref6$is_collideable;

            _classCallCheck(this, Message);

            var _this3 = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, { value: value, size: size, color: color, top: y, right: x, x: x, y: y, is_collideable: is_collideable }));

            _this3.after_death = after_death;
            _this3.lifetime = lifetime;
            return _this3;
        }

        _createClass(Message, [{
            key: 'render',
            value: function render(context) {
                if (--this.lifetime === 0) {
                    this.destroy();
                    this.after_death && this.after_death();
                    return;
                }
                _get(Message.prototype.__proto__ || Object.getPrototypeOf(Message.prototype), 'render', this).call(this, context);
            }
        }]);

        return Message;
    }(Text);

    var Sprite = function (_Renderable2) {
        _inherits(Sprite, _Renderable2);

        function Sprite(_ref7) {
            var image = _ref7.image,
                _ref7$x = _ref7.x,
                x = _ref7$x === undefined ? 0 : _ref7$x,
                _ref7$y = _ref7.y,
                y = _ref7$y === undefined ? 0 : _ref7$y,
                _ref7$dx = _ref7.dx,
                dx = _ref7$dx === undefined ? 0 : _ref7$dx,
                _ref7$dy = _ref7.dy,
                dy = _ref7$dy === undefined ? 0 : _ref7$dy,
                _ref7$is_collideable = _ref7.is_collideable,
                is_collideable = _ref7$is_collideable === undefined ? true : _ref7$is_collideable;

            _classCallCheck(this, Sprite);

            var _this4 = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, { x: x, y: y, dx: dx, dy: dy }));

            _this4.image = image;
            _this4.is_collideable = is_collideable;
            return _this4;
        }

        _createClass(Sprite, [{
            key: 'set_image',
            value: function set_image(image) {
                this.image = image;
            }
        }, {
            key: 'render',
            value: function render(context) {
                context.drawImage(this.image, this.x, this.y);
            }
        }, {
            key: 'top',
            get: function get() {
                return this.y;
            }
        }, {
            key: 'left',
            get: function get() {
                return this.x;
            },
            set: function set(left) {
                this.x = left;
            }
        }, {
            key: 'width',
            get: function get() {
                return this.image.width;
            }
        }, {
            key: 'height',
            get: function get() {
                return this.image.height;
            }
        }, {
            key: 'bottom',
            get: function get() {
                return this.y + this.height;
            }
        }, {
            key: 'right',
            get: function get() {
                return this.x + this.width;
            },
            set: function set(right) {
                this.x = right - this.width;
            }
        }, {
            key: 'overlapping_sprites',
            get: function get() {
                var _this5 = this;

                return games.screen.region(this).filter(function (obj) {
                    return obj != _this5;
                });
            }
        }]);

        return Sprite;
    }(Renderable);

    var Animation = function (_Sprite) {
        _inherits(Animation, _Sprite);

        function Animation(_ref8) {
            var x = _ref8.x,
                y = _ref8.y,
                images = _ref8.images,
                _ref8$repeat_interval = _ref8.repeat_interval,
                repeat_interval = _ref8$repeat_interval === undefined ? 4 : _ref8$repeat_interval,
                _ref8$n_repeats = _ref8.n_repeats,
                n_repeats = _ref8$n_repeats === undefined ? -1 : _ref8$n_repeats,
                _ref8$is_collideable = _ref8.is_collideable,
                is_collideable = _ref8$is_collideable === undefined ? true : _ref8$is_collideable,
                _ref8$dx = _ref8.dx,
                dx = _ref8$dx === undefined ? 0 : _ref8$dx,
                _ref8$dy = _ref8.dy,
                dy = _ref8$dy === undefined ? 0 : _ref8$dy;

            _classCallCheck(this, Animation);

            var _this6 = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this, { x: x, y: y, image: games.load_image(images[0]), is_collideable: is_collideable, dx: dx, dy: dy }));

            _this6.images = images;
            _this6.repeat_interval = repeat_interval;
            _this6.n_repeats = n_repeats;
            _this6.is_setup = false;
            _this6.frame_index = 0;
            return _this6;
        }

        _createClass(Animation, [{
            key: 'setup',
            value: function setup() {
                this.images = this.images.map(function (img) {
                    return games.load_image(img);
                });
                this.is_setup = true;
            }
        }, {
            key: 'nextFrame',
            value: function nextFrame() {
                var ix = ++this.frame_index;
                if (ix >= this.images.length) {
                    this.frame_index = ix = 0;
                    if (--this.n_repeats === 0) {
                        this.destroy();
                    }
                }
                return this.images[ix];
            }
        }, {
            key: 'render',
            value: function render(context) {
                if (!this.is_setup) {
                    this.setup();
                }
                context.drawImage(this.nextFrame(), this.x, this.y);
            }
        }, {
            key: 'frame',
            get: function get() {
                return this.images[this.frame_index];
            }
        }]);

        return Animation;
    }(Sprite);

    var Sound = function () {
        function Sound(_ref9) {
            var _this7 = this;

            var _ref9$loop = _ref9.loop,
                loop = _ref9$loop === undefined ? false : _ref9$loop,
                url = _ref9.url;

            _classCallCheck(this, Sound);

            var sound = this.sound = document.createElement("audio");
            sound.loop = loop;
            this.loaded = false;
            sound.addEventListener('load', function (e) {
                return _this7.loaded = true;
            });
            if (url) {
                this.load(url);
            }
            this.url = url;
        }

        _createClass(Sound, [{
            key: 'load',
            value: function load(url) {
                this.url = url;
                this.loaded = false;
                this.sound.src = BASE_SOUND_URL + url;
                this.sound.load();
            }
        }, {
            key: 'play',
            value: function play() {
                if (this.loaded) {
                    this.sound.play();
                } else {
                    this.sound.autoplay = true;
                }
            }
        }]);

        return Sound;
    }();

    var Keyboard = function () {
        function Keyboard() {
            _classCallCheck(this, Keyboard);

            var k = this.pressed_keys = {};
            window.addEventListener("keydown", function (e) {
                return k[e.key] = true;
            });
            window.addEventListener("keyup", function (e) {
                return k[e.key] = false;
            });
        }

        _createClass(Keyboard, [{
            key: 'is_pressed',
            value: function is_pressed(key) {
                return !!this.pressed_keys[key];
            }
        }]);

        return Keyboard;
    }();

    var games = {
        init: function init(_ref10) {
            var _ref10$screen_width = _ref10.screen_width,
                width = _ref10$screen_width === undefined ? 840 : _ref10$screen_width,
                _ref10$screen_height = _ref10.screen_height,
                height = _ref10$screen_height === undefined ? 480 : _ref10$screen_height,
                _ref10$fps = _ref10.fps,
                fps = _ref10$fps === undefined ? 50 : _ref10$fps;

            return this.screen = new Screen({ width: width, height: height });
        },
        load_image: function load_image(url) {
            var img = document.createElement("img");
            img.src = BASE_IMAGE_URL + url;
            return img;
        },
        load_sound: function load_sound(url) {
            return new Sound({ url: url, loop: false });
        },
        Text: Text,
        Message: Message,
        Sprite: Sprite,
        Animation: Animation,
        music: new Sound({ loop: true }),
        keyboard: new Keyboard(),
        K_LEFT: "ArrowLeft",
        K_RIGHT: "ArrowRight",
        K_UP: "ArrowUp",
        K_DOWN: "ArrowDown",
        K_SPACE: " ",
        K_0: "0",
        K_1: "1",
        K_2: "2",
        K_3: "3",
        K_4: "4",
        K_5: "5",
        K_6: "6",
        K_7: "7",
        K_8: "8",
        K_9: "9"
    };
    return games;
});