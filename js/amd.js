
(function (g, factory, fn_factory) {

    factory.call(g, fn_factory());

})(this, function (fn) {

    var _this = this;
    var tag = document.currentScript;
    var src = tag.getAttribute("src");
    var root = src.substring(0, src.lastIndexOf("\/") + 1);

    var _modules = {};

    function getName() {
        var t = document.currentScript;
        var src = t.getAttribute("src");
        return src.substring(root.length, src.length - 3);
    }

    function getPath(name, parent) {
        var basis = parent.split('\/');
        basis.pop();
        var paths = name.split('\/');
        for (var i = 0; i < paths.length(); i++) {
            switch (paths[i]) {
                case '.': break;
                case '..':
                    basis.pop();
                    break;
                default:
                    basis.append(paths[i]);
                    break;
            }
        }
        return basis.join('\/');
    }

    var getModule = fn(fn([String, String], function (name, parent) {
        if (name.startsWith("."))
            name = getPath(name, parent);
        return getModule(name);
    }), function (name) {
        name = name.toLowerCase();
        if (!(name in _modules))
            _modules[name] = new Module(name);
        return _modules[name];
    });


    function Module(name) {
        this.name = name;
        this.isdefined = false;
        this.callbacks = [];
        this.script = null;
    }

    (function () {

        function _defined(module) {
            module.callbacks.forEach(function (fn) {
                fn.call(module);
            });
        }

        this.define = fn(fn([Array, Function], function (list, factory) {
            this.list = list;
            this.define(factory);
        }), function (factory) {
            this.factory = factory;
            this.isdefined = true;
            _defined(this);
        });

        var _make = fn(fn([Function, Function, Array], function (callback, factory, list) {
            require(list, function () { callback(factory.apply(_this, arguments)) }, this.name);
        }), fn([Function, Function], function (callback, factory) {
            callback(factory());
        }), fn([Function], function (callback, object) {
            callback(object);
        }));

        this.getScript = function () {
            if (this._script == null) {
                this._script = document.createElement("script");
                this._script.src = root + this.name + ".js";
                this._script.async = true;
            }
            return this._script;
        };

        this.create = function (callback) {
            if (!this.isdefined) {
                this.callbacks.push(function () { _make(callback, this.factory, this.list); });
                document.head.insertBefore(this.getScript(), tag);
            } else {
                _make(callback, this.factory, this.list);
            }
        };

    }).call(Module.prototype);

    this.require = function require(list, fn, parent) {
        var ct = list.length;
        var args = {};
        list.forEach(function (name) {
            module = getModule(name);
            module.create(function (module) {
                args[name] = module;
                if (--ct == 0) fn.apply(this, list.map(function (x) { return args[x]; }));
            });
        });
    };

    this.define = fn(fn([Array, Function], function (list, factory) {
        var module = getModule(getName());
        module.define(list, factory);
    }), fn([String, Array, Function], function (name, list, factory) {
        var module = getModule(name);
        module.define(list, factory);
    }), fn([String], function (name, factory) {
        var module = getModule(name)
        module.define(factory);
    }), function (factory) {
        var module = getModule(getName());
        module.define(factory);
    });

    this.define("fn", fn);
    this.define("define", function () { return _this.define });
    this.define("require", function () {
        return fn(fn([String], function (name) {
            name = name.toLowerCase();
            if (!(name in _modules) || !_modules[name].isdefined)
                throw new Error("Module is not defined.");
            var result = null;
            _modules[name].create(function (m) { result = m; });
            return result;
        }), _this.require);
    });

}, function () {

    function FnError(name) { Error.apply(this, arguments); }
    FnError.prototype = Object.create(Error);

    function _create(types, body) {
        return function () {
            if (arguments.length < types.length)
                throw new FnError("Argument count mismatch.");
            for (var i = 0; i < types.length; i++) {
                if (typeof arguments[i] == "undefined")
                    throw new FnError("Argument is undefined.");
                if (arguments[i].constructor != types[i] &&
                    !(arguments[i] instanceof types[i]))
                    throw new FnError("Argument type mismatch.");
            }
            return body.apply(this, arguments);
        };
    };

    function _overload(a) {
        if (arguments.length == 1) return a;
        var c = _overload.apply(this, Array.prototype.slice.call(arguments, 1));
        return function () {
            try {
                return a.apply(this, arguments);
            } catch (e) {
                if (!(e instanceof FnError)) throw e;
                return c.apply(this, arguments);
            }
        };
    };

    var result = _overload(_create([Array], _create), _create([Function], _overload));
    result.FnError = FnError;
    return result;

});
