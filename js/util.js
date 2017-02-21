
define(function () {

    var STYLE = document.createElement("style");
    document.head.appendChild(STYLE);

    return {
        addCSSRule: function (rule) {
            var sheet = STYLE.stylesheet;
            return sheet.insertRule(rule, sheet.cssRules.length);
        },
        safeget: function (source, id) {
            var target = source;
            if (source && id.split('.').every(function (property) {
                var has = property in target;
                target = target[property];
                return has;
            })) {
                return target;
            }
            return null;
        },
        throttle: function (callback, thisArg) {
            var active = false;
            return function () {
                if (!active) {
                    active = true;
                    var args = arguments;
                    thisArg = thisArg || this;
                    window.requestAnimationFrame(function () {
                        callback.apply(thisArg, args);
                        active = false;
                    });
                }
            }
        }
    };

});
