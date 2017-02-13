
<style>
    #style-this {
        color: blue;
        background-color: orange;
    }

    .style-these {
        border: 1px solid black;
        margin: 2px;
    }
</style>

# Basics

Cascading Style Sheets (CSS) is the paintbrush of web development. It can make your page look beautiful, but 
it can also be a pain point when it isn't behaving the way that you would expect it to (I'm no fan of 
painting so the analogy holds well for me).

## Where to put your CSS

CSS can be applied to elements of your page in one of three places:

1. As a value of the style attribute of the target element:

    ```html
    <span style="font-weight: bold; font-size: 0.8em">This is styled differently.</span>
    ```

    <span style="font-weight: bold; font-size: 0.8em">This is styled differently.</span>

2. In a `<style>` tag on the page:

    ```html
    <style>
    #style-this {
        color: blue;
        background-color: orange;
    }
    </style>
    <span id="style-this">Any color association is purely coincidental.</span>
    ```
    
    <span id="style-this">Any color association is purely coincidental.</span>

3. In a separate CSS file:

    in *styles.css*
    ```css
    .style-these {
        border: 1px solid black;
        margin: 2px;
        padding: 2px;
    }
    ```

    in *index.html*
    ```html
    <link href="file.css" rel="stylesheet">
    <span class="style-these">One</span>
    <span class="style-these">Two</span>
    ```

    <span class="style-these">One</span>
    <span class="style-these">Two</span>

## Selectors

For option 1 under *Where to put your CSS* the style rules are directy applied to the 
element they are defined on. For the other two options **selectors** are used to define
which elements the style rules are applied to.

In the example for option 2 above uses the id selector (#). `#style-this { ... }` will 
select the element on the page having an id attribute with the value "style-this" (e.g.
`<span id="style-this">stylo</span>`). 
