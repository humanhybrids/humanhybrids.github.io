
define(["./Point"], function (Point) {

    return class Rect {

        constructor(topLeft, bottomRight) {
            this.topLeft = topLeft || new Point(0, 0);
            this.bottomRight = bottomRight || this.topLeft.clone();
        }

        get width() {
            return this.bottomRight.x - this.topLeft.x;
        }
        set width(value) {
            this.bottomRight.x = this.topLeft.x + value;
        }

        get height() {
            return this.bottomRight.y - this.topLeft.y;
        }
        set height(value) {
            this.bottomRight.y = this.topLeft.y + value;
        }

        get topRight() {
            return new Point(this.bottomRight.x, this.topLeft.y);
        }

        get bottomLeft() {
            return new Point(this.topLeft.x, this.bottomRight.y);
        }

        unionRect(rect) {
            return new Rect(
                new Point(Math.min(this.topLeft.x, rect.topLeft.x), Math.min(this.topLeft.y, rect.topLeft.y)),
                new Point(Math.max(this.bottomRight.x, rect.bottomRight.x), Math.max(this.bottomRight.y, rect.bottomRight.y)));
        }

        unionPoint(point) {
            return new Rect(
                new Point(Math.min(this.topLeft.x, point.x), Math.min(this.topLeft.y, point.y)),
                new Point(Math.max(this.bottomRight.x, point.x), Math.max(this.bottomRight.y, point.y)));
        }

        containsPoint(point) {
            return point.x > this.topLeft.x
                && point.x < this.bottomRight.x
                && point.y > this.topLeft.y
                && point.y < this.bottomRight.y;
        }

        static pathBoundingRect(path) {
            return path.reduce(function (rect, pt) {
                let tl = rect.topLeft;
                let br = rect.bottomRight;
                tl.x = Math.min(tl.x, pt.x);
                tl.y = Math.min(tl.y, pt.y);
                br.x = Math.max(br.x, pt.x);
                br.y = Math.max(br.y, pt.y);
                return rect;
            }, new Rect(new Point(Number.MAX_VALUE, Number.MAX_VALUE), new Point(-Number.MAX_VALUE, -Number.MAX_VALUE)));
        }

    }

});
