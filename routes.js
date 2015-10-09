var User = require('./models').User;

module.exports = function(app){

	app.get('/', function(request, response) {
	  response.send("<a href='/mon'>Show Mon</a>");
	  //response.render('pages/index');
	});

	app.get('/mon', function(request, response) {
		User.find({first_name: '1970s'}, function(error, docs){
			response.json(docs);
		});
	});

}