
require(["config!"], function (config) {
    var components = Array.from(document.querySelectorAll("link[rel=preload][href$=js]")).map(function (link) {
        var id = link.getAttribute("href");
        return id.substring(config.baseUrl.length, id.indexOf(".js"));
    });
    require(components);
});
