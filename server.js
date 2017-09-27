var express = require('express');
var app = express();

// ENABLE CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.head("/", function(req, res, next) {
    res.headers = req.headers;
    res.header("max-age", "0");
    res.send();
});

app.get("/", function(req, res, next) {
    res.send('Hello World!');
});

app.get("/hello.world", function(req, res, next) {
    var json = {
        blabla: 'good'
    };
    res.send(JSON.stringify(json));
});

app.get("/weather", function(req, res, next) {
    var json = {
        weather: 'good'
    };
    // res.send('{ "id": "' + req.params.id + '"}');
    res.send(JSON.stringify(json));
});

app.get("/Weather", function(req, res, next) {
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


module.exports = app;

app.listen(process.env.PORT || 4000);