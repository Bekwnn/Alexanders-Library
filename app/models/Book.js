var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var BookSchema = new mongoose.Schema({
	_id: ObjectId,
	book_info: {
		title: String,
		isbn10: Number,
		isbn13: Number,
		edition: Number
	},
	price: Number,
	subject: String,
	seller_id: { type: ObjectId, ref: 'Seller' }
	condition: String,
	location_in_store: String,
	date_added: Date,
	date_sold: Date
});

// Export the schema
module.exports = mongoose.model('Book', BookSchema);