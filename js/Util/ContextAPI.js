
define(function () {

    return class ContextAPI {

        constructor(canvas) {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this._fontSize = 12;
            this._fontFamily = "serif";
        }

        drawRect(rect) {
            this.context.strokeRect(rect.topLeft.x, rect.topLeft.y, rect.width, rect.height);
        }

        drawPath(path) {
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

        drawText(text, position) {
            this.context.fillText(text, position.x, position.y);
        }

        clear() {
            var canvas = this.canvas;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
        }

        setProperty(name, value) {
            if (this.context[name] !== value) {
                this.context[name] = value;
            }
        }

        get fonSize() {
            return this._fontSize;
        }
        set fontSize(value) {
            value = Math.round(value);
            this.setProperty("font", value + "px " + this.fontFamily);
            this._fontSize = value;
        }

        get fontFamily() {
            return this._fontFamily;
        }
        set fontFamily(value) {
            this.setProperty("font", this.fontSize + "px " + value);
            this._fontFamily = value;
        }

        set textAlign(value) {
            this.setProperty("textAlign", value);
        }

        textBaseline(value) {
            this.setProperty("textBaseline", value);
        }

    }

});
