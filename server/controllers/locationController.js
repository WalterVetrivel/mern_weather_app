const User = require('../models/User');

exports.getHomeLocation = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.userId });
		res.status(200).json({ homeLocation: user.homeLocation });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
	}
};

exports.getSavedLocations = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.userId });
		res.status(200).json({ savedLocations: user.savedLocations });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
	}
};

exports.setHomeLocation = async (req, res) => {
	try {
		console.log(req.body);
		await User.findOneAndUpdate(
			{ _id: req.userId },
			{ homeLocation: req.body.newHomeLocation },
			{ useFindAndModify: false }
		);
		res.status(200).json({ homeLocation: req.body.newHomeLocation });
	} catch (err) {
		console.error(err);
		res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
	}
};

exports.addSavedLocation = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.userId });
		user.savedLocations.push(req.body.newLocation);
		user.save();
		res.status(200).json({ savedLocations: user.savedLocations });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
	}
};

exports.deleteSavedLocation = async (req, res) => {
	try {
		const location = req.params.location;
		const user = await User.findOne({ _id: req.userId });
		const savedLocations = [...user.savedLocations];

		const index = savedLocations.indexOf(location);
		savedLocations.splice(index, 1);
		user.savedLocations = savedLocations;
		user.save();

		res.status(200).json({ message: 'Deleted', savedLocations });
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
	}
};
