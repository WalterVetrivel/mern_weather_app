const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();
		if (hasErrors) throw new Error('Please provide a valid email and password');

		const email = req.body.email;
		const password = req.body.password;

		const hashedPassword = await bcrypt.hash(password, 10);

		const userExists = await User.exists({ email });
		if (userExists) throw new Error('Email already exists.');

		const user = new User({
			email,
			password: hashedPassword,
		});

		user.save();

		res.status(201).json({
			statusCode: 201,
			message: 'Success',
			user: { id: user._id, email: user.email },
		});
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();
		if (hasErrors) throw new Error('Login failed');

		const email = req.body.email;
		const password = req.body.password;

		const user = await User.findOne({ email: email });

		const compareHash = await bcrypt.compare(password, user.password);

		if (compareHash) {
			const authToken = jwt.sign(
				{ id: user._id, email: user.email },
				process.env.JWT_SECRET
			);

			res.status(200).json({
				statusCode: 200,
				message: 'Success',
				authToken,
			});
		}
	} catch (err) {
		res.status(403).json({ statusCode: 403, message: err.message });
	}
};
