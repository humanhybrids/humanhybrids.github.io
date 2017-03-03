
define([], function () {
    return {
        randint: function (low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        },
        randrange: function (stop) {
            return Math.floor(Math.random() * stop);
        }
    };
});
