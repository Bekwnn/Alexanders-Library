// INCLUDE MODELS ----------------------
var modelPath = '../models/'
var User   = require(modelPath + 'User.js');
var Book   = require(modelPath + 'Book.js');

// INCLUDE MODULES ---------------------
var jwt    = require('jsonwebtoken');
var config = require('../../config');

var secretKey = config.secretKey;

module.exports = function(app, express) {

	var apiRouter = express.Router();
	
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
	
	apiRouter.use('/authenticate', function(req, res, next) { // needs mount path (can't login since it requires token)
		// log
		console.log('Api used.');
		
		// check header, url, or post params for token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		
		// decode token
		if (token) {
			// verify secret key and check expiration
			jwt.verify(token, secretKey, function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Token authentication failed.'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			// if there is no token return 403
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	});
	
	// test route to make sure api is working
	apiRouter.get('/', function(req, res) {
		res.json({
			message: 'welcome to the api'
		});
	});
	
	apiRouter.route('/user')
		.post(function(req, res) {
			var user = new User();	// create new instance of user model
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
	
	apiRouter.route('/book')
		.get(function(req, res) { // fetches all books
			Book.find(function(err, books) {
				if (err) res.send(err);
				
				res.json(books);
			});
		});
	
	apiRouter.route('/book/:book_id')
		.get(function(req, res) { // fetches a book by object id
			Book.findById(req.params.book_id, function(err, book) {
				if (err) res.send(err);
				
				res.json(book);
			});
		})
		.post(function(req, res) { // reserves the book
			//TODO: make reservation
		});
		
	apiRouter.route('/search')
		.get(function(req, res) {
			//TODO: perform a search and return list of books as result
		});
	
	return apiRouter;
};