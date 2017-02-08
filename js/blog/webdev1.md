
## Basics

While not a programming language in and of itself HyperText Markup Language (HTML) is very powerful for the display
and format of visual information. HTML format is based off of the eXtensible Markup Language (XML) so those familiar with 
XML will notice the similarities in syntax. However, unlike XML, the the element names (or tag names) are defined by the 
specification and only certains elements are valid.

The structure of HTML is comprised of elements that have a tag name enclosed in angle brackets (e.g. `<a>`). The element can have 
zero or more attributes: `<a href="http://corycook.github.io">`. Here "href" is the attribute and "http://corycook.github.io" 
is the attribute's value. An element also has contents and its closing tag: `<b>Cory Cook</b>`. An element's contents can be text or child
elements. The closing tag is required in most cases (except in [void elements](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element)).
The contents of a tag can span multiple lines; however, whitespace in the HTML file is ignored by the browser. So, only a single 
space will render to the screen (as a text node) and all extra spaces are thrown out.

The following code snippet represents the basic structure of a complete web page in HTML, we'll call this file **link.html**.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Link to Home</title>
    </head>
    <body>
        <a href="http://corycook.github.io">Home Page</a>
    </body>
</html>
```

If open this file directly in the browser and you will see something similar to this:

[Home Page](http://corycook.github.io)

The first line `<!DOCTYPE html>` identifies the type and parameters of the document. It was greatly simplified in HTML5 since the 
parameters identified here had little meaning to neither the developer nor the user. Its primary purpose now it to differentiate
the document from an XML document (although the file extension does this well).

The `<html>` element represents the entire document; it should only have `<head>` and `<body>` as child elements.

The `<head>` is for supporting information that you don't want rendered to the page. The `<title>` is a "required" element 
(in quotes since the page will still load without it). Practically, the `<title>` sets the text for the browser tab. The `<head>`
can also contain the `<link>`, `<script>`, `<style>`, and `<meta>` elements. More on those elements later.

The `<body>` is the portion on the page that the user interacts with upon visiting. This is where you will put
all of the text, links, images, and other content that you want to be visible to the user. 

## How do I...

In this section I will cover several things that you may want to make or do on a web page and 
how to accomplish that with HTML.

### ... link to another page?

Creating a link to another page can be done with an anchor tag `<a>`.

```html
<a href="./nextpage.html">Next Page</a>
```

> <a href="nextpage.html">Next Page</a>

The "href" attribute tells the anchor which page should open when the link is clicked.
The contents of the anchor will be made clickable. In this case the text is highlighted 
to indicate that it is a link to another page. The value of the href attribute can be a 
relative path to another page on the same site or an absolute path 
(e.g. http://corycook.github.io/nextpage.html).

### ... show an image?

In order to show an image on a web page the image must be available online. It should be hosted 
with your html page or by another provider. You can then use the `<img>` tag to display the image
on your page.

```html
<img src="/assets/CCLogo.svg">
```

> <img src="/assets/CCLogo.svg" style="width:50px;">

The "src" attribute is the full or relative path to the image file.

### ... add line breaks?

White space is ignored by the browser so all of your text will be bunched up together in one big blob
unless you use HTML to break up your paragraphs. HTML is pretty good at wrapping your text content to the 
next line if there isn't enough room for it on the page so you don't need to worry about that. However,
each of your paragraphs will need to be wrapped in a `<p>` paragraph element.

```html
<p>This is the first paragraph of my page.</p><p>This is the second.</p>
```

> <p>This is the first paragraph of my page.</p><p>This is the second.</p>

Notice that there doesn't need to be any returns in the code itself. How the HTML looks has
little to do with how the page is presented.

If you need to break a line without actually starting a new paragraph you can use the 
break `<br>` element.

```html
<p>This is broken<br>for dramatic effect!</p>
```

> <p>This is broken<br>for dramatic effect!</p>

### ... emphasize text?

HTML has elements that allow you to emphasize `<em>`, italicize `<i>`, make bold `<b>` 
(or `<strong>`), and underline `<u>` text.

```html
Use your <em>best</em> <b>judgement</b> when <u>emphasizing</u> <i>text</i>.
```

Use your <em>best</em> <b>judgement</b> when <u>emphasizing</u> <i>text</i>.

You might say "`<em>` and `<i>` look exactly the same!" Well, that's because they do.
HTML5 has quite a few elements that do the exact same thing, technically, but they 
have different semantic meaning. You might use `<em>` when using textual emphasis 
and reserve `<i>` for names of books.
