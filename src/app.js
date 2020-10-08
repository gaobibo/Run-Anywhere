console.log("hello world");

var express = require('express');
var app = express();
var serv = require('http').Server(app);
 
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/Login_MAIN.html');
});

app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");
 
 
