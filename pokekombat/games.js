"use strict";

define([], function () {

    var BASE_IMAGE_URL = './images/';
    var BASE_SOUND_URL = './sounds/';

    var images = {};

    class Rect {
        static union(r1, r2) {
            var x = Math.min(r1.x, r2.x);
            var y = Math.min(r1.y, r2.y);
            var width = Math.max(r1.x + r1.width, r2.x + r2.width) - x;
            var height = Math.max(r1.y + r1.height, r2.y + r2.height) - y;
            return new Rect({ x, y, width, height });
        }
        constructor({ x, y, width, height }) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    class Screen {
        constructor({ width, height, fps = 60, background }) {
            var canvas = this.canvas = document.createElement("canvas");
            Object.assign(canvas, { width, height });
            document.body.appendChild(canvas);
            this.objects = [];
            this.paused = false;
            this.fps = fps;
            this.background = background;
            this.context = canvas.getContext("2d");
        }
        get width() {
            return this.canvas.width;
        }
        get height() {
            return this.canvas.height;
        }
        add(object) {
            this.objects.push(object);
        }
        remove(object) {
            this.objects.splice(this.objects.indexOf(object), 1);
        }
        region({ x = 0, y = 0, width, height }) {
            return this.objects.filter(obj => {
                if (!(obj instanceof Sprite) || !obj.is_collideable)
                    return false;
                let u = Rect.union({ x, y, width, height }, obj);
                return u.width < width + obj.width
                    && u.height < height + obj.height;
            });
        }
        quit() {
            window.location.reload(true);
        }
        mainloop(t) {
            if (this.background) {
                this.context.drawImage(this.background, 0, 0, this.width, this.height);
            }
            for (var obj of this.objects) {
                if (obj.destroyed) {
                    this.remove(obj);
                    continue;
                }
                obj.tick();
                obj.update();
                obj.render(this.context);
            }
            if (!this.paused)
                window.requestAnimationFrame((t) => this.mainloop(t));
        }
    }

    class Renderable {
        constructor({ x = 0, y = 0, dx = 0, dy = 0 }) {
            this.destroyed = false;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
        }
        destroy() {
            this.destroyed = true;
        }
        tick() {
            this.x += this.dx;
            this.y += this.dy;
        }
        update() { }
        render(context) { }
    }

    class Text extends Renderable {
        constructor({ value, top, right, x = 0, y = 0, size = 12, color = "black", is_collideable = false, dx = 0, dy = 0 }) {
            super({ x: x || right, y: y || top, dx, dy, is_collideable });
            this.value = value;
            this.size = size;
            this.color = color;
            this.right = right;
            this.top = top;
            games.screen.add(this);
        }
        render(context) {
            context.font = `${this.size}px serif`;
            context.fillStyle = this.color;
            var met = context.measureText(this.value);
            context.fillText(this.value, this.right - met.width, this.size + this.top);
        }
    }

    class Message extends Text {
        constructor({ value, size = 20, color = "black", x, y, lifetime = -1, after_death = null, is_collideable = false }) {
            super({ value, size, color, top: y, right: x, x, y, is_collideable });
            this.after_death = after_death;
            this.lifetime = lifetime;
        }
        render(context) {
            if (--this.lifetime === 0) {
                this.destroy();
                this.after_death && this.after_death();
                return;
            }
            super.render(context);
        }
    }

    class Sprite extends Renderable {
        constructor({ image, x = 0, y = 0, dx = 0, dy = 0, is_collideable = true }) {
            super({ x, y, dx, dy });
            this.image = image;
            this.is_collideable = is_collideable;
        }
        get top() {
            return this.y;
        }
        get left() {
            return this.x;
        }
        set left(left) {
            this.x = left;
        }
        get width() {
            return this.image.width;
        }
        get height() {
            return this.image.height;
        }
        get bottom() {
            return this.y + this.height;
        }
        get right() {
            return this.x + this.width;
        }
        set right(right) {
            this.x = right - this.width;
        }
        get overlapping_sprites() {
            return games.screen.region(this).filter(obj => obj != this);
        }
        set_image(image) {
            this.image = image;
        }
        render(context) {
            context.drawImage(this.image, this.x, this.y);
        }
    }

    class Animation extends Sprite {
        constructor({ x, y, images, repeat_interval = 4, n_repeats = -1, is_collideable = true, dx = 0, dy = 0 }) {
            super({ x, y, image: games.load_image(images[0]), is_collideable, dx, dy });
            this.images = images;
            this.repeat_interval = repeat_interval;
            this.n_repeats = n_repeats;
            this.is_setup = false;
            this.frame_index = 0;
        }
        setup() {
            this.images = this.images.map(img => games.load_image(img));
            this.is_setup = true;
        }
        nextFrame() {
            var ix = ++this.frame_index;
            if (ix >= this.images.length) {
                this.frame_index = ix = 0;
                if (--this.n_repeats === 0) {
                    this.destroy();
                }
            }
            return this.images[ix];
        }
        get frame() {
            return this.images[this.frame_index];
        }
        render(context) {
            if (!this.is_setup) {
                this.setup();
            }
            context.drawImage(this.nextFrame(), this.x, this.y);
        }
    }

    class Sound {
        constructor({ loop = false, url }) {
            var sound = this.sound = document.createElement("audio");
            sound.loop = loop;
            this.loaded = false;
            sound.addEventListener('load', e => this.loaded = true);
            if (url) {
                this.load(url);
            }
            this.url = url;
        }
        load(url) {
            this.url = url;
            this.loaded = false;
            this.sound.src = BASE_SOUND_URL + url;
            this.sound.load();
        }
        play() {
            if (this.loaded) {
                this.sound.play();
            } else {
                this.sound.autoplay = true;
            }
        }
    }

    class Keyboard {
        constructor() {
            var k = this.pressed_keys = {};
            window.addEventListener("keydown", e => k[e.key] = true);
            window.addEventListener("keyup", e => k[e.key] = false);
        }
        is_pressed(key) {
            return !!this.pressed_keys[key];
        }
    }

    var games = {
        init: function ({ screen_width: width = 840, screen_height: height = 480, fps = 50 }) {
            return this.screen = new Screen({ width, height });
        },
        load_image: function (url) {
            var img = document.createElement("img");
            img.src = BASE_IMAGE_URL + url;
            return img;
        },
        load_sound: function (url) {
            return new Sound({ url, loop: false });
        },
        Text,
        Message,
        Sprite,
        Animation,
        music: new Sound({ loop: true }),
        keyboard: new Keyboard(),
        K_LEFT: "ArrowLeft",
        K_RIGHT: "ArrowRight",
        K_UP: "ArrowUp",
        K_DOWN: "ArrowDown",
        K_SPACE: " "
    }
    return games;

});
