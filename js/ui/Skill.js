
define([
    "compose",
    "layout/TemplateElement"
], function(compose, TemplateElement) {

    return compose.element("cmc-skill", "li", TemplateElement, {
        templateString: '<span data-id="nameNode"></span>',
        set name(name) {
            this.nameNode.innerHTML = name;
        }
    });

});
