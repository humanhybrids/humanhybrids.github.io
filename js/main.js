
require(["config!"], function (cfg) {
    var load = ["webcomponentsjs", "ui/header"];
    var page = window.location.pathname;
    if (/blog/g.test(page)) {
        load.push("ui/blog");
    } else {
        load.push("ui/cv");
        load.push("ui/bloglist");
    }
    require(load);
});
