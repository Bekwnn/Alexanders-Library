var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
	_id: ObjectId,
	student_no: { type: Number, unique: true },
	first_name: String,
	last_name: String,
	username: { type: String, unique: true },
	password: String,
	email: { type: String, unique: true },
	phone: Number,
	address: String
});

// Export the schema
module.exports = mongoose.model('User', UserSchema);