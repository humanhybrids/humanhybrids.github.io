
define([
    "compose",
    "layout/TemplateElement",
    "./Position",
    "json!data/positions.json"
], function(compose, TemplateElement, Position, data) {

    return compose.element("cmc-positions", TemplateElement, {
        templateString: '<h2>Positions</h2><ul data-id="list"></ul>',
        createdCallback: function() {
            this.inherited(arguments);
            data.forEach(function(position) { this.list.appendChild(new Position(position)); }, this);
        }
    });

});
