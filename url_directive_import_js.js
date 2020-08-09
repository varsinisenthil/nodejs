// Use of URL directive and import from another JS file
var http = require('http');
// Imported another JS file
var dt = require('./importjs');
var url = require('url');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.write(txt);
  // Read from Imported JS file
  res.write("The date and time are currently: " + dt.myDateTime());
  res.write(req.url);
  res.end(txt);
  res.end();
}).listen(8080);