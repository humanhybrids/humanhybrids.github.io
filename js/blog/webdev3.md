
All HTML elements have four components that determine its layout on the page:

1. Contents
2. Padding
3. Border
4. Margin

# Illustration

Here is an illustration of each of the components.

<style>
    .margin, .margin span {
        display: block;
        padding: 1em 2em 2em 2em;
        text-align: center;
    }

    .margin {
        background-color: lightblue;
    }

    .border {
        background-color: black;
        color: white;
    }

    .padding {
        background-color: limegreen;
    }

    .content {
        background-color: white;
        color: black;
        padding-bottom: 1em;
    }
</style>

<span class="margin">
    Margin
    <span class="border">
        Border
        <span class="padding">
            Padding
            <span class="content">Content</span>
        </span>
    </span>
</span>

# Examples

## Sibling elements

Each of the following elements has 10 pixel margin, a 2 pixel solid black border, and a 5 pixel padding.

<style>
.example {
    margin: 10px;
    border: 2px solid black;
    padding: 5px;
}
</style>

<span class="example">First</span>
<span class="example">Second</span>
<span class="example">Third</span>

## Nested elements

The box model applies to all elements on the page, even nested ones.

<span style="padding: 10px; margin: 2px; border: 1px solid black;">
    <span style="margin: 5px; border: 1px inset green; padding: 5px;">Left</span>
    <span style="margin: 5px; border: 1px outset red; padding: 10px;">Right</span>
</span>

Here the outer element has a padding of 10px and the inner elements have a margin of 5px.
This is an example of [margin collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
and is just one of the wonderful quirks of web development.

<script>
</script>