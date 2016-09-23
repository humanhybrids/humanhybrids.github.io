
define(["compose", "util", "./BaseElement"], function (compose, util, BaseElement) {

    var STYLE = document.createElement("style");
    document.head.appendChild(STYLE);

    return compose(BaseElement, {

        postCompose: function () {
            if (this.templateString) {
                var cssRules = "";
                this.templateString = this.templateString.replace(/<style>([^]*?)<\/style>/g, function (match, rules) {
                    cssRules += rules;
                    return "";
                });
                if (cssRules) {
                    var name = util.safeget(this, "constructor.meta.name");
                    var tagName = util.safeget(this, "constructor.meta.tagName");
                    var selector = tagName ? "[is=" + name + "]" : name;
                    cssRules = cssRules.replace(":host", selector);
                    cssRules = cssRules.replace(/([^]+?){[^]+?}/g, function (match, rule) {
                        var sheet = STYLE.sheet;
                        if (rule.indexOf(name) == -1) {
                            match = match.replace(rule, rule.trim().split(',').map(function (r) {
                                return name + " " + r;
                            }).join(", "));
                        }
                        sheet.insertRule(match, sheet.cssRules.length);
                    });
                }
            }
        },

        get root() { return this; },

        createdCallback: function () {
            var template = this.createTemplate(this.parseTemplate(this.templateString, this));
            var node = document.importNode(template.content, true);
            this.bindNode(node);
            this.inherited(arguments);
            this.root.appendChild(node);
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
