
define([
    "compose",
    "layout/TemplateElement",
    "./Skills",
    "./Positions",
    "./Educations",
    "text!./templates/CV.html"
], function(compose, TemplateElement, Skills, Positions, Educations, template) {

    return compose.element("cmc-cv", TemplateElement, {
        templateString: template,
        get cssRules() {
            return [
                ":host { display: block; }"
            ]
        }
    });

});
