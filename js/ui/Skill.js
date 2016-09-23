
define([
    "compose",
    "layout/TemplateElement",
    "text!./templates/Skill.html"
], function (compose, TemplateElement, template) {

    return compose.element("cmc-skill", TemplateElement, {
        templateString: template,
        set name(name) {
            this.nameNode.innerHTML = name;
        }
    });

});
