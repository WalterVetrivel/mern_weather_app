const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	// If no authorization header is present, return immediately
	if (!req.headers.authorization)
		return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
	else {
		// Get the token from the header
		const authToken = req.headers.authorization.split(' ')[1];
		try {
			const result = jwt.verify(authToken, process.env.JWT_SECRET);

			// If token verification fails, send an unauthorized response
			if (!result) {
				return res
					.status(403)
					.json({ statusCode: 403, message: 'Unauthorized' });
			}

			// If the verification is successful, attach the userId to the request for use in the controller
			req.userId = result.id;
			// Calling next() is important as otherwise, the request won't proceed to the controller
			next();
		} catch (err) {
			// If something goes wrong, send an error back to the client
			return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
		}
	}
};
