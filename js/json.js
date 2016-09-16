
define({
    load: function(name, req, onload, config) {
        req(["text!" + name], function (text) {
            try {
                onload(JSON.parse(text));
            } catch(e) {
                onload(e);
            }
        })
    }
});
