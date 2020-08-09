// Imports
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection with new db created
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '******',
  database: 'restful_db'
});
 
//connect to database
conn.connect(function(err) {
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
// GET using query
// In postman http://localhost:3000/api/products/
app.get('/api/products',function(req, res)  {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, function(err, results) {
    if(err) throw err;
    // To get the result as JSON
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//getting single id from table 
// In postman http://localhost:3000/api/products/4
app.get('/api/products/:id',function(req, res) {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, function(err, results)  {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//insert query with POST request
// In postman http://localhost:3000/api/products/ (also param:values as ["product_name": "Product 6 Added", "product_price": 6000])
app.post('/api/products', function(req, res) {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,function(err, results)  {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Using PUT request updating the table
// In postman http://localhost:3000/api/products/2 Json as like before give the param and values
app.put('/api/products/:id', function(req, res)  {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, function(err, results)  {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//using Delete request deleting entries in table (similar to get api - done for single id)
// In postman http://localhost:3000/api/products/6
app.delete('/api/products/:id',function(req, res)  {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, function(err, results)  {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000, function() {
  console.log('Server started on port 3000...');
});