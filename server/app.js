// Imports
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const weatherRouter = require('./routes/weatherRoutes');
const authRouter = require('./routes/authRoutes');
const locationRouter = require('./routes/locationRoutes');

// Setup app
const app = express();
app.use(cors());
app.use(express.json());

// Configure Routes
app.use('/weather', weatherRouter);
app.use('/auth', authRouter);
app.use('/location', locationRouter);

module.exports = app;
