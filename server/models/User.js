const mongoose = require('mongoose');
const sanitizer = require('mongoose-sanitize');

// Creating a mongoose Schema
const UserSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, index: true, unique: true },
	password: { type: String, required: true },
	homeLocation: String,
	savedLocations: [String],
});

UserSchema.plugin(sanitizer);

module.exports = mongoose.model('user', UserSchema);
