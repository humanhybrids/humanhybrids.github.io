Here is a quick overview of what Node's package manager can do.

## npm init

This will prompt you for values and create your *package.json* for you. *package.json* is how npm manages your project's 
dependencies so that you don't have to pack your dependencies with your code. When another person runs 
*npm install {your-package}* it will also install any dependencies listed in *package.json*.

## npm install

 ```
> npm install {package}
 ```

Installs the package provided as an argument to the node_modules folder so that 
it can be loaded by Node via ```require('{package}')```.

### --save

```
> npm install --save {package}
```
 
Save the installed package as a dependency in *package.json*
 
### --save-dev

```
> npm install --save-dev {package}
```

Save the installed package as a development dependency. This can be useful for builders, transpilers, etc. 
that are only necessary if the code is changed.

### -g

```
> npm install -g {package}
```

Installs the package globally such that any bin exports are available on the PATH for your system (see [link](#npmlink)).

## npm uninstall

```
> npm uninstall {package}
```

Uninstalls the package. Accepts the same flags as the install option.

### --save

```
> npm uninstall --save {package}
```

Uninstalls the package and removes the dependency from *package.json*.

## npm list

Prints a dependency tree with names and versions for all installed packages.

## npm version

```
> npm version {major|minor|patch}
```

Updates the package version in *package.json* and commits the new version.

## npm link

Creates links to scripts in the current package to the system PATH to access them from the command line
as utilities. This is performed when someone installs your package with the -g option.

### Create an executable Node.js script

The first line is a system agnostic string to locate the node executable to run the script.
The rest of the script is run line-by-line as if you had executed via node.

*examplecli.js*
```JavaScript
#! /usr/bin/env node

// get working directory
var cwd = process.cwd()

// get args
var args = process.argv;
```

### Update *bin* in *package.json*

The bin option can be a string or object. The string value should be the
path relative to *package.json* of the executable Node.js script. In this case,
the name of the executable is the name of the current package. The object value
should be a map where the keys are the names of the executables that are created
and the values are the relative paths to the Node.js scripts.

*package.json*
```json
{
  ...
  "bin": {
    "example-cli": "./examplecli.js"
  }
}
```

### Link the script to the system PATH

```
> npm link
```

### Use the new executable from the system shell

```sh
> example-cli --help
```

This should generate the same output as 

```
> node ./examplecli.js
```
