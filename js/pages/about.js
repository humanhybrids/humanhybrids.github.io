
define(["page", "template", "eventmodel", "components/nav"],
    function (Page, Template, EventModel, nav) {
        var self = new Page();

        var links = {
            index: ["a", "Index", { "href": "#/index" }],
            eventmodel: ["a", "GitHub", { "href": "http://github.com/corycook/eventmodel" }],
            template: ["a", "GitHub", { "href": "http://github.com/corycook/template" }]
        };

        var main = new Template(["div", ["h2", "About"],
            ["p", "This site is built using only JavaScript libraries that I developed:"],
            ["ul", ["li", ["a", "amd.js", { "href": "js/amd.js" }],
                ": This is my own implementation of AMD (Asynchronous Module Definition)."],
                ["li", ["a", "fn.js", { "href": "js/fn.js" }],
                    ": Allows you to perform type checking and function overloading."],
                ["li", ["a", "eventmodel.js", { "href": "js/eventmodel.js" }],
                    ": Allows you to easily attach event listeners to DOM elements. ", links.eventmodel],
                ["li", ["a", "template.js", { "href": "js/template.js" }],
                    ": Allows you write compact JSON to generate DOM structures. ", links.template]],
            ["p", links.index]]);

        self.setcontent("main", main.create());
        self.setcontent("nav", nav);

        self.onrender(function () {
            document.title = "About";
        });

        return self;
    });
