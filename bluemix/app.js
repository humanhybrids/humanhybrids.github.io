var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var srv = require("http").createServer(app);
var io = require("socket.io")(srv);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var rules = [];

app.get("/api/rules", function(req, res) {
    res.json(rules);
})

app.post("/api/rules", function (req, res) {
    rules.push(req.body);
    io.emit("rule", req.body);
    res.write(req.body);
});

app.delete("/api/rules/:id", function(req, res) {
    var deleted = rules.splice(req.params.id, 1);
    res.json(deleted);
});

io.on("connection", function (socket) {
    socket.on("chat", msg => io.emit("chat", msg));
});

app.use(express.static(__dirname + "/../"));

var port = process.env.PORT || 3000
srv.listen(port);
