var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	student_no: Number,
	first_name: String,
	last_name: String,
	password: { type: String, required: true, select: false },
	email: { type: String, index: {unique: true} },
	phone: Number,
	address: String,
	credits: Number
});

// hash the password before user is saved
UserSchema.pre('save', function(next) {
	var user = this;
	
	// only hash if the user is new or password is changed
	if (!user.isModified('password')) return next();
	
	// generate hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		
		// change password to hashed version
		user.password = hash;
		next();
	});
});

// method for comparing a password against a hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	
	return bcrypt.compareSync(password, user.password);
};

// Export the schema
module.exports = mongoose.model('User', UserSchema);