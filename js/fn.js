(function (factory) {

    if (typeof define !== "undefined")
        define(factory);
    else
        this.fn = factory();

})(function () {

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

});
