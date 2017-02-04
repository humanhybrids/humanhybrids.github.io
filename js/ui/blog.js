
define([
    "moment",
    "showdown",

    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",

    "json!data/blogs.json",
    "text!./templates/blog.html"
], function (moment, showdown, compose, BaseElement, TemplateElement, blogsData, template) {

    var converter = new showdown.Converter();

    var blogs = blogsData.reduce(function (previousValue, currentValue) {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
    }, {});

    return compose.element("cmc-blog", TemplateElement, {
        templateString: template,
        createdCallback: function () {
            this.inherited(arguments);
            window.addEventListener("hashchange", this.getPage.bind(this));
            this.getPage();
        },
        getPage: function () {
            var id = window.location.hash.substring(1);
            if (!id) {
                id = blogsData[0].id;
            }
            var blog = blogs[id];
            if (blog) {
                Object.assign(this, blog);
                var ix = blogsData.indexOf(blog);
                this.prev = blogsData[ix - 1];
                this.next = blogsData[ix + 1];
            }
        },
        _setLinkAttr: function (blog, linkNode, nameNode) {
            var id = blog && blog.id;
            if (id) {
                linkNode.href = "#" + id;
                nameNode.innerHTML = blog.name;
            }
            linkNode.style.display = !!id ? "inline" : "none";
        },
        set prev(blog) {
            this._setLinkAttr(blog, this.prevLinkNode, this.prevNameNode);
        },
        set next(blog) {
            this._setLinkAttr(blog, this.nextLinkNode, this.nextNameNode);
        },
        set id(value) {
            this._id = value;
            var contentNode = this.contentNode;
            require(["text!blog/" + value + ".md"], function (text) {
                contentNode.innerHTML = converter.makeHtml(text);
            }, function (err) {
                contentNode.innerHTML = "<p>Sorry, unable to load content for some reason.</p>"
            });
        },
        set name(value) {
            this.titleNode.innerHTML = value;
            document.title = value;
        },
        set created(date) {
            this.createdNode.innerHTML = moment(date.value, date.format).calendar();
        }
    });

});