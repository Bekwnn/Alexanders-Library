// set up ======================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var models = require('./models');
var database = require('./config/database');
var port = process.env.PORT || 5000;


// configuration ===============================================
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public')); // All static files located in public
app.set('views', __dirname + '/views'); // views is directory for all template files
app.set('view engine', 'ejs');


// routes ======================================================
require('./routes')(app);


// listen ======================================================
app.listen(port);
console.log('Node app is running on port' + port);