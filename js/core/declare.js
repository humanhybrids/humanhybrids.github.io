
define(["fn"], function (fn) {

    var declare = fn(fn([Array, Function, Function], function (mixins, constructor, proto) {
        return declare(constructor, function () {
            for (var i = 0; i < mixins.length; i++)
                mixins[i].proto.call(this);
            proto.call(this);
        });
    }), fn([Function, Function], function (constructor, proto) {
        constructor.proto = proto;
        proto.call(constructor.prototype);
        return constructor;
    }));

    return declare;

});
