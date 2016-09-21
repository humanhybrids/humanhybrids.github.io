
define(["compose", "module"], function (compose, _module) {

    return compose(HTMLElement, {

        get root() {
            return this;
        },

        /**
         * Returns the cssRules to apply to this element. 
         * Define CSS here such that the generates styles can be placed in the proper
         * place based on shadow root support.
         */
        get cssRules() { return []; },

        createdCallback: function() {
            this.defineStyles(this.cssRules);
        },
        
        defineStyles: function(rules) {
            var name = this.constructor["meta.name"];
            var style = document.createElement("style");
            var cssGlobal = _module.config().cssGlobal;
            style.onload = function() {
                cssGlobal && this.sheet.insertRule("@import '" + cssGlobal + "';", 0);
                rules.forEach(function(rule) {
                    var ix = this.sheet.cssRules.length;
                    try {
                        this.sheet.insertRule(rule, ix);
                    } catch (e) {
                        this.sheet.insertRule(rule.replace(":host", name), ix);
                    }
                }, this);
            };
            this.root.insertBefore(style, this.root.firstChild);
        }

    });
    
});
