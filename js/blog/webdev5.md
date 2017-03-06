# Intro

JavaScript ECMAScript 2015 (ES2015) is the (not so) latest implementation of the ES2015 standard. 
It was recently renamed to ES2015 (from ES6) to pressure browsers to more quickly integrate its 
functionality into their environments. There is a newer standard ES2016; however, 
since browsers still haven't fully implemented ES2015, we will hold off on discussing that for now.

# Features

There are many new features added to JavaScript in ES2015 including:

- block scoping
- constant variables
- rest argument aggregation
- spread arguments
- object and array destructuring
- classes
- arrow functions

## Block scoping

JavaScript's scoping rules are very different compared to other modern programming languages.
Consider the following example:

```JavaScript
function testfn(val2) {
    if (true) {
        var val2 = "blocked";
    }
    console.log(val);
    console.log(val2);
}

testfn("not");
var val = "global";
testfn("fun");
```

The output of the above code may surprise you:

```
> undefined
> blocked
> global
> blocked
```

JavaScript will throw an error if you try to access a variable that is not defined; however, if a variable is *eventually*
defined in scope then it will act as if you had declared it before hand without assigning a value (`val == undefined`). This
is called [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting). All variables declared are 
declared in the compile phase of JS execution for the current scope and assigned during the execution phase.

