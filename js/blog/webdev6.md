
ES2015 has many useful features and syntactic changes that can greatly 
alleviate JavaScript development and allow for clean and clear code; 
however, browser support for new language features is lacking. 
An application could run perfectly well on Chrome but not at all on
Firefox. If we want our applications to run on most of the available
platforms we need to write our code carefully to only use language 
features supported by our target platforms.

On the other hand, we could simply use a transpiler to change our 
fancy, new code into old, compatible code. There are several transpilers
available to help convert ES6 code to equivalent browser-compatible code, 
but this article will focus on the Babel transpiler and its requirements.

# Node.js

According to the [Node.js website](https://nodejs.org/en/):

    Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
    Node.js uses an event-driven, non-blocking I/O model that makes it 
    lightweight and efficient. Node.js' package ecosystem, npm, is the 
    largest ecosystem of open source libraries in the world.

This makes Node.js the perfect platform to write complex and efficient 
applications very quickly.

At this point in time, this page is hosted on GitHub pages which only supports
static content. So Python's "`python -m http.server`" is usually sufficient for
most development purposes; however, python's simple server does not support multiple
concurrent connections. In order to test the site on multiple browsers it is 
necessary to close one browser before opening another. To get around this slight 
annoyance, it is possible to implement a simple server in Node:

*app.js*
```JavaScript
var http = require("http");
var fs = require("fs");
var server = http.createServer((req, res) => {
    var fn = req.url.substring(1);
    try {
        if (!fs.existsSync(fn)) {
            throw null;
        }
        res.end(fs.readFileSync(fn));
    } catch (e) {
        res.statusCode = 404;
        res.end(`File not found: '${req.url}'`);
    }
});
server.listen(8000);
```

Once node is installed ([download here](https://nodejs.org/en/download/)) 
we can save the above code into a file and run that file with node (e.g. 
`node app.js`).

This will allow multiple concurrent connections and can be modified to match 
the behavior of your target server. For instance, if your target deployment 
environment is case sensitive or provides a fallback file (like index.html) 
then you could code that behavior into your test server.

Node provides built-in modules for things like file access and networking, and 
there are tools that allow you to package node apps into executables.
Node is more than just a server, it can be used to create complete native 
applications.

## npm

One of the biggest benefits of using node as your development platform is the
access to the Node Package Manager network (npm). npm is a bit different than 
other package managers in that it manages dependencies installed on a per
project basis rather than per machine storing the dependencies in a `package.json`
file. This way the installed modules don't need to be packaged with a project 
all necessary modules can be installed with the `npm` command line utility.

It is easy to publish new packages to npm so there are user-created packages on
anything that you would need for your application. Check out all of the available
packages at [npmjs.org](http://www.npmjs.org).

### init

The exact format of the `package.json` file can be difficult to remember and it 
can be annoying to have to check references every time. Luckily, there is a utility
built into `npm` that will provide a series of fields to build the `package.json`.

```
npm init
```

This will create `package.json` and populate common fields.

### install

To install a module find the name of the module and run "`npm install {module name}`"
on the command line. This will install the module to the local node_modules folder in the current project.

```
npm install jalex
```

### --save and --save-dev

Installing the module does not automatically add the module as a dependency of the 
current project. Once you have used the module in your code you have to add the 
module to the list of dependencies in `package.json`. If you know beforehand that 
the module will be a dependency of the project you may use the `--save` (`-S`) flag to
automatically add it to `package.json`. `--save` will add the module as a 
runtime dependency while `--save-dev` (`-D`) will add it as a development dependency.
This way modules that are only necessary for development (i.e. unit testing, 
building, etc.) do not have to be downloaded for only running the module. This 
only works if a `package.json` file exists so be sure to run "`npm init`" beforehand.

### -g

The `-g` flag may be used to install a module globally rather than directly to the 
project. This is similar to how other package installers, like pip, behave by default.

# Babel

Babel is a compiler that compiles JavaScript source code to a transformed 
JavaScript source code. Some call this "transpiling," but the process is 
very much the same as a compiler except that the target is symbolic code
rather than binary code.

"`npm install babel-cli`" will install the `babel` command line utility which 
can be run as "`babel {file}`".

```
npm install --save-dev babel-cli
```

However, Babel does not perform any transformations by default, it essentially
produces the same output as input. In order to perform the necessary transformations
you will need to install the babel plugins corresponding to the transformations 
that you wish to perform. Babel provides presets to simplify selection of plugins.
To translate ES2015 code to equivalent ES5 code we need the `babel-preset-env` preset.

```
npm install --save-dev babel-preset-env
```

This will install the babel preset for ES2015 to ES5 such that when the babel 
command line utility is run it will produce the transformed output.

This Babel utility only transforms syntax, but it does not provide missing 
utilities and interfaces from ES2015 (such as Promise). In order to have access to
these objects we need to use a polyfill. Babel provides a polyfill that can be 
installed via `npm`.

```
npm install --save-dev babel-polyfill
```

This will give you the polyfill.js file that needs to be loaded prior to any 
other JS code that may be dependent on these objects. It should be in 
node_modules/babel-polyfill/dist/

Now the babel command line utility can be run on each of the files that need
to be compiled to ES2015. 

# Gulp

If there are a lot of files that need to be compiled then it may take a long time 
to run the command line utility directly. It would be prudent to incorporate it 
into a build process. A common build utility for Node.js is Gulp. Gulp has a 
simple and powerful API that makes it easy to develop a build system using pure 
JavaScript.

Start by installing the gulp command line utility:

```
npm install -g gulp-cli
```

Then install the gulp module:

```
npm install --save-dev gulp
```

The `gulp-babel` plugin should be installed to use babel with Gulp:

```
npm install --save-dev gulp-babel
```

Gulp looks for a `gulpfile.js` file in the root of the project and
uses that for the build definitions.

*gulpfile.js*
```JavaScript
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("babel", function() {
    return gulp.src("js/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});
```

This defines a new gulp task called "babel" that will read all of
the JavaScript file (*.js) from the js directory and sub-directories (**), 
feed them to the babel plugin, and output the result into the dist folder.
This can then be run using the gulp cli: `gulp babel`.

## task

The task method interface accepts up to three arguments: 
1. the task name
2. -optional- array of tasks required to run before this one
3. -optional- function to run for this task

The task name provided at the command line will be run along with
any of its prerequisite tasks; however, if no task name is given 
then the default task is run.

```
gulp.task("default", ["babel"]);
```

## src

The src method accepts a string argument representing the files
to search for and outputs a readable stream. "**" in the path 
indicates recursive subfolders and "*" indicates wildcard search. 
All matching files will be streamed as output.

## dest

This is method accepts a directory name and returns a writable 
stream that will output files to the target directory. Used in 
conjunction with src the input directory structure can be maintained.

## watch

It is possible to watch for changes to particular files and run 
utilities when these files change:

*gulpfile.js*
```
var gulp = require("gulp");
var babel = require("gulp-babel");

function compile(src, dest) {
    gulp.src(src)
        .pipe(babel())
        .pipe(gulp.dest(dest));
}

gulp.task("babel", function() {
    var path = "js/**/*.js";
    var dest = "dist";
    compile(path, dest);
    gulp.watch(path, function(event) {
        compile(event.path, dest);
    });
});

gulp.task("default", ["babel"]);
```

This will compile all files then continue to watch the js/ 
folder for changes to any of the JavaScript files and 
run the compiler for any files that change. Since the babel
task has been mapped as a dependency of the default task 
we can begin watching by typing `gulp` at the command line.
