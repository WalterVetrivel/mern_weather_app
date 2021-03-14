const express = require('express');
const {
	getHomeLocation,
	getSavedLocations,
	setHomeLocation,
	addSavedLocation,
	deleteSavedLocation,
} = require('../controllers/locationController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/home', auth, getHomeLocation);
router.post('/home', auth, setHomeLocation);

router.get('/saved', auth, getSavedLocations);
router.post('/saved', auth, addSavedLocation);
router.delete('/saved/:location', auth, deleteSavedLocation);

module.exports = router;
