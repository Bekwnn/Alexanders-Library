// BASE SETUP
//=====================================
// CALL THE PACKAGES ------------------
var express    = require('express');
var app        = express();
var path	   = require('path');		 // cleans up filepath strings
var config     = require('./config');    // grab the config vars

var bodyParser = require('body-parser'); // helps pull POST content from HTTP requests
var morgan     = require('morgan');      // logs api calls to console
var mongoose   = require('mongoose');    // used to communicate with DBMS

// CONNECT WITH THE DATABASE ----------
mongoose.connect(config.database);

var port = config.port;     // set the port for our app

// APP CONFIGURATION
//=====================================
// use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.cookieParser());
app.use(express.session());

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	next();
});

// log all requests to console
app.use(morgan('dev'));

// Set /public folder as frontend's root
app.use(express.static(__dirname + '/public'));

// ROUTES FOR THE API
//=====================================

// grab routes
var apiRoutes = require('./app/routes/api')(app, express);
// create routes
var basicRouter = express.Router(); // basic route
var adminRouter = express.Router(); // admin log in

// send the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// register routes
app.use('/', basicRouter);          // basic route
app.use('/admin', adminRouter);     // admin route
app.use('/api', apiRoutes);         // api route

app.use(function(req, res) {
    res.sendfile(__dirname + '/public/app/views/index.html');
});

// START THE SERVER
//======================================
app.listen(port);
console.log('Listening on port: ' + port);