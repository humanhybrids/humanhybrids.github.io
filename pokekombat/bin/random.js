"use strict";

define([], function () {
    return {
        randint: function randint(low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        },
        randrange: function randrange(stop) {
            return Math.floor(Math.random() * stop);
        }
    };
});