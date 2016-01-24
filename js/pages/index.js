
define(["page", "eventmodel", "template"], function (Page, EventModel, Template) {

    var self = new Page();

    var links = {
        about: ["a", { "class": "link-about", "href": "#about" }, "About"]
    };

    var main = new Template(["div", ["h2", "Welcome!"], links.about]);
    var nav = new Template(links.about);

    self.setcontent("main", main.create());
    self.setcontent("nav", nav.create());

    var model = new EventModel({
        ".link-about": {
            "click": function (event, model) {
                event.preventDefault();
                require(["pages/about"], function(page) {
                    page.render();
                    history.pushState(page.state, "About", "#/about");
                });
                
            }
        }
    });

    self.onrender(function () {
        model.bind();
    });
    
    return self;

});

