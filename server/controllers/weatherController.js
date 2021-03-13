const { validationResult } = require('express-validator');
const requestIp = require('request-ip');

const {
	getCoordinates,
	getCoordinatesFromIp,
	getLocationFromCoordinates,
} = require('../utils/getCoordinates');
const { getWeather } = require('../utils/getWeather');
const { getError } = require('../utils/getError');

exports.getWeather = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();

		const queryParams = req.query;
		const ip = queryParams.ip || requestIp.getClientIp(req);

		const coords =
			hasErrors || queryParams.ip
				? await getCoordinatesFromIp(ip)
				: queryParams.address
				? await getCoordinates(queryParams.address)
				: await getLocationFromCoordinates(queryParams.lat, queryParams.lon);

		const weather = await getWeather(coords.lon, coords.lat);
		res
			.status(200)
			.json({ message: 'Success', weather, location: coords.location });
	} catch (err) {
		const error = getError(err.message);
		res.status(error.statusCode).json(error);
	}
};
