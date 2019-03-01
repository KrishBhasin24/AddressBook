var express = require('express');
var mysql = require('mysql');
var myConnection  = require('express-myconnection');
var config = require("./config");
var app = express();
var cors = require('cors')
var users = require('./routes/user');
var bodyParser = require('body-parser');
var dbDetails = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    database: config.database.db
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(myConnection(mysql,dbDetails,'pool'));
app.use('/user',users);

app.get('/', function(req, res) {
    res.send("Welcome To Node Module");
})
 

app.listen(3001);