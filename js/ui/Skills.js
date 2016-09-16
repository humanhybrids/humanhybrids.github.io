
define([
    "compose",
    "layout/TemplateElement",
    "./Skill",
    "json!data/skills.json"
], function (compose, TemplateElement, Skill, data) {

    return compose.element("cmc-skills", TemplateElement, {
        templateString: '<h2>Skills</h2><ul data-id="list"></ul>',
        createdCallback: function() {
            this.inherited(arguments);
            data.forEach(function(skill) { this.list.appendChild(new Skill(skill)); }, this);
        }
    });

});
