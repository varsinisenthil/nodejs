// express is imported
var express = require('express');
var router = express.Router();
var app = express();
// body-parser is imported
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// For root index.html is used 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// From index.html file, post action for submit-student-data route is used
app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName ;
    res.send(name + ' </br> ' + ' ' + req.body.type + ' Action Done Successfully!');
});
app.get('/submit-student-data', function (req, res) {
    res.send(' Submitted Successfully!');
});
var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
module.exports = router;