
require([
    "./Engine/Environment",
    "./Math/Line",
    "./Math/Point" 
], function(Environment, Line, Point) {
    new Environment(document.getElementsByTagName("canvas")[0]).begin();
    
    var L1 = new Line(new Point(-1, 0), new Point(4, 5));
    var L2 = new Line(new Point(0, 0), new Point(2, 5));
    var L3 = new Line(new Point(0, 6), new Point(6, 7));
    console.log(L1.intersectsSegment(L2), L1.lineIntersection(L2));
    console.log(L1.intersectsSegment(L3), L1.lineIntersection(L3));
});
