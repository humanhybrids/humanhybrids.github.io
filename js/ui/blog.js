
define([
    "moment",
    "showdown",

    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",

    "json!data/blogs.json",
    "text!./templates/blog.html"
], function (moment, showdown, compose, BaseElement, TemplateElement, blogsData, blogTemplate) {

    var converter = new showdown.Converter();

    var blogs = blogsData.reduce(function (previousValue, currentValue) {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
    }, {});

    var BlogItem = compose.element("cmc-blog-item", TemplateElement, {
        templateString: blogTemplate,
        get id() {
            return this._id;
        },
        set id(value) {
            this._id = value;
            var contentNode = this.contentNode;
            require(["text!blog/" + value + ".md"], function (text) {
                contentNode.innerHTML = converter.makeHtml(text);
            });
        },
        set name(value) {
            this.titleNode.innerHTML = value;
        },
        set created(date) {
            this.createdNode.innerHTML = moment(date.value, date.format).calendar();
        }
    });

    return compose.element("cmc-blog", TemplateElement, {
        templateString: '<cmc-blog-item data-id="blog"></cmc-blog-item> <a data-id="prevNode" style="display: none;">Previous</a> <a data-id="nextNode" style="display: none;">Next</a>',
        createdCallback: function () {
            this.inherited(arguments);
            this.keys = Object.keys(blogsData);
            window.addEventListener("hashchange", this.getPage.bind(this));
            this.getPage();
        },
        getPage: function () {
            var id = window.location.hash.substring(1);
            if (!id) {
                id = blogsData[0].id;
            }
            var blog = blogs[id];
            Object.assign(this.blog, blog);
            var ix = blogsData.indexOf(blog);
            this.prev = blogsData[ix - 1];
            this.next = blogsData[ix + 1];
        },
        set prev(blog) {
            var id = blog && blog.id;
            var prevNode = this.prevNode;
            if (id) {
                prevNode.href = "#" + id;
            }
            prevNode.style.display = !!id ? "inline" : "none";
        },
        set next(blog) {
            var id = blog && blog.id;
            var nextNode = this.nextNode;
            if (id) {
                nextNode.href = "#" + id;
            }
            nextNode.style.display = !!id ? "inline" : "none";
        }
    });

});