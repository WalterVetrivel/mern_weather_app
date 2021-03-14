const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(403).json({ statusCode: 403, message: 'Unauthorized' });
	else {
		const authToken = req.headers.authorization.split(' ')[1];
		const result = jwt.verify(authToken, process.env.JWT_SECRET);
		req.userId = result.id;
		next();
	}
};
