
define(["page", "template", "eventmodel"], function (Page, Template, EventModel) {

    var self = new Page();

    var links = {
        index: ["a", { "class": "link-index", "href": "#/index" }, "Index"]
    };

    var main = new Template(["div", ["h2", "About"],
        ["p", "This site is built using only JavaScript libraries that I developed:"],
        ["ul", ["li", ["a", "amd.js", { "href": "js/amd.js" }],
            ": This is my own implementation of AMD (Asynchronous Module Definition)."],
            ["li", ["a", "fn.js", { "href": "js/fn.js" }],
                ": Allows you to perform type checking and function overloading."],
            ["li", ["a", "eventmodel.js", { "href": "js/eventmodel.js" }],
                ": Allows you to easily attach event listeners to DOM elements."],
            ["li", ["a", "template.js", { "href": "js/template.js" }],
                ": Allows you define HTML in compact JSON and generate HTML"]],
        ["p", links.index]]);

    var nav = new Template(links.index);

    self.setcontent("main", main.create());
    self.setcontent("nav", nav.create());

    var model = new EventModel({
        ".link-index": {
            "click": function (event, model) {
                require(["pages/index"], function (page) {
                    page.render();
                });
            }
        }
    });

    self.onrender(function () {
        model.bind();
    });

    return self;

});
