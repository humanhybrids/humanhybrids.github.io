
define([
    "../Math/Vector",
    "../Math/Rect"
], function (Vector, Rect) {

    return class RenderableTextObject {

        constructor() {
            this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.acceleration = new Vector(0, 0);
            this.scale = 1;
            
            this.text = "";
            this.fontSize = 12;
            this.textAlign = "center";
            this.textBaseline = "middle";
        }

        update(elapsed, scale) {
            this.scale = scale;
            this.velocity = this.velocity.addVector(this.acceleration.multiplyScalar(elapsed));
            this.position = this.position.addVector(this.velocity.multiplyScalar(elapsed));
        }

        render(api) {
            var scale = this.scale;
            Object.assign(api, {
                fontSize: this.fontSize * scale,
                textAlign: this.textAlign,
                textBaseline: this.textBaseline
            });
            api.drawText(this.text, this.position.multiplyScalar(scale));
        }

        getBoundingRect() {
            return new Rect();
        }

    };

});
