
define([
    "compose",
    "layout/TemplateElement",
    "./Skills",
    "./Positions",
    "text!./templates/CV.html"
], function(compose, TemplateElement, Skills, Positions, template) {

    return compose.element("cmc-cv", TemplateElement, {
        templateString: template
    });

});
