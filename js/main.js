
require([
    "./Engine/Environment",
    "./Math/Line",
    "./Math/Point" 
], function(Environment, Line, Point) {
    new Environment(document.getElementsByTagName("canvas")[0]).begin();
});
