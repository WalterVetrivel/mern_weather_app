const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, index: true, unique: true },
	password: { type: String, required: true },
	homeLocation: String,
	savedLocations: [String],
});

module.exports = mongoose.model('user', UserSchema);
