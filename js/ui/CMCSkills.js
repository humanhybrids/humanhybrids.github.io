
define([
    "compose",
    "layout/TemplateElement",
    "./Skill",
    "json!data/skills.json"
], function (compose, TemplateElement, Skill, data) {
    return compose.element("cmc-skills", TemplateElement, {
        
        templateString: '<h2>{title}</h2><ul data-id="list"></ul>',

        title: "Skills",

        createdCallback: function() {
            this.inherited(arguments);
            for (var i = 0; i < data.length; i++) {
                this.list.appendChild(new Skill(data[i]));
            }
        }

    });
});
