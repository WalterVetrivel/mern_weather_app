const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 8000;

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mern-weather-app.uniyy.mongodb.net/weather?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		app.listen(PORT);
		console.log(`App listening on port ${PORT}`);
	})
	.catch(err => {
		console.log(err);
		console.error('Database connection failed.');
	});
