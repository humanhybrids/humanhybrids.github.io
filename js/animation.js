(function(global, factory) {

    if (global.define) {
        global.define(factory);
    } else {
        global['Animation'] = factory();
    }

})(this, function() {

    var KeyframesRuleConstructor = window.CSSKeyframesRule || window.MozCSSKeyframesRule;
    var valuePattern = /[\d.]+/g;

    function format(pattern, values) {
        return pattern.replace(/\{(\d+)\}/g, function(r0, r1) {
            return values[r1];
        });
    }

    function unformat(str, pattern) {
        var values = [];
        var index = 0;
        var result = str.replace(pattern, function(r0, r1) {
            values.push(r1);
            return '{' + index++ + '}';
        });
        return [result, values];
    }

    function foreach(arr, callback) {
        var result = [];
        if ('length' in arr) {
            for (var i = 0; i < arr.length; i++) {
                result.push(callback(arr[i], i, arr));
            }
        } else {
            for (var key in arr) {
                result.push(callback(arr[key], key, arr));
            }
        }
        return result;
    }

    function toObject(arr, keySelector, valueSelector) {
        var result = {};
        foreach(arr, function(item, key) {
            var k = keySelector(item, key, arr);
            result[k] = valueSelector(item, key, arr);
        });
        return result;
    }

    var keyframes = {};

    function refreshKeyframes() {
        foreach(document.styleSheets, function(item) {
            foreach(item.cssRules, function(rule) {
                if (rule.constructor === KeyframesRuleConstructor) {
                    keyframes[rule.name] = rule;
                }
            });
        });
    }

    function Animation(target, css) {
        var _this = this;
        this.target = target;
        this.animationName = css['animation-name'];
        this.animationDirection = css['animation-direction'] || 'normal';
        this.animationTimingFunction = css['animation-timing-function'] || 'ease';
        if (target.constructor === String) {
            this.target = document.querySelector(target);
        }
        if (!(this.animationName in keyframes)) {
            refreshKeyframes();
        }
        var keyframesRule = keyframes[this.animationName];
        var kf = toObject(keyframesRule.cssRules,
            function(item) { return parseFloat(item.keyText, 10); },
            function(item) { return item.style; });
        this.keys = foreach(keyframesRule.cssRules, function(item) { return parseFloat(item.keyText, 10); });
        this.properties = toObject(kf[0],
            function(item) { return item; },
            function(name, key, arr) {
                var uf = unformat(arr[name], valuePattern);
                return {
                    format: uf[0],
                    values: foreach(kf, function(item) {
                        return !!item[name] ? foreach(item[name].match(valuePattern), function(v) {
                            var value = parseFloat(v, 10);
                            return isNaN(value) ? null : value;
                        }) : null;
                    })
                };
            });
    }

    (function() {

        this._currentFrame = null;
        this._animationTimingFunction = null;
        this.autoUpdate = true;

        function cubicBezier(x1, y1, x2, y2) {
            function Bx(t) { return 3 * Math.pow(1 - t, 2) * t * x1 + 3 * (1 - t) * Math.pow(t, 2) * x2 + Math.pow(t, 3); }
            function By(t) { return 3 * Math.pow(1 - t, 2) * t * y1 + 3 * (1 - t) * Math.pow(t, 2) * y2 + Math.pow(t, 3); }
            function Bdx(t) { return 3 * Math.pow(1 - t, 2) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * Math.pow(t, 2) * (1 - x2); }
            var eps = 1.0 / 80000.0;
            return function(x) {
                var rx2, d2, t0, t1, t2, i;
                for (t2 = x, i = 0; i < 8; i++) {
                    rx2 = Bx(t2) - x;
                    if (Math.abs(rx2) < eps) {
                        return By(t2);
                    }
                    d2 = Bdx(t2);
                    if (Math.abs(d2) < 1e-6) {
                        break;
                    }
                    t2 = t2 - rx2 / d2;
                }
                t0 = 0.0;
                t1 = 1.0;
                t2 = x;
                while (t0 < t1) {
                    rx2 = Bx(t2);
                    if (Math.abs(rx2 - x) < eps) {
                        return By(t2);
                    }
                    if (x > rx2) {
                        t0 = t2;
                    } else {
                        t1 = t2;
                    }
                    t2 = (t1 - t0) * 0.5 + t0;
                }
                return By(t2);
            };
        }

        var timingFunctions = {
            'linear': function(t) { return t; },
            'ease': cubicBezier(0.25, 0.1, 0.25, 1),
            'ease-in': function(t) { return Math.pow(t, 1.685); },
            'ease-in-out': cubicBezier(0.42, 0.0, 0.58, 1.0),
            'ease-out': function(t) { return 1 - Math.pow(1 - t, 1.685); }
        };

        this.update = function _update() {
            var frame = this._currentFrame;
            if (this.animationDirection === 'reverse') {
                frame = 100 - frame;
            }
            var keys = this.keys;
            var left, right;
            for (left = 0, right = keys.length - 1; left < right && keys[left] <= frame; ++left);
            right = --left + 1;
            for (var name in this.properties) {
                var property = this.properties[name];
                var l, r, begin, end;
                for (l = left, begin = property.values[l]; begin === null; begin = property.values[--l]);
                for (r = right, end = property.values[r]; end === null; end = property.values[++r]);
                var t = this._timingFunction((frame - keys[l]) / (keys[r] - keys[l]));
                var values = foreach(begin, function(lval, i) { return lval + t * (end[i] - lval); });
                this.target.style[name] = format(property.format, values);
            }
        };

        Object.defineProperties(this, {
            currentFrame: {
                get: function() {
                    return this._currentFrame;
                },
                set: function(frame) {
                    frame = parseFloat(frame, 10);
                    if (this._currentFrame !== frame) {
                        this._currentFrame = frame;
                        if (this.autoUpdate) {
                            this.update();
                        }
                    }
                }
            },
            animationTimingFunction: {
                get: function() {
                    return this._animationTimingFunction;
                },
                set: function(value) {
                    this._animationTimingFunction = value || 'ease';
                    if (value.indexOf('cubic-bezier') !== -1) {
                        console.log(unformat(value, valuePattern));
                        var values = value.replace(/cubic-bezier\(([\d\., ]+)\)/, '$1').split(',');
                        this._timingFunction = cubicBezier.apply(null, foreach(values, function(item) { return parseFloat(item.trim(), 10); }));
                    } else {
                        this._timingFunction = timingFunctions[value];
                    }
                }
            }
        });

    }).call(Animation.prototype);

    return Animation;

});
