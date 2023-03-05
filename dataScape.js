var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// file upload
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    next();
});

// var port = 9423;
var port = process.env.port || 8085;
app.get('/', function (req, res) {
    console.log('login hit');
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/getEnv', function (req, res) {
    var obj = { webservicehost: process.env.webservicehost, webserviceport: '', protocol: process.env.protocol, envName: process.env.envName, datascapeweburl: process.env.datascapeweburl };
    res.json(obj);
});
app.get('/cloudStatus', function (req, res) {
    console.log('config route hit');
    res.sendFile(__dirname + '/public/templates/cloudStatus.html');
});
app.get('/onDemandReadAndConnectOrDiconnect', function (req, res) {
    console.log('config route hit');
    res.sendFile(__dirname + '/public/templates/onDemandReadAndConnectOrDiconnect.html');
});

var server = app.listen(port, function () {
    console.log('DataSCAPE Server Started at port %s', port);
});