// Routes
var express=require('express');
var app=express();
// jade template is used
app.set('view engine','jade');
app.get('/',function(req,res)
// index.html file is used here
// index.html is created inside views folder
{
res.render('index',
{title:'Routes',message:'Welcome'})
});
// Node Route 
app.route('/Node').get(function(req,res)
{
    res.send("Tutorial on Node");
});
// Angular Route
app.route('/Angular').get(function(req,res)
{
    res.send("Tutorial on Angular");
});
// test Route
app.get('/test',function(req,res){
    res.send('Welcome to Test Route');
})
var server=app.listen(3000,function() {});