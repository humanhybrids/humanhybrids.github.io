
define([
    "compose",
    "layout/TemplateElement"
], function(compose, TemplateElement) {
    return compose.element("cmc-skill", TemplateElement, {

        templateString: '<li data-id="nameNode"></li>',

        set name(name) {
            this.nameNode.innerHTML = name;
        }
        
    });
});
