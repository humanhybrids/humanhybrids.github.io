
require.config({
    config: {
        "layout/BaseElement": {
            cssGlobal: "/css/global.css"
        }
    }
});

require([
    "webcomponents",
    "ui/CV"
], function (webcomponents, CV) { });
