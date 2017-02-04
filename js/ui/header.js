
define([
    "compose",

    "layout/TemplateElement",

    "text!./templates/header.html"
], function (compose, TemplateElement, template) {

    return compose.element("cmc-header", TemplateElement, {
        templateString: template
    });

});
