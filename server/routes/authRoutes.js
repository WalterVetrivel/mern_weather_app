const express = require('express');
const { body } = require('express-validator');

const { register, login } = require('../controllers/userController');
const User = require('../models/User');

const router = express.Router();

router.post(
	'/register',
	[
		body('email').notEmpty().isEmail(),
		body('password')
			.notEmpty()
			.custom((value, { req }) => {
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
			.custom(async (value, {req}) => {
				const userExists = await User.exists({ email: value });
				if (!userExists) throw new Error('User not found');

				return true;
			}),
		body('password').notEmpty(),
	],
	login
);

module.exports = router;
