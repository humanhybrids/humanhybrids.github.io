
define([], function () {
    var d = document;
    var enabled = false;

    function create() {
        var node = d.createElement('div');
        node.id = "disqus_thread";
        d.body.appendChild(node);

        var s = d.createElement('script');
        s.src = '//corycook-github-io.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }

    return {
        enable: function () {
            if (!enabled) {
                create();
                enabled = true;
            }
        },
        reset: function (options) {
            if (typeof options === "undefined") options = {};
            reload = typeof options.reload === "boolean" ? options.reload : true;
            DISQUS.reset({
                reload: reload,
                config: function () {
                    var loc = window.location;
                    this.page.identifier = options.id || loc.hash;
                    this.page.url = options.url || ("http://" + loc.host + loc.pathname + "#!" + (loc.hash && loc.hash.substr(1)));
                    this.page.title = options.title || document.title;
                }
            });
        }
    }
});
