
define(function() {

    function FnError(name) { Error.apply(this, arguments); }
    FnError.prototype = Object.create(Error.prototype);

    function check(types, body) {
        return function() {
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

    return function overload(types, body) {
        if (arguments.length === 1) {
            return types;
        } else if (arguments.length === 2) {
            return check(types, body);
        } else {
            var catchFunction = overload.apply(this, Array.prototype.slice.call(arguments, 2))
            return function() {
                try {
                    return check(types, body).apply(this, arguments);
                } catch (error) {
                    if (!(error instanceof FnError)) throw error;
                    catchFunction.apply(this, arguments);
                }
            }
        }
    }

});