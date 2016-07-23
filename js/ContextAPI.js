
define(function () {

    function ContextAPI(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
    
    ContextAPI.prototype = Object.create({
        drawPath: function (path) {
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
        },
        clear: function () {
            var canvas = this.canvas;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    return ContextAPI;

});
