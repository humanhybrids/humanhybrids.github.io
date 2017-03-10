var express = require("express");
var cfenv = require("cfenv");
var bodyParser = require("body-parser");
var vcapLocal = require("./vcap-local.json");
var env = cfenv.getAppEnv({ vcap: vcapLocal });

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const DBNAME = "comments";
var db;

if (env.services["cloudantNoSQLDB"]) {
    var cloudant = require("cloudant")(env.services["cloudantNoSQLDB"][0].credentials);
    cloudant.db.create(DBNAME, function (err) {
        if (!err) {
            console.log(`Database created: ${DBNAME}.`);
        }
    });
    db = cloudant.db.use(DBNAME);
}

app.get("/api/comments", function (req, res) {
    var comments = [];
    if (!db) {
        return res.json(comments);
    }
    db.list({ include_docs: true }, function (err, body) {
        if (!err) {
            for (var comment of body.rows) {
                comments.push({ name: comment.doc.name, text: comment.doc.text });
            }
            res.json(comments);
        }
    });
});

app.post("/api/comments", function (req, res) {
    if (db) {
        db.insert(req.body, function (err, body) {
            if (err) {
                console.warn(`[db.insert] ${err.message}`);
            }
            res.json(req.body);
        });
    }
});

app.delete("/api/comments", function (req, res) {

});

app.get("/", function (req, res) {
    res.send("Application running!");
});

var port = process.env.PORT || 3000
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
