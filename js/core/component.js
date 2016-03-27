define(['fn', './declare', 'Template'], function (fn, declare, Template) {

    return declare(function Component() {

    }, function () {
        this.template = null;
        this.create = function () {
            return (new Template(this.template)).create();
        };
    });

})