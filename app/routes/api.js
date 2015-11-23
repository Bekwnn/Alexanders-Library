// INCLUDE MODELS ----------------------
var modelPath = '../models/'
var User        = require(modelPath + 'User.js');
var Book        = require(modelPath + 'Book.js');
var Reservation = require(modelPath + 'Reservation.js');

// INCLUDE MODULES ---------------------
var jwt    = require('jsonwebtoken');
var config = require('../../config');

var secretKey = config.secretKey;

module.exports = function(app, express) {

	var apiRouter = express.Router();
	
//	AUTHENTICATION TOKEN
//================================================
	apiRouter.post('/authenticate', function(req, res) {
		console.log(req.body.username);
		
		// find the user
		// ask for password explicitly since it's hidden
		User.findOne({
			email: req.body.email
		}).select('password').exec(function(err, user) {
			if (err) throw err;
			
			//no user with name was found
			if (!user) {
				res.json({
					success: false,
					message: 'Login information incorrect.'
				});
			}
			else if (user)
			{
				//check if pw matches
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({
						success: false,
						message: 'Login information incorrect.'
					});
				} else {
					//if user is found and pw is right create a token
					var token = jwt.sign(user, secretKey, {
						expiresInMinutes: 1440
					});
					
					//return the token
					res.json({
						success: true,
						message: 'Authentication success.',
						token: token
					});
				}
			}
		});
	});
	
//	AUTHORIZATION MIDDLEWARE
//=======================================
	// middleware now used on every route
	// gives req.auth = false if user isn't authenticated and continues on
	apiRouter.use('/', function(req, res, next) {
		// log authentication call
		console.log('User authentication called.');
		
		// check header, url, or post params for token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		
		// decode token
		if (token) {
			// verify secret key and check expiration
			jwt.verify(token, secretKey, function(err, decoded) { //TODO admin auth
				if (err) {
					req.auth = false;
					req.admin = false;
				} else {
					req.decoded = decoded;
					req.auth = true;
					req.admin = false;
				}
				next();
			});
		} else {
			req.auth = false;
			req.admin = false;
			next();
		}
	});
	
	// middleware which rejects users who are not logged in
	var authRequiredPaths = {
		uses: ['/user/:user_id'],
		gets: ['/me'],
		posts: ['/book/:book_id/reservation']
	};
	
	var authRequiredJson = {
		success: false,
		message: "Authentication required."
	};
	
	var authRequired = function(req, res, next) {
		if (!req.auth) return res.json(authRequiredJson);
		else next();
	};
	
	apiRouter.use(authRequiredPaths.uses, authRequired);
	apiRouter.get(authRequiredPaths.gets, authRequired);
	apiRouter.post(authRequiredPaths.posts, authRequired);
	
	// test route to make sure api is working
	apiRouter.get('/', function(req, res) {
		res.json({
			message: 'welcome to the api'
		});
	});

	// test route for login
	apiRouter.get('/me', function(req, res) { 
		res.send(req.decoded);
	});
	
//	USERS
//===============================================
	apiRouter.route('/user')
		.get(function(req, res) { // fetches all users TODO: admin only
			User.find(function(err, users) {
				if (err) res.send(err);
				
				res.json(users);
			});
		})
		.post(function(req, res) {
			var user = new User();	// create new instance of user model
			console.log(req.body);
			// set the new user from the post params
			user.student_no = req.body.student_no;
			user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.password = req.body.password;
			user.email = req.body.email;
			user.phone = req.body.phone;
			user.address = req.body.address;
			
			// save the user
			user.save(function(err) {
				if (err) res.send(err);
				else {
					res.json({
						success: true,
						message: 'User created.'
					});
				}
			});
		});
	
	apiRouter.route('/user/:user_id')
		.get(function(req, res) {	//get single user
			if (req.decoded._id != req.params.user_id) {
				res.json({
					success: false,
					message: "You do not have permission to access that user."
				});
			} else {
				User.findById(req.params.user_id, function(err, user) {
					if (err) res.send(err);
					
					res.json(user);
				});
			}
		});
	
//	BOOKS
//=================================================
	apiRouter.route('/book')
		.get(function(req, res) {
			// find books through search params
			//(ex. /api/book?q=used)(ex2. GET api/book?q=Thomas'+Calculus)
			if (req.query['q'])
			{
				Book.find(
				{$or: [	// compares whole query for exact match against any of fields TODO: fuzzy search
					{title: req.query.q},
					{author: req.query.q},
					{subject: req.query.q},
					{condition: req.query.q},
					{isbn10: req.query.q},
					{isbn13: req.query.q}
				]},
				function(err, books) {
					if (err) res.send(err);
					
					res.json(books);
				}
			);
			}
			else { // if no search params, fetches all books
				Book.find(function(err, books) {
					if (err) res.send(err);
					
					res.json(books);
				});
			}
		})
		
		.post(function(req, res) {
			var book = new Book();	// create new instance of book model
			// set the new book from the post params
			book.title = req.body.title;
			book.author = req.body.author;
			book.isbn10 = req.body.isbn10;
			book.isbn13 = req.body.isbn13;
			book.price = req.body.price;
			book.subject = req.body.subject;
			book.condition = req.body.condition;
			book.location = req.body.location;
			
			// save the book
			book.save(function(err) {
				if (err) res.send(err);
				else {
					res.json({
						success: true,
						message: 'Book created.'
					});
				}
			});
		});
	
	apiRouter.route('/book/:book_id')
		.get(function(req, res) { // fetches a book by object id
			Book.findById(req.params.book_id, function(err, book) {
				if (err) res.send(err);
				
				res.json(book);
			});
		});
		
//	RESERVATIONS
//================================================	
	apiRouter.route('/reservation')
		.get(function(req, res) {	//fetches all reservations TODO: admin only
			Reservation.find(function(err, reservations) {
				if (err) res.send(err);
				
				res.json(reservations);
			});
		});
		
	apiRouter.route('/book/:book_id/reservation')
		.get(function(req, res) {	//checks whether the book is reserved
			Reservation.findOne(
				{
					book_id: req.params.book_id
				},
				function(err, reservation) {
					if (err) res.send(err);
					
					if (!reservation) {
						res.json({
							reserved: false,
							message: "This book is not currently reserved."
						});
					} else {
						res.json({
							reserved: true,
							message: "This book is reserved.",
							reservation_ends: reservation.end_date
						});
					}
				}
			);
		})
		.post(function(req, res) { // reserves the book
			
			var reservation = new Reservation();	// create new instance of reservation model
			// set the new reservation
			reservation.book_id = req.params.book_id;
			reservation.user_id = req.decoded._id; 
			var now = new Date();
			reservation.start_date = now;
			reservation.end_date = new Date().setDate(now.getDate()+7); //user has 7 days before reservation expires
			
			// save the reservation
			reservation.save(function(err) {
				if (err) res.send(err);
				else {
					res.json({
						success: true,
						message: 'Reservation created.'
					});
				}
			});
		});
		
	apiRouter.route('/user/:user_id/reservation')
		.get(function(req, res) {	//gets a user's book reservations
			if (req.decoded._id == req.params.user_id) {
				res.json({
					success: false,
					message: "You do not have permission to access that user's reservations."
				});
			} else {
			
				Reservation.find(
					{
						user_id: req.params.user_id
					},
					function(err, reservations) {
						if (err) res.send(err);
						
						res.json(reservations);
				});
			}
		});
		
	// END API
	return apiRouter;
};