
define([], function () {
    var _configured = false;
    return {
        load: function (name, req, onload, cfg) {
            if (_configured) return cfg;
            var config = {
                config: {
                    "layout/BaseElement": {
                        cssGlobal: "/css/global.css"
                    }
                },
                paths: {}
            };
            var div = document.createElement("div");
            div.createShadowRoot && div.createShadowRoot();
            var shadowDOM = div.shadowRoot && div.shadowRoot !== div;
            if (!shadowDOM) {
                console.warn("shadowDOM not supported.");
                Object.assign(config, {
                    map: {
                        "*": {
                            "layout/TemplateElement": "layout/NoShadowTemplate"
                        }
                    }
                });
            }

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/js/data/paths.json");
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState == xhr.DONE) {
                    if (xhr.status == 200) {
                        var paths = JSON.parse(xhr.responseText);
                        Object.assign(config.paths, paths);
                    }
                    require.config(config);
                    _configured = true;
                    onload(cfg);
                }
            });
            xhr.send();
        }
    }
});
