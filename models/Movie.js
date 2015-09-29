var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number
});

// Export the schema
module.exports = MovieSchema;