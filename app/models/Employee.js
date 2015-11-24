var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var EmployeeSchema = new mongoose.Schema({
	_id: ObjectId,
	first_name: String,
	last_name: String,
	email: { type: String, unique: true },
	username: { type: String, unique: true },
	password: { type: String, required: true, select: false },
});

// Export the schema
module.exports = mongoose.model('Employee', EmployeeSchema);