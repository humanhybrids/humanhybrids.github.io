
define([
    "compose",
    "layout/BaseElement",
    "./EducationItem",
    "json!data/education.json"
], function (compose, BaseElement, EducationItem, data) {

    return compose.element("cmc-educations", BaseElement, {
        createdCallback: function () {
            this.inherited(arguments);
            data.forEach(function (ed) { this.root.appendChild(new EducationItem(ed)); }, this);
        }
    });

});
