var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number
});

// Export the schema
module.exports = UserSchema;