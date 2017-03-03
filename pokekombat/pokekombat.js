define(function (require, exports, module) {
    var v1shim = require('v1shim');
    var games = v1shim.games;
    var color = v1shim.color;

    var math = require('math');
    var random = require('random');

    var Missile_Odds = 1;
    games.init({ screen_width: 840, screen_height: 480, fps: 50 });
    var Psyduck = (function () {
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
        class Psyduck extends games.Sprite {
            constructor({ game, x, y, speed = 2, odds_change = 200 }) {
                Psyduck.total += 1;
                super({ image: Psyduck.image, x: x, y: y, dx: speed });
                this.odds_change = odds_change;
                this.missile_wait = 0;
                this.image = image;
                this.sound = sound;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.Left = Left;
                this.Right = Right;
                this.total = total;
                this.stone = stone;
                this.odds = odds;
                this.missile_odds = missile_odds;
                this.health = health;
            }

            die() {
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

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            decrease_health() {
                Psyduck.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            update() {
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

        }
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
    })();

    var Cubone = (function () {
        var image = games.load_image("cubone.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var total = 0;
        var odds = 2;
        var missile_odds = 100;
        var sound = games.load_sound("charizard.wav");
        var health = new games.Text({ value: 100, size: 30, color: color.brown, top: 25, right: games.screen.width - 20, is_collideable: false });
        class Cubone extends games.Sprite {
            constructor({ size, x, y, speed = 2, odds_change = 200 }) {
                Cubone.total += 1;
                super({ image: Cubone.image, x: x, y: y, dx: speed });
                this.odds_change = odds_change;
                this.missile_wait = 0;
                this.image = image;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.Left = Left;
                this.Right = Right;
                this.total = total;
                this.odds = odds;
                this.missile_odds = missile_odds;
                this.sound = sound;
                this.health = health;
            }

            decrease_health() {
                Cubone.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die() {
                var size = 9;
                Cubone.total -= 1;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_charizard = new Charizard({ x: this.x, y: this.y, size: size });
                games.screen.add(new_charizard);
                Cubone.sound.play();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            update() {
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

        }
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
    })();

    var Charizard = (function () {
        var image = games.load_image("charizard.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var total = 0;
        var odds = 2;
        var missile_odds = 100;
        var sound = games.load_sound("snorlax.wav");
        var health = new games.Text({ value: 100, size: 30, color: color.red, top: 45, right: games.screen.width - 20, is_collideable: false });
        class Charizard extends games.Sprite {
            constructor({ size, x, y, speed = 3, odds_change = 100 }) {
                Charizard.total += 1;
                super({ image: Charizard.image, x: x, y: y, dx: speed });
                this.odds_change = odds_change;
                this.missile_wait = 0;
                this.image = image;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.Left = Left;
                this.Right = Right;
                this.total = total;
                this.odds = odds;
                this.missile_odds = missile_odds;
                this.sound = sound;
                this.health = health;
            }

            decrease_health() {
                Charizard.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die() {
                var size = 9;
                Charizard.total -= 1;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_snorlax = new Snorlax({ x: this.x, y: this.y, size: size });
                games.screen.add(new_snorlax);
                Charizard.sound.play();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            update() {
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

        }
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
    })();

    var Snorlax = (function () {
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
        class Snorlax extends games.Sprite {
            constructor({ size, x, y, speed = 3, odds_change = 100 }) {
                Snorlax.total += 1;
                super({ image: Snorlax.image, x: x, y: y, dx: speed });
                this.odds_change = odds_change;
                this.missile_wait = 0;
                this.image = image;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.Left = Left;
                this.Right = Right;
                this.total = total;
                this.odds = odds;
                this.boundary1 = boundary1;
                this.boundary2 = boundary2;
                this.missile_odds = missile_odds;
                this.jump_odds = jump_odds;
                this.sound = sound;
                this.sound2 = sound2;
                this.health = health;
            }

            decrease_health() {
                Snorlax.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die() {
                var size = 9;
                Snorlax.total -= 1;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_mewtwo = new Mewtwo({ x: this.x, y: 400, size: size });
                games.screen.add(new_mewtwo);
                Snorlax.sound.play();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            update() {
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
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            this.x += 50;
                            sprite.x -= 50;
                        } else {
                            sprite.x += 50;
                            this.x -= 50;

                        }

                    }

                }

                if (this.health.value <= 0) {
                    this.die();
                }

            }

        }
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
    })();

    var Mewtwo = (function () {
        var image = games.load_image("mewtwo.png");
        var MISSILE_DELAY = 25;
        var Left = false;
        var Right = false;
        var odds = 2;
        var missile_odds = 50;
        var health = new games.Text({ value: 150, size: 30, color: color.purple, top: 85, right: games.screen.width - 20, is_collideable: false });
        class Mewtwo extends games.Sprite {
            constructor({ size, x, y, speed = 3, odds_change = 100 }) {
                super({ image: Mewtwo.image, x: x, y: y, dx: speed });
                this.odds_change = odds_change;
                this.missile_wait = 0;
                this.image = image;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.Left = Left;
                this.Right = Right;
                this.odds = odds;
                this.missile_odds = missile_odds;
                this.health = health;
            }

            win() {
                var end_message = new games.Message({ value: "You Win!", size: 90, color: color.blue, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                games.screen.add(end_message);
            }

            decrease_health() {
                Mewtwo.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                this.win();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            update() {
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

        }
        Mewtwo.image = image;
        Mewtwo.MISSILE_DELAY = MISSILE_DELAY;
        Mewtwo.Left = Left;
        Mewtwo.Right = Right;
        Mewtwo.odds = odds;
        Mewtwo.missile_odds = missile_odds;
        Mewtwo.health = health;
        return Mewtwo;
    })();

    var Eevee = (function () {
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
        class Eevee extends games.Sprite {
            constructor({ x, y }) {
                super({ image: Eevee.image, x: x, y: y });
                this.missile_wait = 0;
                this.jump_wait = 0;
                this.image = image;
                this.sound = sound;
                this.soundend = soundend;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.JUMP_DELAY = JUMP_DELAY;
                this.Left = Left;
                this.Right = Right;
                this.total = total;
                this.health = health;
                this.stone = stone;
            }

            end() {
                var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                Eevee.soundend.play();
                games.screen.add(end_message);
            }

            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                this.end();
            }

            die2() {
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

            die3() {
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

            die4() {
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

            die5() {
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

            decrease_health() {
                Eevee.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            water_evolve() {
                Eevee.stone.value = "Vaporean";
            }

            update() {
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

        }
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
    })();

    var Vaporeon = (function () {
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
        class Vaporeon extends games.Sprite {
            constructor({ x, y }) {
                super({ image: Vaporeon.image, x: x, y: y });
                this.missile_wait = 0;
                this.jump_wait = 0;
                this.image = image;
                this.sound = sound;
                this.soundend = soundend;
                this.Left = Left;
                this.Right = Right;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.JUMP_DELAY = JUMP_DELAY;
                this.total = total;
                this.health = health;
                this.stone = stone;
            }

            end() {
                var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                Vaporeon.soundend.play();
                games.screen.add(end_message);
            }

            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                this.end();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                Eevee.total = 2;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_jolteon = new Jolteon({ x: this.x, y: this.y });
                games.screen.add(new_jolteon);
            }

            die4() {
                Eevee.total = 3;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_flareon = new Flareon({ x: this.x, y: this.y });
                games.screen.add(new_flareon);
            }

            decrease_health() {
                Vaporeon.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            water_evolve() {
                Vaporeon.stone.value = "Vaporean";
            }

            update() {
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

        }
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
    })();

    var Jolteon = (function () {
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
        class Jolteon extends games.Sprite {
            constructor({ x, y }) {
                super({ image: Jolteon.image, x: x, y: y });
                this.missile_wait = 0;
                this.jump_wait = 0;
                this.image = image;
                this.sound = sound;
                this.soundend = soundend;
                this.Left = Left;
                this.Right = Right;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.JUMP_DELAY = JUMP_DELAY;
                this.total = total;
                this.health = health;
                this.stone = stone;
            }

            end() {
                var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                Vaporeon.soundend.play();
                games.screen.add(end_message);
            }

            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                this.end();
            }

            die2() {
                Eevee.total = 1;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_vaporeon = new Vaporeon({ x: this.x, y: this.y });
                games.screen.add(new_vaporeon);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                Eevee.total = 3;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_flareon = new Flareon({ x: this.x, y: this.y });
                games.screen.add(new_flareon);
            }

            decrease_health() {
                Jolteon.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            water_evolve() {
                Jolteon.stone.value = "Jolteon";
            }

            update() {
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

        }
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
    })();

    var Flareon = (function () {
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
        class Flareon extends games.Sprite {
            constructor({ x, y }) {
                super({ image: Flareon.image, x: x, y: y });
                this.missile_wait = 0;
                this.jump_wait = 0;
                this.image = image;
                this.sound = sound;
                this.soundend = soundend;
                this.Left = Left;
                this.Right = Right;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.JUMP_DELAY = JUMP_DELAY;
                this.total = total;
                this.health = health;
                this.stone = stone;
            }

            end() {
                var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                Flareon.soundend.play();
                games.screen.add(end_message);
            }

            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                this.end();
            }

            die2() {
                Eevee.total = 1;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_vaporeon = new Vaporeon({ x: this.x, y: this.y });
                games.screen.add(new_vaporeon);
            }

            die3() {
                Eevee.total = 2;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_jolteon = new Jolteon({ x: this.x, y: this.y });
                games.screen.add(new_jolteon);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            decrease_health() {
                Flareon.health.value -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            water_evolve() {
                Flareon.stone.value = "Flareon";
            }

            update() {
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

        }
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
    })();

    var Mew = (function () {
        var image = games.load_image("mew.png");
        var soundend = games.load_sound("gameover.wav");
        var Left = false;
        var Right = false;
        var MISSILE_DELAY = 25;
        var JUMP_DELAY = 50;
        var total = 0;
        var health = 9999;
        class Mew extends games.Sprite {
            constructor({ x, y }) {
                super({ image: Mew.image, x: x, y: y });
                this.missile_wait = 0;
                this.jump_wait = 0;
                this.image = image;
                this.soundend = soundend;
                this.Left = Left;
                this.Right = Right;
                this.MISSILE_DELAY = MISSILE_DELAY;
                this.JUMP_DELAY = JUMP_DELAY;
                this.total = total;
                this.health = health;
            }

            end() {
                var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                Flareon.soundend.play();
                games.screen.add(end_message);
            }

            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                this.end();
            }

            die2() {
                Eevee.total = 1;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_vaporeon = new Vaporeon({ x: this.x, y: 400 });
                games.screen.add(new_vaporeon);
            }

            die3() {
                Eevee.total = 2;
                var size = 9;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
                var new_jolteon = new Jolteon({ x: this.x, y: 400 });
                games.screen.add(new_jolteon);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: 400 });
                games.screen.add(new_explosion);
                this.destroy();
                var new_flareon = new Flareon({ x: this.x, y: 400 });
                games.screen.add(new_flareon);
            }

            decrease_health() {
                Mew.health -= 10;
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            update() {
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

        }
        Mew.image = image;
        Mew.soundend = soundend;
        Mew.Left = Left;
        Mew.Right = Right;
        Mew.MISSILE_DELAY = MISSILE_DELAY;
        Mew.JUMP_DELAY = JUMP_DELAY;
        Mew.total = total;
        Mew.health = health;
        return Mew;
    })();

    var Water_Stone = (function () {
        var image = games.load_image("waterstone.bmp");
        var total = 0;
        var health = 10;
        class Water_Stone extends games.Sprite {
            constructor({ game, x, y, speed = 1 }) {
                super({ image: Water_Stone.image, x: x, y: y, dy: speed });
                var x = 200;
                var y = 300;
                this.image = image;
                this.total = total;
                this.health = health;
            }

            die() {
                var size = 9;
                Water_Stone.total += 1;
                for (let sprite of this.overlapping_sprites) {
                    sprite.die2();
                }

                this.destroy();
            }

            decrease_health() {
                this.health -= 10;
            }

            update() {
                if (this.top < 150) {
                    var dy = 0;
                    var y = 150;
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.die2();
                    }

                    this.destroy();
                }

            }

        }
        Water_Stone.image = image;
        Water_Stone.total = total;
        Water_Stone.health = health;
        return Water_Stone;
    })();

    var Thunder_Stone = (function () {
        var image = games.load_image("thunderstone.bmp");
        var total = 0;
        var health = 10;
        class Thunder_Stone extends games.Sprite {
            constructor({ game, x, y, speed = 1 }) {
                super({ image: Thunder_Stone.image, x: x, y: y, dy: speed });
                var x = 200;
                var y = 300;
                this.image = image;
                this.total = total;
                this.health = health;
            }

            die() {
                var size = 9;
                Thunder_Stone.total += 2;
                for (let sprite of this.overlapping_sprites) {
                    sprite.die3();
                }

                this.destroy();
            }

            decrease_health() {
                this.health -= 10;
            }

            update() {
                if (this.top < 150) {
                    var dy = 0;
                    var y = 150;
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.die3();
                    }

                    this.destroy();
                }

            }

        }
        Thunder_Stone.image = image;
        Thunder_Stone.total = total;
        Thunder_Stone.health = health;
        return Thunder_Stone;
    })();

    var Fire_Stone = (function () {
        var image = games.load_image("firestone.bmp");
        var total = 0;
        var health = 10;
        class Fire_Stone extends games.Sprite {
            constructor({ game, x, y, speed = 1 }) {
                super({ image: Fire_Stone.image, x: x, y: y, dy: speed });
                var x = 200;
                var y = 300;
                this.image = image;
                this.total = total;
                this.health = health;
            }

            die() {
                var size = 9;
                Fire_Stone.total += 3;
                for (let sprite of this.overlapping_sprites) {
                    sprite.die4();
                }

                this.destroy();
            }

            decrease_health() {
                this.health -= 10;
            }

            update() {
                if (this.top < 150) {
                    var dy = 0;
                    var y = 150;
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.die4();
                    }

                    this.destroy();
                }

            }

        }
        Fire_Stone.image = image;
        Fire_Stone.total = total;
        Fire_Stone.health = health;
        return Fire_Stone;
    })();

    var Missile = (function () {
        var image = games.load_image("missile.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var BUFFER = 0;
        var health = 10;
        class Missile extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Eevee_x, Eevee_y }) {
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

                super({ image: Missile.image, x: x, y: y, dx: dx, dy: dy });
                this.lifetime = Missile.LIFETIME;
                if (Eevee.Right == true) {
                    var image2 = games.load_image("missile.bmp");
                    this.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("missile2.bmp");
                    this.set_image(image2);
                    x = Eevee_x - 100;
                    var dx = -5;
                    var dy = 0;

                }

                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.BUFFER = BUFFER;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
            }

            update() {
                super.update();
                this.lifetime -= 1;
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Missile.image = image;
        Missile.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Missile.LIFETIME = LIFETIME;
        Missile.BUFFER = BUFFER;
        Missile.health = health;
        return Missile;
    })();

    var Bubble = (function () {
        var image = games.load_image("bubbles.png");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;
        class Bubble extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Psyduck_x, Psyduck_y }) {
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

                super({ image: Bubble.image, x: x, y: y, dx: dx, dy: dy });
                if (Psyduck.Right == true) {
                    var image2 = games.load_image("bubbles.png");
                    this.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("bubbles2.png");
                    this.set_image(image2);
                    x = Psyduck_x - 100;
                    var dx = -5;
                    var dy = 0;

                }

                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Bubble.LIFETIME;
            }

            update() {
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Bubble.image = image;
        Bubble.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Bubble.LIFETIME = LIFETIME;
        Bubble.health = health;
        return Bubble;
    })();

    var Bone = (function () {
        var images = ["bone.bmp", "bone.bmp", "bone.bmp", "bone.bmp", "bone.bmp", "bone.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp", "bone2.bmp"];
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var BUFFER = 0;
        var health = 10;
        class Bone extends games.Animation {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Cubone_x, Cubone_y }) {
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

                super({ images: Bone.images, x: x, y: y, dx: dx, dy: dy });
                this.lifetime = Bone.LIFETIME;
                this.images = images;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.BUFFER = BUFFER;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
            }

            update() {
                super.update();
                this.lifetime -= 1;
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Bone.images = images;
        Bone.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Bone.LIFETIME = LIFETIME;
        Bone.BUFFER = BUFFER;
        Bone.health = health;
        return Bone;
    })();

    var Fireball = (function () {
        var image = games.load_image("fireball.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;
        class Fireball extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Charizard_x, Charizard_y }) {
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

                super({ image: Fireball.image, x: x, y: y, dx: dx, dy: dy });
                if (Charizard.Right == true) {
                    var image2 = games.load_image("fireball2.bmp");
                    this.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("fireball.bmp");
                    this.set_image(image2);
                    x = Charizard_x - 100;
                    var dx = -5;
                    var dy = 0;

                }

                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Fireball.LIFETIME;
            }

            update() {
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Fireball.image = image;
        Fireball.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Fireball.LIFETIME = LIFETIME;
        Fireball.health = health;
        return Fireball;
    })();

    var Shadowball = (function () {
        var image = games.load_image("shadowball.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;
        class Shadowball extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Mewtwo_x, Mewtwo_y }) {
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

                super({ image: Shadowball.image, x: x, y: y, dx: dx, dy: dy });
                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Shadowball.LIFETIME;
            }

            update() {
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Shadowball.image = image;
        Shadowball.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Shadowball.LIFETIME = LIFETIME;
        Shadowball.health = health;
        return Shadowball;
    })();

    var Icebeam = (function () {
        var image = games.load_image("icebeam.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;
        class Icebeam extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Vaporeon_x, Vaporeon_y }) {
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

                super({ image: Icebeam.image, x: x, y: y, dx: dx, dy: dy });
                if (Vaporeon.Right == true) {
                    var image2 = games.load_image("icebeam.bmp");
                    this.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("icebeam.png");
                    this.set_image(image2);
                    x = Vaporeon_x - 100;
                    var dx = -5;
                    var dy = 0;

                }

                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Icebeam.LIFETIME;
            }

            update() {
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Icebeam.image = image;
        Icebeam.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Icebeam.LIFETIME = LIFETIME;
        Icebeam.health = health;
        return Icebeam;
    })();

    var Psychic = (function () {
        var image = games.load_image("psychic.png");
        var VELOCITY_FACTOR = 15;
        var LIFETIME = 40;
        var health = 10;
        class Psychic extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Mew_x, Mew_y }) {
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

                super({ image: Psychic.image, x: x, y: y, dx: dx, dy: dy });
                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Icebeam.LIFETIME;
            }

            update() {
                super.update();
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
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

                }

            }

        }
        Psychic.image = image;
        Psychic.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Psychic.LIFETIME = LIFETIME;
        Psychic.health = health;
        return Psychic;
    })();

    var Lightning = (function () {
        var image = games.load_image("lightning.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;
        class Lightning extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Jolteon_x, Jolteon_y }) {
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

                super({ image: Lightning.image, x: x, y: y, dx: dx, dy: dy });
                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Lightning.LIFETIME;
            }

            update() {
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Lightning.image = image;
        Lightning.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Lightning.LIFETIME = LIFETIME;
        Lightning.health = health;
        return Lightning;
    })();

    var Fireball2 = (function () {
        var image = games.load_image("fireball2.bmp");
        var VELOCITY_FACTOR = 5;
        var LIFETIME = 40;
        var health = 10;
        class Fireball2 extends games.Sprite {
            die() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
                this.destroy();
            }

            die2() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die3() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            die4() {
                var new_explosion = new Explosion({ x: this.x, y: this.y });
                games.screen.add(new_explosion);
            }

            constructor({ Flareon_x, Flareon_y }) {
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

                super({ image: Fireball2.image, x: x, y: y, dx: dx, dy: dy });
                if (Flareon.Right == true) {
                    var image2 = games.load_image("fireball2.bmp");
                    this.set_image(image2);
                    var dx = 5;
                    var dy = 0;
                } else {
                    var image2 = games.load_image("fireball.bmp");
                    this.set_image(image2);
                    x = Flareon_x - 100;
                    var dx = -5;
                    var dy = 0;

                }

                this.image = image;
                this.VELOCITY_FACTOR = VELOCITY_FACTOR;
                this.LIFETIME = LIFETIME;
                this.health = health;
            }

            decrease_health() {
                this.health -= 10;
                this.lifetime = Fireball2.LIFETIME;
            }

            update() {
                if (this.health == 0) {
                    this.die();
                }

                if (this.overlapping_sprites) {
                    for (let sprite of this.overlapping_sprites) {
                        sprite.decrease_health();
                        if (sprite.x < this.x) {
                            sprite.x -= 25;
                        } else {
                            sprite.x += 25;

                        }

                        this.destroy();
                    }

                }

            }

        }
        Fireball2.image = image;
        Fireball2.VELOCITY_FACTOR = VELOCITY_FACTOR;
        Fireball2.LIFETIME = LIFETIME;
        Fireball2.health = health;
        return Fireball2;
    })();

    var Explosion = (function () {
        var sound = games.load_sound("boom.wav");
        var images = ["explosion1.bmp", "explosion2.bmp", "explosion3.bmp", "explosion4.bmp", "explosion5.bmp", "explosion6.bmp", "explosion7.bmp", "explosion8.bmp", "explosion9.bmp"];
        class Explosion extends games.Animation {
            constructor({ x, y }) {
                super({ images: Explosion.images, x: x, y: y, repeat_interval: 4, n_repeats: 1, is_collideable: false });
                Explosion.sound.play();
                this.sound = sound;
                this.images = images;
            }

        }
        Explosion.sound = sound;
        Explosion.images = images;
        return Explosion;
    })();

    var Game = (function () {
        class Game {
            constructor() {
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

            play() {
                games.music.load("clocks.mid");
                games.music.play(-100);
                var armory_image = games.load_image("armory.jpg");
                games.screen.background = armory_image;
                games.screen.mainloop();
            }

            end() {
                var end_message = new games.Message({ value: "Game Over", size: 90, color: color.red, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                games.screen.add(end_message);
            }

            win() {
                var end_message = new games.Message({ value: "You Win!", size: 90, color: color.blue, x: games.screen.width / 2, y: games.screen.height / 2, lifetime: 5 * games.screen.fps, after_death: games.screen.quit, is_collideable: false });
                games.screen.add(end_message);
            }

        }
        return Game;
    })();

    function main() {
        var pokekombat = new Game();
        pokekombat.play();
    }

    main();
});
