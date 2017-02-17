var gulp = require("gulp");
var cp = require("child_process");
var fs = require("fs");

gulp.task("paths", function () {
    cp.exec("bower list --paths --json", function (err, stdout) {
        if (err) {
            console.warn(err);
            return;
        }
        var paths = JSON.parse(stdout.replace(/\.js/g, ""));
        for (var id in paths) {
            paths[id] = "/" + paths[id];
        }
        fs.writeFile("js/data/paths.json", JSON.stringify(paths, null, 4), e => console.log("js/data/paths.json written"));
    });
});

gulp.task("default", ["paths"]);
