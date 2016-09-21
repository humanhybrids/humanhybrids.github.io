
define([
    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",
    "./Position",
    "json!data/positions.json"
], function (compose, BaseElement, TemplateElement, Position, data) {

    return compose.element("cmc-positions", BaseElement, {
        createdCallback: function () {
            this.inherited(arguments);
            data.forEach(function (position) { this.root.appendChild(new Position(position)); }, this);
        }
    });

});
