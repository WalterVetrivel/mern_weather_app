const mongoose = require('mongoose');

const app = require('./app');

// Set port that the server must run on
const PORT = process.env.PORT || 8000;

// Setting up database connection
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mern-weather-app.uniyy.mongodb.net/weather?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		// If DB connection is successful, start server
		app.listen(PORT);
		console.log(`App listening on port ${PORT}`);
	})
	.catch(err => {
		// If it fails, don't start the server, just log the error
		console.log(err);
		console.error('Database connection failed.');
	});
