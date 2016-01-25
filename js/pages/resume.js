
define(["page", "template", "data", "components/nav"], function (Page, Template, data, nav) {
    var self = new Page();

    var positions = ["ul", ["@", ["li", ["b", "@title"],
        ["i", { "style": "float: right" }, "@startDate - @endDate"],
        ["div", "@companyName"], ["div", "@summary"]]]];

    var educations = ["ul", ["@", ["li", ["b", "@schoolName"],
        ["i", { "style": "float: right" }, "@startDate - @endDate"],
        ["div", "@degree in @fieldOfStudy, @gpa"]]]];

    var skills = ["div", ["@", ["span", { "class": "skill", "title": "proficiency: @proficiency / 5" }, "@name"]]];

    var main = new Template(["div",
        ["h2", "Work Experience"], ["@positions", positions],
        ["h2", "Education"], ["@educations", educations],
        ["h2", "Skills"], ["@skills", skills]]);

    self.setcontent("main", main.create(data.resume));
    self.setcontent("nav", nav);
    
    self.onrender(function() {
        document.title = "Resume";
    });

    return self;
});
