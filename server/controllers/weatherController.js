const { validationResult } = require('express-validator');
const requestIp = require('request-ip');

const {
	getCoordinates,
	getCoordinatesFromIp,
	getLocationFromCoordinates,
} = require('../utils/getCoordinates');
const { getWeather } = require('../utils/getWeather');
const { getError } = require('../utils/getError');

// Controller for the GET /weather route
// The route can take query params that are either an address, a latitidue/longitude pair or an IP address
exports.getWeather = async (req, res) => {
	try {
		const hasErrors = !validationResult(req).isEmpty();

		// Getting IP address of request in case no params were passed
		const queryParams = req.query;
		const ip = queryParams.ip || requestIp.getClientIp(req);

		// Using ternary operator to get the location based on either IP address (if an IP or nothing is passed), an address (if address is passed), or lat/lon pair (to get complete location with city and region)
		const coords =
			hasErrors || queryParams.ip
				? await getCoordinatesFromIp(ip)
				: queryParams.address
				? await getCoordinates(queryParams.address)
				: await getLocationFromCoordinates(queryParams.lat, queryParams.lon);

		// Passing the coordinates to the getWeather utility function to get the weather information
		const weather = await getWeather(coords.lon, coords.lat);
		return res
			.status(200)
			.json({ message: 'Success', weather, location: coords.location });
	} catch (err) {
		const error = getError(err.message);
		return res.status(error.statusCode).json(error);
	}
};
