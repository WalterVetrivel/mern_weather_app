const express = require('express');

const {
	getHomeLocation,
	getSavedLocations,
	setHomeLocation,
	addSavedLocation,
	deleteSavedLocation,
} = require('../controllers/locationController');

// Importing the auth middleware to protect the routes from unauthorised access
const { auth } = require('../middleware/auth');

const router = express.Router();

// You can also use express validator to validate the data that is passed to these routes, especially the post and delete routes
// Can add route to delete saved location
router.get('/home', auth, getHomeLocation);
router.post('/home', auth, setHomeLocation);

// Can add route to edit a saved location
router.get('/saved', auth, getSavedLocations);
router.post('/saved', auth, addSavedLocation);
router.delete('/saved/:location', auth, deleteSavedLocation);

module.exports = router;
