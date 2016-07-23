
define([
    "./Vector"
], function (Vector) {

    function RenderablePathObject() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.angle = 0;
        this.omega = 0; // angular velocity
        this.path = [];
        this._translatedPath = null;
    }

    RenderablePathObject.prototype = {
        update: function (elapsed) {
            this.angle += this.omega;
            this.velocity = this.velocity.addVector(this.acceleration.multiplyScalar(elapsed));
            this.position = this.position.addVector(this.velocity.multiplyScalar(elapsed));
            this._translatedPath = null;
        },
        render: function (api, scale) {
            api.drawPath(this.getTranslatedPath(scale));
        },
        getTranslatedPath: function (scale) {
            var path = this._translatedPath;
            if (!path) {
                path = this._translatedPath = this.path.map(function (pt) {
                    return pt.rotate(this.angle).addVector(this.position).multiplyScalar(scale);
                }, this);
            }
            return path;
        }
    };

    return RenderablePathObject;

});
