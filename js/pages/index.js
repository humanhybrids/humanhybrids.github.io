
define(["page", "eventmodel", "template", "components/nav"],
    function (Page, EventModel, Template, nav) {
        var self = new Page();

        var links = {
            about: ["a", { "class": "link-about", "href": "#/about" }, "About"]
        };

        var main = new Template(["div", ["h2", "Welcome!"], links.about]);

        self.setcontent("main", main.create());
        self.setcontent("nav", nav);

        self.onrender(function () {
            document.title = "Index";
        });

        return self;
    });

