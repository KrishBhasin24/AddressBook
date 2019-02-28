var express = require('express');
var mysql = require('mysql');
var myConnection  = require('express-myconnection');
var config = require("./config");
var app = express();

var dbDetails = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    database: config.database.db
}

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(myConnection(mysql,dbDetails,'pool'));

app.get('/', function(req, res) {
    res.send("Welcome To Index Page new");
})
 

app.listen(3001);