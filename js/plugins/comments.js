var DISQUS;
var disqus_config;

define([], function () {
    disqus_config = config();
    function config(options) {
        if (typeof options === "undefined")
            options = {};
        return function () {
            var loc = window.location;
            this.page.identifier = options.id || loc.hash;
            this.page.url = options.url || ("http://" + loc.host + loc.pathname + "#!" + (loc.hash && loc.hash.substr(1)));
            this.page.title = options.title || document.title;
        };
    }

    var enabled = false;
    return {
        enable: function () {
            if (!enabled) {
                var d = document;
                var s = d.createElement('script');
                s.src = '//corycook-github-io.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                enabled = true;
            }
        },
        reset: function (options) {
            if (DISQUS) {
                DISQUS.reset({
                    reload: true,
                    config: config(options)
                });
            }
        }
    };
});
