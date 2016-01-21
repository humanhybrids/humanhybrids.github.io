
(function (g, factory, fn) {

    factory.call(g, fn);

})(this, function (fn) {

    var context = this;
    var tag = document.currentScript;
    var src = tag.getAttribute("src");
    var root = src.substring(0, src.lastIndexOf("\/") + 1);

    var modules = {};

    function Module(name) {
        this.name = name;
        this.isdefined = false;
    }

    (function () {
        this.define = function define(factory) {
            this.factory = factory;
            this.isdefined = true;
            if ("ondefine" in this)
                this.ondefine();
        };

        this.args = function args(list) {
            this.list = list;
        };

        var make = fn.overload(
            fn.create(Function, Function, Array, function (callback, factory, list) {
                require(list, function () {
                    callback(factory.apply(context, arguments))
                });
            }),
            fn.create(Function, Function, function (callback, factory) {
                callback(factory());
            }),
            function (callback, object) {
                callback(object);
            });

        this.create = function create(callback) {
            if (!this.isdefined) {
                this.ondefine = function () { make(callback, this.factory, this.list); };
                document.head.insertBefore(this.script, tag);
            } else {
                make(callback, this.factory, this.list);
            }
        };

        Object.defineProperties(this, {
            script: {
                get: function () {
                    var s = document.createElement("script");
                    s.src = root + this.name + ".js";
                    s.async = true;
                    Object.defineProperty(this, "script", { value: s });
                    return this.script;
                }
            }
        });
    }).call(Module.prototype);

    this.require = function (list, fn) {
        var ct = list.length;
        var args = {};
        list.forEach(function (name) {
            if (!(name in modules))
                modules[name] = new Module(name);
            modules[name].create(function (module) {
                args[name] = module;
                if (--ct == 0)
                    fn.apply(this, list.map(x => args[x]));
            });
        });
    };

    function getName() {
        var t = document.currentScript;
        var src = t.getAttribute("src");
        return src.substring(src.lastIndexOf("\/") + 1, src.length - 3);
    }

    this.define = fn.overload(
        fn.create(Array, Function, function (list, factory) {
            var name = getName();
            modules[name].args(list);
            modules[name].define(factory);
        }),
        fn.create(String, Array, Function, function(name, list, factory) {
            if (!(name in modules))
                modules[name] = new Module(name);
            modules[name].args(list);
            modules[name].define(factory);
        }),
        fn.create(String, function (name, factory) {
            if (!(name in modules))
                modules[name] = new Module(name);
            modules[name].define(factory);
        }),
        function (factory) {
            var name = getName();
            modules[name].define(factory);
        });

    this.define("fn", fn);

}, (function () {

    function FnError(name) { Error.apply(this, arguments); }
    FnError.prototype = new Error();

    function create() {
        var types = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        var body = arguments[arguments.length - 1];
        return function () {
            if (arguments.length < types.length)
                throw new FnError("Argument count mismatch.");
            for (var i = 0; i < types.length; i++) {
                if (typeof arguments[i] == "undefined")
                    throw new FnError("Argument is undefined.");
                if (arguments[i].constructor != types[i] &&
                    !(arguments[i] instanceof types[i]))
                    throw new FnError("Argument type mismatch. (" + types[i].name + ")");
            }
            return body.apply(this, arguments);
        };
    };

    function overload(a) {
        if (arguments.length == 1) return a;
        var c = overload.apply(this, Array.prototype.slice.call(arguments, 1));
        return function () {
            try {
                return a.apply(this, arguments);
            } catch (e) {
                if (!(e instanceof FnError)) throw e;
                return c.apply(this, arguments);
            }
        };
    };

    return { create: create, overload: overload };

})());