To better control variable scope ES2015 has added the [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
keyword that you can use instead of `var`. `let` allows you to declare a variable that is only visible to the current block
and only accessible after it is declared. Let's examine the previous example with let instead of var:

```JavaScript
function testfn(val2) {
    if (true) {
        let val2 = "blocked";
    }
    console.log(val);
    console.log(val2);
}

testfn("not");
var val = "global";
testfn("fun");
```

This now outputs:

```
> undefined
> not
> global
> fun
```

`val2` is now defined in the block scope rather than overwriting the function scoped `val2`. Changing `var val` to `let val` would throw
an exception since val is not defined at the first call to `testfn()`.

## Constant variables

ES2015 has also added the `const` keyword used similarly to the new `let` keyword except that it requires an initial assignment 
and it cannot be reassigned after its initialization.

```JavaScript
const global = { name: "globalVal" };
global.name = "changed!"; // allowed
global = { name: "changed!" }; // throws error
```

## Rest Operator ...

The rest operator gives us a way to aggregate the remaining arguments passed into a function into a single array:

```JavaScript
// sets the value of the property for all objects passed
function set(key, value, ...objects) {
    objects.forEach(function(obj) {
        obj[key] = value;
    });
}
var a = [1, 2, 3];
var b = [1, 2];
var c = ['a', 'b', 3];
set("length", 0, a, b, c);
```

The set method will set the `key` property on the object to the `value` passed. Used in this way it empties all of the arrays passed
in by setting their lengths to zero.

## The Spread Operator ...

The spread operator is the companion to the rest operator. Instead of aggregating arguments into an array, is spreads an array out and 
uses the array values as arguments to the function that is called:

```JavaScript
function reverse(a, ...args) {
    if (args.length)
        reverse(...args);
    console.log(a);
}
reverse(1, 2, 3); // 3 2 1
```

This will print the arguments passed in reverse order. Here we are expanding the `args` array to extract the first value.

We can also use the spread operator to combine arrays:

```JavaScript
var a = [1, 2, 3];
var b = ['a', 'b', 'c'];
console.log([...a, ...b]); // [1, 2, 3, 'a', 'b', 'c']
```

This exands the array values as arguments to the new array initialization.

## Object Destructuring

Object destructuring is one of the most unusual new features in ES2015; however, it allows for much more 
succinct and clear JS code when used properly. Let's start by examining some of the issues with ES5
that object destructuring aims to resolve.

Here we have a constructor that we want to initialize with some data.

```JavaScript
function Widget(text, link, data) {
    this.text = text || "";
    this.link = link;
    this.id = data && data.id || -1;
    this.name = data && data.name || "placeholder";
}
var w = new Widget();
```

Here we want to check if `text` is null (falsy) and if it is then use an empty string default value. Similarly, 
the data object passed in may have id and name properties that we want to copy to this instance or use a default
value. Code like this is very common in JavaScript ES5. So let's look at the ES2015 alternative with object destructuring:

```JavaScript
function Widget({ text = "", link, data: { id = -1, name = "placeholder" } = { } } = { }) {
    this.text = text;
    this.link = link;
    this.id = id;
    this.name = name;
}
var w = new Widget();
```

Object destructuring has handled extraction of the data and assigning of default values in the cases when the values 
cannot be resolved. Now, it is much more clear that all of the logic in the ES5 implementation was just for input resolution.

Now that we know why we would want object destructuring, let's examine the syntax:

### Property Extraction

```JavaScript
let { text } = { text: "Hello World!" };
console.log(text); // "Hello World!"
```

First, we need `let` or `var` to show that we are declaring new variables using object destructuring. This was not necessary 
in the previous example since we were using object destructuring in a function declaration (where the variables are defined 
for the function). For these examples we will use the functionality in a simple statement. Next, we need braces on the left hand
side of the assignment operator to show that we want to use object destructuring on the argument on the right hand side of the operator.
Inside the braces we put a comma delimited list of properties we want to extract from the object. Here we define the `text` variable
and assign it the value of the `text` property in the object.

### Retargeting

Suppose you want to extract a value from the object but you want to assign it to a variable with a different name. We can use the 
retargeting syntax of object destructuring:

```JavaScript
let { message: text } = { message: "Hello World!" };
console.log(text); // Hello World!
```

Here we extract the `message` property of the object and assign it to the new `text` variable.

You can also retarget to another destructuring operator:

```JavaScript
let { message: { text } } = { message: { text: "page not found", code: 404 } };
console.log(text); // page not found
```

### Default Values

Object destructuring is very useful for exctracting properties from objects; however, JavaScript objects are often 
volatile and sometimes the properties that you are trying to extract will be undefined. To handle these situations 
we can use default arguments.

```JavaScript
let { message = "everything is okay" } = { notMessage: "this is not message" };
console.log(message); // everything is okay
```

Without the default argument message would be just be undefined; however, if we look at the retargeting example:

```JavaScript
let { message: { text } } = { errorMessage: { text: "page not found", code: 404 } }; // error
console.log(text);
```

Since `message` was changed to `errorMessage` this code throws an error. To prevent an error we can provide an empty object
as a default argument for message.

```JavaScript
let { message: { text } = { } } = { errorMessage: { text: "page not found", code: 404 } };
console.log(text); // undefined
```

Now, if we wanted to provide a default value for text we have a couple of options:

1. include it in the default object for message: `{ message: { text } = { text: "default text" } }`
2. add a default argument to text directly: `{ message: { text = "default text" } = { } }`

Note that these options aren't exactly the same. In the first option `text` will only have a defauly value if `message` is not 
a property on the target object; whereas, the second option will also have a default value if `message` is defined but does not
have a `text` property.

## Array Destructuring

Array destructuring has a syntax similar to object destructuring:

```JavaScript
let [x, y] = [1, 2];
console.log(y, x); // 2 1
```

The primary difference being that the object braces `{` and `}` are replaced with square backets `[` and `]`. Array destructuring 
pulls out the values by their index.

### Retargeting

Array destructuring has no retargetting syntax since the values in the source are not named; however, you can 
use object destructuring in the array destructuring operator:

```JavaScript
let [{ value: x }, { value: y }] = [{ value: 1 }, { value: 2 }];
console.log(x, y); // 1 2
```

### Omitting Values

When you use a regular expression `exec` in JavaScript it returns an array with the zero index being the complete match; however, 
if you used grouping in the expression then you may not care about the complete match. When using array destructuring we don't need
to provide a target for every value. We can extract only the values we need to use:

```JavaScript
var [ ,name] = /require\(["'](\w+)["']\)/.exec("require('webcomponents');");
console.log(name); // webcomponents
```

Since the first match will be `require('webcomponents')` and we only care about the string value inside we can ignore the 
first value by providing a blank in the comma-delimited destructuring array.

### Rest Operator

We can use the rest operator in conjunction with array destructuring to put all remaining values into an array:

```JavaScript
var vals = [1, 2, 3, 4, 5];
while (vals.length) {
    let a;
    [a, ...vals] = vals;
    console.log(a);
}
console.log(vals); // []
```

This empties the `vals` array and prints the values sequentially.

## Classes

The classes added in ES2015 greatly simplify the syntax required to create object prototypes in JavaScript.
Here is the ES5 syntax for creating a type:

```JavaScript
function List(items) {
    Widget.call(this);
    this.items = items || [ ];
    this.initialize();
}

List.prototype = Object.create(Widget.prototype);
List.prototype.initialize = function() {
    this.items.forEach(function(item) {
        this.node.add(item);
    }, this);
}
```

This requires some auxilary knowledge:

1. Functions can double as object constructors.
1. You need to call the super class constructor and methods directly from the implementing prototype.
1. You need to set the constructor's prototype to add methods to the type.
1. You need to create an instance of the prototype that you want to inherit (with `Object.create()` or `new`).

Admittedly, this is something most people learn early on; however, it isn't very intuitive. Especially if you have experience with
traditional object oriented programming languages.

ES2015 gives us a more natural interface for creating types:

```JavaScript
class List extends Widget {
    constructor({ items = [] }) {
        super();
        this.items = items;
        this.initialize();
    }
    initialize() {
        this.items.forEach(item => this.node.add(item));
    }
}
```

If you compare the ES5 code with the ES2015 code you should find that the new syntax is much easier to read and understand.

## Arrow functions

In JavaScript, every function has its own scope, arguments, and this argument; however, there are a lot of times where we 
want to inherit this information from the parent scope. Let's consider a common example in ES5:

```JavaScript
function List() {
    Widget.call(this);
    this.items = [];

    function clickHandler(e) {
        var value = this.input.value;
        this.items.push(value);
        this.node.add(value);
    }

    this.button.addEventListener("click", clickHandler.bind(this));
}
```

We want to listen for the click event on the button and add an item to the list based on some user input. 
We add an event listener to the button's click event, but the handler function needs to be bound to set the 
this argument properly. Now in ES2015 we can use arrow functions:

```JavaScript
class List extends Widget {
    constructor() {
        super();
        this.items = [];
        this.button.addEventListener("click", (e) => {
            let value = this.input.value;
            this.items.push(value);
            this.node.add(value);
        });
    }
}
```

The arrow function is only block scoped, does not set its own `this` argument, and does not have its own `arguments` special object.
This allows us to use the `this` argument from its containing scope without binding.

The basic syntax is parenthetical-encapsulated, comma-delimited args, the arrow `=>`, and a single statement or block. If 
the arrow points at a statement then the return result of the statement is automatically returned by the arrow function:

```JavaScript
var add = (a, b) => a + b;
console.log(add(10, 11)); // 21
```

If the arrow points at a block you can use the `return` keyword to return a value, just like a full function.
