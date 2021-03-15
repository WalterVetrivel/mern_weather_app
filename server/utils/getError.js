// Function to get appropriate error message based on what went wrong
exports.getError = msg => {
	if (msg === 'data')
		return {
			statusCode: 422,
			message: 'Please provide address or coordinates to get weather.',
		};
	if (msg === 'coordinates')
		return {
			statusCode: 500,
			message:
				'Unable to get the coordinates for given address. Please ensure that the address exists and try again.',
		};
	if (msg === 'weather')
		return {
			statusCode: 500,
			message: 'Unable to get weather information right now. Please try later.',
		};

	return {
		statusCode: 500,
		message: 'Something went wrong. Please try later.',
	};
};
