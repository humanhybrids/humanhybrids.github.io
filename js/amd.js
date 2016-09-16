
(function () {

    function Module(id) {
        this.id = id;
        this.load();
    }

    Module.prototype = {
        loaded: false,
        get id() {
            return this.script.id;
        },
        set id(id) {
            this.script.id = id;
            this.script.src = id + ".js";
        },
        get script() {
            delete this.script;
            return this.script = document.createElement("script");
        },
        load: function() {
            var script = this.script;
            script.onload = e => this.loaded = true;
            document.head.appendChild(script);
        }
    };

    var MODULES = {};

    function require(deps, callback) {

    }

    function define(id, dependencies, factory) {
        if (typeof dependencies === "undefined") {
            factory = id;
            id = null;
        } else if (typeof factory === "undefined") {
            factory = dependencies;
            dependencies = id;
        }
        if (!id) {
            id = document.currentScript.id;
        }
    }

    window.require = require;
    window.define = define;

})();
