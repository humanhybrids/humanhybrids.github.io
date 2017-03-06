
var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer((req, res) => {
    var fn = path.normalize(req.url).substring(1);
    try {
        if (!fs.existsSync(fn) || fs.statSync(fn).isDirectory()) {
            fn += (fn.length ? path.sep : '') + "index.html";
            if (!fs.existsSync(fn))
                throw fn;
        }
        fs.readFile(fn, (err, data) => res.end(data));
    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        res.end(`File not found: '${req.url}'`);
    }
});
server.listen(8000);
