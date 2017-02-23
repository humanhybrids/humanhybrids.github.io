
define([
    "compose",

    "layout/TemplateElement",

    "text!./templates/header.html"
], function (compose, TemplateElement, template) {

    return compose.element("cmc-header", TemplateElement, {
        templateString: template,
        createdCallback: function () {
            this.inherited(arguments);
            var loc = window.location;
            this.root.querySelectorAll("nav a").forEach(function (link) {
                if (link.href == loc.protocol + "//" + loc.host + loc.pathname) {
                    link.dataset.enabled = true;
                }
            });
        }
    });

});
