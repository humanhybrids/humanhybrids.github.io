
define(["compose", "module"], function (compose, _module) {

    return compose(HTMLElement, {

        get root() {
            return this;
        }

    });
    
});
