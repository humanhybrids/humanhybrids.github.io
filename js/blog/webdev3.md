
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

<div style="padding: 10px; margin: 2px; border: 1px solid black;">
    <div style="margin: 15px; border: 1px inset green; padding: 5px;">First</div><div style="margin: 15px; border: 1px outset red; padding: 10px;">Second</div>
</div>

Here the outer element has a padding of 10 pixels and the inner elements have a margin of 15 pixels.

# Margin collapse

The example above (Nested elements) is also an example of [margin collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing). 
Notice how the space between the outer box and the inner boxes is 25 pixels (10 px outer padding + 15 pixel inner margin) but the distance between the two inner boxes
is only 15 pixels. You would expect the distance to be 30 pixels, but the two margins are collapsed into a single margin of 15 pixels. The rule is that the larger 
margin between two siblings wins.

# Inline elements

Inline elements have padding and left and right margins; however, top and bottom margins are not applied to inline elements.

<div style="margin: 20px;">
    <span style="padding: 10px; margin: 2px; border: 1px solid black;">
        <span style="margin: 15px; border: 1px inset green; padding: 5px;">First</span><span style="margin: 15px; border: 1px outset red; padding: 10px;">Second</span>
    </span></div>

This example uses the same rules as the example above; however, these rules are applied to inline `<span>` elements rather than block `<div>` elements. Notice that
the top and bottom margins are ignored.
