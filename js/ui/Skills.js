
define([
    "compose",
    "layout/BaseElement",
    "./Skill",
    "json!data/skills.json"
], function (compose, BaseElement, Skill, data) {

    return compose.element("cmc-skills", BaseElement, {
        get cssRules() {
            return [":host { display: block; }"];
        },
        createdCallback: function () {
            this.inherited(arguments);
            data.forEach(function (skill) { this.root.appendChild(new Skill(skill)); }, this);
        }
    });

});
