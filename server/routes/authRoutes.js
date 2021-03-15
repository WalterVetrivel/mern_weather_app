const express = require('express');
const { body } = require('express-validator');

const { register, login } = require('../controllers/authController');
const User = require('../models/User');

const router = express.Router();

router.post(
	'/register',
	[
		body('email').notEmpty().isEmail(),
		body('password')
			.notEmpty()
			.custom((value, { req }) => {
				// Custom validator to check password length and also to verify that it matches the confirm password field
				if (value.length < 8) throw new Error(`Password too short`);
				if (value !== req.body.confirmPassword)
					throw new Error(`Passwords don't match`);

				return true;
			}),
	],
	register
);

router.post(
	'/login',
	[
		body('email')
			.notEmpty()
			.isEmail()
			.custom(async (value, { req }) => {
				// Custom validator to check whether user exists before logging in
				const userExists = await User.exists({ email: value });
				if (!userExists) throw new Error('User not found');

				return true;
			}),
		body('password').notEmpty(),
	],
	login
);

module.exports = router;
