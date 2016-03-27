
define(['core/declare', 'core/component'], function (declare, Component) {

    return declare([Component], function TestComponent() {
        
    }, function () {
        this.template = ['a', { 'href': 'google.com' }, 'google.com'];
    });

});
