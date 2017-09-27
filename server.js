var express = require('express');
var app = express();
var router = express.Router({caseSensitive: true});

var PORT = 4000;

// ENABLE CORS
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.head("/", function(req, res, next) {
    res.headers = req.headers;
    res.header("max-age", "0");
    res.send();
});

router.get("/", function(req, res, next) {
    res.send('Hello World!');
});

router.get("/hello.world", function(req, res, next) {
    var json = {
        blabla: 'good'
    };
    res.send(JSON.stringify(json));
});

router.get("/weather", function(req, res, next) {
    var json = {
        weather: 'good'
    };
    // res.send('{ "id": "' + req.params.id + '"}');
    res.send(JSON.stringify(json));
});

router.get("/Weather", function(req, res, next) {
    var json = {
        weather: 'bad'
    };
    // res.send('{ "id": "' + req.params.id + '"}');
    res.send(json);
});

app.get("/sensor/:id", function(req, res, next) {
    var json = {
        id: req.params.id,
        name: 'Allgemein',
        values: [90,88,87,95,92,85,84,20,22,21,22,22,22,19,21,30,33,45,62,59,58,72,82,85,87,90,91,90,91,92]
    };
    res.send(JSON.stringify(json));
});


app.use(router);
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
});