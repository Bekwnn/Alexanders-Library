var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number
});

/* scraps from pushing data to mongo
var User = mongoose.model('users', models.user);

// Create seed data
var bob = new User({
    first_name: '1970s',
    last_name: 'Debby Boone',
    email: 'You Light Up My Life',
    age: 10
});

bob.save();
*/

// Export the schema
module.exports = mongoose.model('User', UserSchema);