// BASE SETUP
//=====================================
// CALL THE PACKAGES ------------------
var express    = require('express');
var app        = express();

var bodyParser = require('body-parser'); // helps pull POST content from HTTP requests
var morgan     = require('morgan');      // logs api calls to console
var mongoose   = require('mongoose');    // used to communicate with DBMS

var port = process.env.PORT || 8080;     // set the port for our app

// APP CONFIGURATION
//=====================================
// use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	next();
});

// log all requests to console
app.use(morgan('dev'));

// ROUTES FOR THE API
//=====================================

// send the home page
app.get('/', function(req, res) {
	res.send('Welcome to Alexander\'s Library');
});

// create routes
var basicRouter = express.Router(); // basic route
var adminRouter = express.Router(); // admin log in
var apiRouter   = express.Router(); // api route

apiRouter.get('/', function(req, res) {
	res.json({ message: 'api working!' });
});

// register routes
app.use('/', basicRouter);          // basic route
app.use('/admin', adminRouter);     // admin route
app.use('/api', apiRouter);         // api route

// START THE SERVER
//======================================
app.listen(port);
console.log('Listening on port: ' + port);