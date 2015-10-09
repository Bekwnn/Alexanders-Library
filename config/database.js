var username = 'csc370user';
var password = 'csc370password';
var mongo_address = 'ds051903.mongolab.com:51903/heroku_dwfz5kgv';
var address = 'mongodb://' + username + ';' + password + '@' + mongo_address;

module.exports = {
	url: address
}