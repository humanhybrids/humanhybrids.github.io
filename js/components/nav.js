
define(["eventmodel", "template"], function (EventModel, Template) {
    var links = [
        { text: "Index", url: "#/index" },
        { text: "About", url: "#/about" },
        { text: "Resume", url: "#/resume" }
    ];

    var s = ["a", "@text", { "href": "@url", "class": "page-link" }];
    var linkset = new Template(["@", s, " "]);
    return linkset.create(links);
});
