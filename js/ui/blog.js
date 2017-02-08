
define([
    "moment",
    "showdown",

    "compose",
    "layout/BaseElement",
    "layout/TemplateElement",

    "json!data/blogs.json",
    "text!./templates/blog.html",
    "text!./templates/blognavlist.html"
], function (moment, showdown, compose, BaseElement, TemplateElement,
    blogsData, template, navListTemplate) {

        var converter = new showdown.Converter();

        var blogs = blogsData.reduce(function (previousValue, currentValue) {
            previousValue[currentValue.id] = currentValue;
            return previousValue;
        }, {});

        var NavList = compose.element("cmc-nav-list", TemplateElement, {
            templateString: navListTemplate,
            createdCallback: function () {
                this.inherited(arguments);
                this.clear();
            },
            get currentList() {
                return this.stack[this.stack.length - 1];
            },
            pushList: function () {
                var li = document.createElement("li");
                var list = document.createElement("ul");
                li.appendChild(list);
                this.currentList.appendChild(li);
                this.stack.push(list);
                return list;
            },
            popList: function () {
                return this.stack.pop();
            },
            push: function (contents) {
                var item = document.createElement("li");
                item.appendChild(contents);
                this.currentList.appendChild(item);
            },
            set nodes(nodes) {
                this.clear();
                var lastTag = "H1";
                nodes.forEach(function (node) {
                    if (lastTag < node.tagName) {
                        this.pushList();
                    } else if (lastTag > node.tagName) {
                        this.popList();
                    }
                    this.push(Object.assign(document.createElement("a"), {
                        innerHTML: node.innerHTML,
                        onclick: function () { window.scroll(0, node.offsetTop); }
                    }));
                    lastTag = node.tagName;
                }, this);
            },
            clear: function () {
                while (this.list.firstChild) {
                    this.list.removeChild(this.list.firstChild);
                }
                this.stack = [this.list];
            }
        });

        return compose.element("cmc-blog", TemplateElement, {
            templateString: template,
            createdCallback: function () {
                this.inherited(arguments);
                window.addEventListener("hashchange", this.getPage.bind(this));
                var list = this.navNode;
                window.addEventListener("scroll", function() {
                    list.classList.toggle("sticky", (window.scrollY + 20) > list.offsetTop);
                });
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
            _updateNavigation: function () {
                this.navNode.nodes = this.contentNode.querySelectorAll("h1,h2,h3,h4,h5,h6");
            },
            set prev(blog) {
                this._setLinkAttr(blog, this.prevLinkNode, this.prevNameNode);
            },
            set next(blog) {
                this._setLinkAttr(blog, this.nextLinkNode, this.nextNameNode);
            },
            set id(value) {
                this._id = value;
                var _this = this;
                var contentNode = this.contentNode;
                require(["text!blog/" + value + ".md"], function (text) {
                    contentNode.innerHTML = converter.makeHtml(text);
                    _this._updateNavigation();
                }, function (err) {
                    contentNode.innerHTML = "<p>Sorry, unable to load content for some reason.</p>"
                    _this._updateNavigation();
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