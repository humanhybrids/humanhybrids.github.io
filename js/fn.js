
(function (global, _factory) {

    if (global.define && global.define.constructor === Function) {
        global.define(_factory);
    } else {
        global["fn"] = _factory();
    }

})(this, function () {

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
