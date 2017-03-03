"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function () {

    return function () {
        function ContextAPI(canvas) {
            _classCallCheck(this, ContextAPI);

            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this._fontSize = 12;
            this._fontFamily = "serif";
        }

        _createClass(ContextAPI, [{
            key: "drawRect",
            value: function drawRect(rect) {
                this.context.strokeRect(rect.topLeft.x, rect.topLeft.y, rect.width, rect.height);
            }
        }, {
            key: "drawPath",
            value: function drawPath(path) {
                /**
                 * @param path an array of Point
                 * Point := { x: Number, y: Number }
                 */
                var context = this.context;
                var pt = path[0];
                context.beginPath();
                context.moveTo(pt.x, pt.y);
                for (var i = 1; i < path.length; i++) {
                    pt = path[i];
                    context.lineTo(pt.x, pt.y);
                }
                context.closePath();
                context.stroke();
            }
        }, {
            key: "drawText",
            value: function drawText(text, position) {
                this.context.fillText(text, position.x, position.y);
            }
        }, {
            key: "clear",
            value: function clear() {
                var canvas = this.canvas;
                this.context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }, {
            key: "setProperty",
            value: function setProperty(name, value) {
                if (this.context[name] !== value) {
                    this.context[name] = value;
                }
            }
        }, {
            key: "fonSize",
            get: function get() {
                return this._fontSize;
            }
        }, {
            key: "fontSize",
            set: function set(value) {
                value = Math.round(value);
                this.setProperty("font", value + "px " + this.fontFamily);
                this._fontSize = value;
            }
        }, {
            key: "fontFamily",
            get: function get() {
                return this._fontFamily;
            },
            set: function set(value) {
                this.setProperty("font", this.fontSize + "px " + value);
                this._fontFamily = value;
            }
        }, {
            key: "textAlign",
            set: function set(value) {
                this.setProperty("textAlign", value);
            }
        }, {
            key: "textBaseline",
            set: function set(value) {
                this.setProperty("textBaseline", value);
            }
        }]);

        return ContextAPI;
    }();
});