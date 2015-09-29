var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var models = require('./models');


var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };  

var mongodbUri = 'mongodb://heroku_f9lk33xc:7ucr4p8dc1lmh08o485v0jjghu@ds051913.mongolab.com:51913/heroku_f9lk33xc';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri);

var db = mongoose.connection;

var User = mongoose.model('users', models.user);

// Create seed data
var bob = new User({
    first_name: '1970s',
    last_name: 'Debby Boone',
    email: 'You Light Up My Life',
    age: 10
});

bob.save();

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send("<a href='/mon'>Show Mon</a>");
  //response.render('pages/index');
});

app.get('/mon', function(request, response) {
    User.find({first_name: '1970s'}, function(error, docs){
        response.json(docs);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

