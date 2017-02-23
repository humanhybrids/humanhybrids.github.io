
define([
    "moment",

    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",

    "json!data/blogs.json",
    "text!./templates/bloglistitem.html"
], function (moment, compose, BaseElement, TemplateElement, data, blogListItemTemplate) {

    var BlogListItem = compose.element("cmc-blog-list-item", TemplateElement, {
        templateString: blogListItemTemplate,
        set id(value) {
            this.linkNode.href = "/blog.html#" + value;
        },
        set name(value) {
            this.nameNode.innerHTML = value;
        },
        set created(date) {
            this.dateNode.innerHTML = moment(date.value, date.format).fromNow();
        },
        set abstract(value) {
            this.descriptionNode.innerHTML = value;
        }
    });

    return compose.element("cmc-blog-list", BaseElement, {
        createdCallback() {
            this.style.display = "flex";
            this.style.flexWrap = "wrap";
            data.slice().reverse().forEach(function (blog) {
                this.root.appendChild(new BlogListItem(blog));
            }, this);
        }
    });

});
