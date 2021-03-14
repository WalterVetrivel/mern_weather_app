const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();
		if (hasErrors) throw new Error('Please provide a valid email and password');

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		const hashedPassword = await bcrypt.hash(password, 10);

		const userExists = await User.exists({ email });
		if (userExists) throw new Error('Email already exists.');

		const user = new User({
			name,
			email,
			password: hashedPassword,
		});

		await user.save();
		const authToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET
		);

		res.status(201).json({
			statusCode: 201,
			message: 'Success',
			authToken,
		});
	} catch (err) {
		res.status(422).json({ statusCode: 422, message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();
		if (hasErrors) throw new Error('Invalid email or password.');

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
				name: user.name,
			});
		}
	} catch (err) {
		res.status(403).json({ statusCode: 403, message: err.message });
	}
};
