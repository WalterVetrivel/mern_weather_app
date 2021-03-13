const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: { type: String, required: true, index: true, unique: true },
	password: String,
	homeLocation: String,
	savedLocations: [String],
});

module.exports = mongoose.model('user', UserSchema);
