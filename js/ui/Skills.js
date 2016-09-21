
define([
    "compose",
    "layout/BaseElement",
    "./Skill",
    "json!data/skills.json"
], function (compose, BaseElement, Skill, data) {

    return compose.element("cmc-skills", BaseElement, {
        templateString: '<ul data-id="list"></ul>',
        get cssRules() {
            return [
                ":host { display: block; }",
                "ul { list-style: none; padding: 0; }"
            ];
        },
        createdCallback: function () {
            this.inherited(arguments);
            data.forEach(function (skill) { this.root.appendChild(new Skill(skill)); }, this);
        }
    });

});
