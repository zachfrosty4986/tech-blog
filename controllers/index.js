// Import the Express router module
const router = require('express').Router();

// Import API routes from './api'
const apiRoutes = require('./api');

// Import landing page routes from './landingRoutes'
const homeRoutes = require('./landingRoutes');

// Middleware to handle routes starting with '/api'
router.use('/api', apiRoutes);

// Middleware to handle routes starting with '/'
router.use('/', homeRoutes);

// Export the router to make it available for use in other parts of the application
module.exports = router;

