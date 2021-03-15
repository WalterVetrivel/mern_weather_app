const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Register controller
exports.register = async (req, res) => {
	try {
		// If validation fails, throw an error
		const hasErrors = !validationResult(req).isEmpty();
		if (hasErrors) throw new Error('Please provide a valid email and password');

		// No need to extract confirm password as this is already checked in the validator
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		// Hash the password using bcrypt
		const hashedPassword = await bcrypt.hash(password, 10);

		// If the email is already taken, throw an error
		const userExists = await User.exists({ email });
		if (userExists) throw new Error('Email already exists.');

		// Create user on database using mongoose model
		const user = new User({
			name,
			email,
			password: hashedPassword,
		});
		await user.save();

		// Log user in by creating a JWT auth token which is signed using their id, email and a secret JWT key
		const authToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET
		);

		// Return the auth token and a success message
		return res.status(201).json({
			statusCode: 201,
			message: 'Success',
			authToken,
			name: user.name,
		});
	} catch (err) {
		return res.status(422).json({ statusCode: 422, message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();
		if (hasErrors) throw new Error('Invalid email or password.');

		const email = req.body.email;
		const password = req.body.password;

		const user = await User.findOne({ email: email });

		// Check the user password, no need to check if user exists as this has already been done in the validator
		const compareHash = await bcrypt.compare(password, user.password);

		// If passwords match, create a JWT auth token and send it back
		if (compareHash) {
			const authToken = jwt.sign(
				{ id: user._id, email: user.email },
				process.env.JWT_SECRET
			);

			return res.status(200).json({
				statusCode: 200,
				message: 'Success',
				authToken,
				name: user.name,
			});
		} else {
			throw new Error('Invalid email or password');
		}
	} catch (err) {
		return res.status(403).json({ statusCode: 403, message: err.message });
	}
};
