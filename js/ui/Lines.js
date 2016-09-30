
define(["compose", "layout/BaseElement"], function(compose, BaseElement) {
    compose.element("cmc-lines", BaseElement, {
        createdCallback: function() {
            this.classList.add("lines");
            var n = +(this.getAttribute("count") || 5);
            var target = this;
            for (var i = 0; i < n; i++) {
                var div = document.createElement("div");
                target.appendChild(div);
                target = div;
            }
        }
    })
});
