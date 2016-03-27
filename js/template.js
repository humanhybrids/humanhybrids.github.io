"use strict";

(function (g, factory) {

    if (typeof g.define !== "undefined") {
        g.define(factory);
    } else {
        g.Template = factory();
    }

})(this, function () {

    function type(obj) { return Object.prototype.toString.call(obj); }

    var types = {
        function: "[object Function]",
        string: "[object String]",
        object: "[object Object]",
        array: "[object Array]",
        fragment: "[object DocumentFragment]"
    };

    function Template(structure) {
        this.structure = type(structure) == types.array ? structure : arguments;
    }

    (function () {

        function is(str) {
            return type(str) == types.string && str.indexOf('@') >= 0;
        }

        function get(str, data) {
            if (str == '@') return data;
            return str.replace(/@\(?(\w+)\)?/g, function (match, name) {
                return name in (data || {}) ? data[name] : match;
            });
        }

        var handlers = {};

        handlers[types.string] = function (element, obj, data) {
            if (is(obj)) obj = get(obj, data);
            element.appendChild(document.createTextNode(obj));
        };

        handlers[types.object] = function (element, obj, data) {
            var value = null;
            for (var p in obj) {
                value = obj[p];
                if (is(value))
                    value = get(value, data);
                element.setAttribute(p, value);
            }
        };

        handlers[types.array] = function (element, obj, data) {
            element.appendChild(generate(obj, data));
        };

        handlers[types.fragment] = function (element, obj, data) {
            element.appendChild(obj);
        };

        function handle(element, obj, data) {
            var _type = type(obj);
            if (typeof handlers[_type] == "undefined")
                _type = types.string;
            handlers[_type](element, obj, data);
        }

        function generate(structure, data) {
            if (structure[0][0] == '@') {
                var name = structure[0].substring(1);
                var items = name == '' ? data : data[name];
                var fragment = document.createDocumentFragment();
                if (type(items) == types.array) {
                    for (var i = 0; i < items.length; i++)
                        for (var j = 1; j < structure.length; j++)
                            handle(fragment, structure[j], items[i]);
                } else {
                    for (var i = 1; i < structure.length; i++)
                        handle(fragment, structure[i], items);
                }
                return fragment;
            } else {
                var element = document.createElement(structure[0]);
                for (var i = 1; i < structure.length; i++)
                    handle(element, structure[i], data);
                return element;
            }
        }

        this.create = function (data) {
            return generate(this.structure, data);
        };
        this.generate = generate;

    }).call(Template.prototype);

    return Template;

});
