
define(["compose", "util", "./BaseElement"], function (compose, util, BaseElement) {

    return compose(BaseElement, {

        get root() {
            if (!this.shadowRoot) {
                this.createShadowRoot();
            }
            return this.shadowRoot;
        },

        createdCallback: function () {
            var template = this.createTemplate(this.parseTemplate(this.templateString, this));
            this.root.appendChild(document.importNode(template.content, true));
            this.bindNode(this.root);
        },

        createTemplate: function (templateString) {
            return Object.assign(document.createElement("template"), {
                innerHTML: templateString
            });
        },

        parseTemplate: function (templateString, context) {
            return templateString.replace(/\{([\w\.]+)\}/g, function (match, p1) {
                return util.safeget(context, p1);
            });
        },

        bindNode: function (node) {
            Array.prototype.forEach.call(node.querySelectorAll("[data-id]"), function (element) {
                this[element.getAttribute("data-id")] = element;
            }, this);
        }

    });

});
