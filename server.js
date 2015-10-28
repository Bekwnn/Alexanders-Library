// BASE SETUP
//=====================================
// CALL THE PACKAGES ------------------
var express    = require('express');
var app        = express();
var path	   = require('path');

var bodyParser = require('body-parser'); // helps pull POST content from HTTP requests
var morgan     = require('morgan');      // logs api calls to console
var mongoose   = require('mongoose');    // used to communicate with DBMS

// INCLUDE MODELS ---------------------
var modelPath = './app/models/';
var User        = require(modelPath + 'User.js');
var Reservation = require(modelPath + 'Reservation.js');
var Employee    = require(modelPath + 'Employee.js');
var Book        = require(modelPath + 'Book.js');
var CoursesUsed = require(modelPath + 'CoursesUsedIn.js');

// CONNECT WITH THE DATABASE ----------
mongoose.connect('mongodb://csc370user:csc370password@ds051903.mongolab.com:51903/heroku_dwfz5kgv');

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

app.use(express.static(__dirname + '/public'));

// ROUTES FOR THE API
//=====================================

// send the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// create routes
var basicRouter = express.Router(); // basic route
var adminRouter = express.Router(); // admin log in
var apiRouter   = express.Router(); // api route

apiRouter.use(function(req, res, next) {
	// called any time someone uses api
	
	// TODO: authenticate users
	
	next(); // continue
});

// test route located at '<website>/api'
apiRouter.get('/', function(req, res) {
	res.json({ message: 'api working!' });
});

// get all users, create new user
apiRouter.route('/users')
	// create new
	.post(function(req, res) {
		
		//create new instance of user model
		var user = new User();
		
		// set the user info from the request info
		user.student_no = req.body.student_no;
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.password = req.body.password;
		user.email = req.body.email;
		user.phone = req.body.phone;
		user.address = req.body.address;
		
		// save the user and check for conflicts
		user.save(function(err) {
			// error handling
			if (err) {
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that email already exists.'});
				else
					return res.send(err);
			}
			
			// success
			res.json({ success: true, message: 'User created!' });
		})
	})
	// get all users
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) res.send(err); // error
			
			//return the users
			res.json(users);
		});
	});

// register routes
app.use('/', basicRouter);          // basic route
app.use('/admin', adminRouter);     // admin route
app.use('/api', apiRouter);         // api route

// START THE SERVER
//======================================
app.listen(port);
console.log('Listening on port: ' + port);