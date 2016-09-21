
define([
    "compose",
    "layout/TemplateElement"
], function (compose, TemplateElement) {

    return compose.element("cmc-skill", TemplateElement, {
        templateString: '<span data-id="nameNode"></span>',
        get cssRules() {
            return [
                ":host { display: inline; margin-right: 10px; }",
                "span { padding: 5px; border-radius: 5px; cursor: default; }",
                "span:hover { background-color: lightgray; }"
            ];
        },
        set name(name) {
            this.nameNode.innerHTML = name;
        }
    });

});
