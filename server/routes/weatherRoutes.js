const express = require('express');
const { query, oneOf } = require('express-validator');
const { getWeather } = require('../controllers/weatherController');

const router = express.Router();

router.get(
	'/',
	oneOf([
		[query('lat').exists().notEmpty(), query('lon').exists().notEmpty()],
		query('address').exists().notEmpty(),
		query('ip').exists().notEmpty(),
	]),
	getWeather
);

module.exports = router;
