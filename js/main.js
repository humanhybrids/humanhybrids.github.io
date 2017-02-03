
(function () {

    var config = {
        config: {
            "layout/BaseElement": {
                cssGlobal: "/css/global.css"
            }
        },
        paths: {
            "showdown": "https://cdn.rawgit.com/showdownjs/showdown/1.6.3/dist/showdown.min",
            "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min"
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
        "ui/cv"
    ]);

    if (/blog/g.test(window.location.pathname)) {
        require(["ui/blog"]);
    }

})();
