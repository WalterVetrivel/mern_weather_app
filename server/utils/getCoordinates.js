const axios = require('axios');

// Function to get the latitude and longitude from a given address
exports.getCoordinates = async address => {
	try {
		const response = await axios.get(
			`${process.env.GEOCODE_API_BASE_URL}/${address}.json?access_token=${process.env.GEOCODE_API_KEY}`
		);
		const data = response.data.features[0];

		return {
			location: data.place_name,
			lon: data.geometry.coordinates[0],
			lat: data.geometry.coordinates[1],
		};
	} catch (err) {
		throw new Error('coordinates');
	}
};

// Function to get the city and region from the coordinates
exports.getLocationFromCoordinates = async (lat, lon) => {
	try {
		const response = await axios.get(
			`${process.env.GEOCODE_API_BASE_URL}/${lon},${lat}.json?access_token=${process.env.GEOCODE_API_KEY}`
		);
		const data = response.data.features[0];

		return {
			location: data.place_name,
			lon: data.geometry.coordinates[0],
			lat: data.geometry.coordinates[1],
		};
	} catch (err) {
		throw new Error('coordinates');
	}
};

// Function to get the coordinates from an IP address
exports.getCoordinatesFromIp = async ip => {
	try {
		const response = await axios.get(
			`${process.env.IPSTACK_API_BASE_URL}/${ip}?access_key=${process.env.IPSTACK_API_KEY}`
		);

		if (!response.data.city) throw new Error();
		const coordinates = await this.getCoordinates(
			`${response.data.city} ${response.data.region_name}`
		);

		return coordinates;
	} catch (err) {
		throw new Error('coordinates');
	}
};
