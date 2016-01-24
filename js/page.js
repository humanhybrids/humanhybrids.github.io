
define(["fn", "eventmodel"], function (fn, EventModel) {

    function Page() {
        this.content = {};
        this.callbacks = [];
        this.state = { id: Math.random() };
    }

    (function () {
        function _onrender(page) {
            for (var i = 0; i < page.callbacks.length; i++) {
                page.callbacks[i]();
            }
        }

        var model = new EventModel({
            "[data-content]": {
                "setcontent": function (event, model) {
                    var page = event.data;
                    while (this.firstChild)
                        this.removeChild(this.firstChild);
                    var key = this.getAttribute("data-content");
                    if (key in page.content)
                        this.appendChild(page.content[key]);
                }
            }
        });

        this.render = function () {
            model.bind();
            model.setcontent(this);
            _onrender(this);
        };

        this.setcontent = fn.create(String, HTMLElement, function (id, content) {
            this.content[id] = content;
        });

        this.onrender = fn.create(Function, function (fn) {
            this.callbacks.push(fn);
        });
    }).call(Page.prototype);

    return Page;

});