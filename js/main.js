
(function () {

    var config = {
        config: {
            "layout/BaseElement": {
                cssGlobal: "/css/global.css"
            }
        }
    };

    var div = document.createElement("div");
    div.createShadowRoot && div.createShadowRoot();
    var shadowDOM = div.shadowRoot && div.shadowRoot !== div;

    if (!shadowDOM) {
        console.warn("shadowDOM not suppoted.");
        Object.assign(config, {
            map: {
                "*": {
                    "layout/TemplateElement": "layout/NoShadowTemplate"
                }
            }
        });
    }

    requirejs.config(config);

    require([
        "webcomponents",
        "ui/CV",
        "ui/Lines"
    ]);

})();
