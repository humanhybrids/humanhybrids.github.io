
require(["fn", "eventmodel"], function (fn, EventModel) {
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
    model.bind();

    define("page", function () {
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

            this.render = function () {
                model.setcontent(this);
                _onrender(this);
            };

            this.setcontent = fn.create(String, Node, function (id, content) {
                this.content[id] = content;
            });

            this.onrender = fn.create(Function, function (fn) {
                this.callbacks.push(fn);
            });
        }).call(Page.prototype);

        return Page;
    });
});
