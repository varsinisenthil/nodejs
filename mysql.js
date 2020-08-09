// Import Mysql
var mysql = require('mysql');
// Create Connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Varsini123!",
});
// Querying
// Creating a DB
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mytestdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    });
});
 var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Varsini123!",
  database: "mytestdb"
});
 // Creating a table
  var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });
// Inserting values
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
// Getting Insertid
  var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
    console.log(`Changed ${result.changedRows} row(s)`);
    });

