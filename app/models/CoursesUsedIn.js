var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var CoursesUsedInSchema = new mongoose.Schema({
	_id: ObjectId,
	book_id: { type: ObjectId, ref: 'Book' },
	course: { type: String }
});

// Export the schema
module.exports = mongoose.model('CoursesUsedIn', CoursesUsedInSchema);