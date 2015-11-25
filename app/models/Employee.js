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

// hash the password before user is saved
EmployeeSchema.pre('save', function(next) {
	var employee = this;
	
	// only hash if the employee is new or password is changed
	if (!employee.isModified('password')) return next();
	
	// generate hash
	bcrypt.hash(employee.password, null, null, function(err, hash) {
		if (err) return next(err);
		
		// change password to hashed version
		employee.password = hash;
		next();
	});
});

// method for comparing a password against a hash
EmployeeSchema.methods.comparePassword = function(password) {
	var employee = this;
	
	return bcrypt.compareSync(password, employee.password);
};

// Export the schema
module.exports = mongoose.model('Employee', EmployeeSchema);