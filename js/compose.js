
define(function () {

    var SEP = " ";

    function getOwnPropertyDescriptors (object) {
        return Object.keys(object).reduce(function (descriptors, id) {
            var descriptor = Object.getOwnPropertyDescriptor(object, id);
            if (descriptor) {
                descriptors[id] = descriptor;
            }
            return descriptors;
        }, {});
    }

    function inherited(args) {
        var caller = args.callee;
        var name = caller.fid;
        var supertype = (caller.proto && caller.proto.super) || this.super;
        var descriptor = Object.getOwnPropertyDescriptor(supertype, name);
        var type = "value";
        if (name.indexOf(SEP) !== -1) {
            let names = name.split(SEP);
            type = names[0];
            name = names[1];
            descriptor = Object.getOwnPropertyDescriptor(supertype, name);
        }
        return descriptor && descriptor[type].apply(this, args);
    }

    function setup(proto) {
        Object.keys(proto).forEach(function(id) {
            var descriptor = Object.getOwnPropertyDescriptor(proto, id);
            if (!descriptor) return;
            if (descriptor.value && typeof descriptor.value === "function") {
                descriptor.value.fid = id;
                descriptor.value.proto = proto;
            }
            if (descriptor.get) {
                descriptor.get.fid = "get" + SEP + id;
                descriptor.get.proto = proto;
            }
            if (descriptor.set) {
                descriptor.set.fid = "set" + SEP + id;
                descriptor.set.proto = proto;
            }
        });
    }

    function compose(Extends, proto) {
        var Super = Extends || Object;
        var constructor = proto.hasOwnProperty("constructor") ? proto.constructor : (function () { Super.apply(this, arguments); });
        constructor.prototype = Object.create(Super.prototype, getOwnPropertyDescriptors(proto));
        constructor.prototype.super = Super.prototype;
        constructor.prototype.inherited = inherited;
        setup(constructor.prototype);
        return constructor;
    }

    compose.element = function(name, tagName, Extends, proto) {
        if (typeof proto === "undefined") {
            proto = Extends;
            Extends = tagName;
            tagName = null;
        }
        proto.constructor = !!tagName ? function(init) {
            return Object.assign(document.createElement(tagName, name), init);
        } : function(init) {
            return Object.assign(document.createElement(name), init);
        };
        var constructor = compose(Extends, proto);
        if (!!tagName) {
            document.registerElement(name, {
                extends: tagName,
                prototype: constructor.prototype
            });
        } else {
            document.registerElement(name, constructor);
        }
        return constructor;
    }

    return compose;

})