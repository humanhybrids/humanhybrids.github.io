
While not a programming language in and of itself HyperText Markup Language (HTML) is very powerful for the display
and format of visual information. HTML format is based off of the eXtensible Markup Language (XML) so those familiar with 
XML will notice the similarities in syntax. However, unlike XML, the the element names (or tag names) are defined by the 
specification and only certains elements are valid.

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

You could open this file directly in the browser and you would see something similar to this:

[Home Page](http://corycook.github.io)

The first line `<!DOCTYPE html>` identifies the type and parameters of the document. It was greatly simplified in HTML5 since the 
parameters identified here had little meaning to neither the developer nor the user. Its primary purpose now it to differentiate
the document from an XML document (although the file extension does this well).

The `<html>` element represents the entire document; it should only have `<head>` and `<body>` as child elements.

The first sibling in the next level `<head>` is for supporting information that you don't want rendered to the page.
The `<title>` element is considered a required element in the head section. `<title>` sets the information displayed in the browser 
tab for the page.
