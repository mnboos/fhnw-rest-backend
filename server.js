var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var PythonShell = require('python-shell');

// ENABLE CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    bodyParser.json();
    next();
});

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
// app.use(bodyParser.text());
app.use(bodyParser.text({ type: '*/xml' }));
app.use(bodyParser.text({ type: 'text/*' }));


app.head("/", function(req, res, next) {
    res.headers = req.headers;
    res.header("max-age", "0");
    res.send();
});

app.get("/", function(req, res, next) {
    res.send('Hello World!');
});

app.post("/xml2json", function(req, res, next) {
    let result;
    let xml = req.body;
    if (xml) {
        res.setHeader('Content-Type', req.header('Content-Type'));
        result = processXml(xml, res);
    } else {
        res.setHeader('Content-Type', 'application/json');
        result = {'content-type': req.header('Content-Type'), 'error': 'content-type is not xml or text'};
    }
    // res.send(result);
});

function processXml(xml, res) {
    try {
        let pythonpath = process.env.PORT ? 'D:\\Python34\\python.exe' : 'c:\\python27\\python.exe';

        var options = {
            mode: 'text',
            pythonPath: pythonpath,
            pythonOptions: ['-u'],
            scriptPath: '',
            args: ['value1', 'value2', 'value3']
        };

    PythonShell.run('main.py', options, function (err) {
        if (err) throw err;
        console.log('finished');
        res.send("finished");
    });
    } catch (err) {
        res.send("executing python failed");
    }

    // const xsl = fs.readFileSync('./xml2json.xsl', {encoding: 'utf-8'});
    // console.log("xsl: ", xsl);
    // let outputXmlString = xslt(xml, xsl);
    // console.log("xml: ", outputXmlString);
}

app.get("/greet/:name", function(req, res, next) {
    res.send('Hello ' +req.params.name);
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