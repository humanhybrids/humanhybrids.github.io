
define(["core/page", "template", "data"], function (Page, Template, data) {
    var self = new Page();

    var positions = ["li", ["b", "@title"],
        ["i", { "style": "float: right" }, "@startDate - @endDate"],
        ["div", "@companyName"], ["div", "@summary"]];

    var educations = ["li", ["b", "@schoolName"],
        ["i", { "style": "float: right" }, "@startDate - @endDate"],
        ["div", "@degree in @fieldOfStudy, @gpa"]];

    var skills = ["span", "@name ", { "class": "skill", "title": "proficiency: @proficiency / 5" }];

    var main = new Template(["div",
        ["h2", "Work Experience"], ["ul", ["@positions", positions]],
        ["h2", "Education"], ["ul", ["@educations", educations]],
        ["h2", "Skills"], ["div", ["@skills", skills]]]);

    var header = new Template(["address", ["@address",
        "@street", ["br"],
        "@city, @state @zip"], ["br"],
        "Phone: @phone", ["br"],
        "Email: @email"]);

    self.setcontent("main", main.create(data.resume));
    self.setcontent("header", header.create(data.resume));

    self.onrender(function () {
        document.title = "Resume";
    });

    return self;
});
