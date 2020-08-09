var express = require('express');
var app = express();
// using middleware
// Here public folder created is used
app.use(express.static('public'));
// Inside public directory, index html file is used for root
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index" );
})
// Middleware function created
var a_middleware_function = function(req, res, next) {
  res.send("Middle WARE Fn Used");
  next(); // Call next() so Express will call the next middleware function in the chain.
}
// Middleware function invoked
app.use('/process_get', a_middleware_function);
// another function for same route process_get
app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})