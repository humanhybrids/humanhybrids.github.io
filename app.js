
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
