var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var ReservationSchema = new mongoose.Schema({
	book_id: { type: ObjectId, ref: 'Book', unique: true },
	user_id: { type: ObjectId, ref: 'User' },
	start_date: Date,
	end_date: Date
});

// Export the schema
module.exports = mongoose.model('Reservation', ReservationSchema);