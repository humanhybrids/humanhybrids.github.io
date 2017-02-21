# Intro

JavaScript is a scripting language with Java-like syntax (hence the name). I'll target this 
post on those already familiar with C++ or Java. JavaScript is famous for being the 
programming language of the web; however, it is also used for other applications (e.g. Node.js).

Let's compare and contrast Java and JavaScript.

# Java Similarities

JavaScript has many of the same constructs as Java with similar syntax including:

- if/else if/else

    ```JavaScript
    if (condition) {
        // do something
    } else if (otherCondition) {
        // do something else
    } else {
        // do something else else
    }
    ```

- for loops

    ```JavaScript
    for (var i = 0; i < 10; i++) {
        // do something
    }
    ```

- try/catch

    ```JavaScript
    try {
        throw "error";
    } catch (e) {
        // handle error
    }
    ```

# Java Differences

JavaScript has no main() function entry point the way that C++ or Java has; instead, 
JavaScript source code is executed line by line by the interpreter.

## Variables

All variables in JavaScript are dynamically typed. You don't need to
explicitly set the type as you would in C++ or Java. 

There are very few primitive types in JavaScript:

- Boolean
- Null
- Undefined
- Number
- String

```JavaScript
var boolean = true;
var nil = null;
var undef;
var number = 5.1;
var string = "a string";
```

Notice that none of the variables defined above need to have any type information.
They all use the `var` keyword to define. Also, even after a variable has been assigned 
it can be reassigned to a value of any type. So, there is no type safety in JavaScript.

## Objects

Much like Java, everything in JavaScript is a JavaScript Object. Here is the most basic 
object initialization:

```JavaScript
var instance = {
    key: "value"
};
```

Objects and Arrays can be nested during initialization: 

```JavaScript
var instance = {
    nestedArray: [
        {
            name: "first"
        },
        {
            name: "second"
        }
    ],
    nestedObject: {
        key: "value"
    }
}
```

This is also an example of array initialization using square backets `[]`.

## Functions

Functions are the "meat and potatoes" of JavaScript programming. Functions in JavaScript are first-class objects, 
meaning that they behave the way that you would expect any other object instance to behave. You can set them to a 
variable, pass them to and return them from functions, and destroy them. They have several purposes:

1. singular functions
2. type constructors
3. scoping mechanisms

### Singular Functions

```JavaScript
// singular function
function add(a, b) {
    return a + b;
}
```

As singular functions you can execute the function and capture the result:

```JavaScript
var eight = add(5, 3);
```

Functions are often passed as arguments to other functions to provide a callback
for asynchronous operations. Assume we have an asynchronous function that accepts
a callback function as an argument. We will call it "getData(callback)" and pretend that it
retrieves data from the server and passes it to the callback function as an argument.

There are a few ways you can pass a function to getData:

- You define the function with a name 

    ```JavaScript
    function callbackFn(data) { /* consume data */ }
    getData(callbackFn);
    ```

- you can define an anonymous function and assign it to a variable

    ```JavaScript
    var callbackFn = function(data) {
        // consume data
    };
    getData(callbackFn);
    ```

- you can pass an anonymous function directly as the argument to the function

    ```JavaScript
    getData(function(data) {
        // consume data
    });
    ```

### Type Constructor

JavaScript 

```JavaScript
// type constructor
function Car(year, make, model) {
    this.year = year;
    this.make = make;
    this.model = model;
}

var car = new Car(1990, "Toyota", "Tercel");
```

### Scoping Mechanism

You can use an anonymous function to prevent local variables from being
defined in the global scope. This is helpful to prevent unusual behavior
or overwriting existing global variables.

```JavaScript
// scoping mechanism
var global;
(function() {
    var not_global;
})();
```

## Scoping

This seems like a good time to mention scoping in JavaScript.

JavaScript has only the global scope (window for browsers) and function scope.
The primary difference is that there is no block scoping. 

```JavaScript

var global = 1;
var result = "test";

(function() {
    console.log(result); // test
    var result = "important information!"
    if (true) {
        var result = "it's gone";
    }
    console.log(result); // it's gone
})();

console.log(result); // test
```

Even though `var result` is defined in the if block it is defined in the
function scope and overwrites any previous definitions in the same function.

### ES6 Block Scoping

In ES6, variables defined with `var` will behave as described in the previous
section, Scoping; however, ES6 adds the `let` keyword to JavaScript that allows for
block scoped variables. 

Presently, ES6 is not fully supported by modern browsers. If you want to use
new ES6 features you will need to make use of a transpiler and a shim library.

# Prototyping

JavaScript is not a functional language or an object oriented language. It is 
somewhere in between. It is a Prototypical language. You define object constructors
and object prototypes but the objects created are not bound to an interface. They 
are free to add additional instance-specific properties, members, and methods.

## Defining prototypes

Functions have a special "prototype" member that you can use to set the prototype
for objects created using that function as a constructor. We will use the example
from earlier:

```JavaScript
function Car(year, make, model) {
    this.year = year;
    this.make = make;
    this.model = model;
}
```

Now let's say we want to add a function to all Car objects to return a 
string representation of its attributes.

```JavaScript
Car.prototype = {
    getString: function() {
        return this.make + " " + this.model + " (" + this.year + ")";
    }
};
```

Now when we create a new Car with `var tt = new Car(1990, "Toyota", "Tercel")` we can
call `tt.getString()` which will return the string `"Toyota Tercel (1990)"`.

It is possible to add a function to the prototype after the prototype is defined
or even after instances are created and all instances of the type will inherit the
new functionality. However, functions added to instances of a class will not 
be visible to other instances of that type.

## Inheritance

Defining prototype is fun on its own, but it wouldn't be as useful if you weren't 
able to inherit the properties of other types. Let's examine an example:

```JavaScript
function User(name) {
    this.name = name;
    this.level = 0;
}
User.prototype = {
    isAllowed: function(level) {
        return this.level >= level;
    }
};

function AdminUser(name) {
    User.call(this, name);
    this.level = 2;
}
AdminUser.prototype = Object.create(User.prototype);

var basic = new User("Zanzibar");
var admin = new Admin("Rufio");

basic.isAllowed(1); // false
admin.isAllowed(1); // true
```

Here `AdminUser` inherits the `isAllowed` method from the `User` class.
Using the `call` method of the User constructor is calling 
the constructor of the super class and passing `this` object as the instance
to apply the constructor to. An alternative would be to use
`User.apply(this, arguments);` which would forward all parameters passed
to the `AdminUser` constructor to the `User` constructor.

## ES6 Prototyping

ES6 makes all of this easier by adding classes to JavaScript; however, it produces the same result
as using functions and prototypes. I'll cover ES6 in another post (maybe).
