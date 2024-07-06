// Import the Express router module
const router = require('express').Router();

// Import the loginRoutes module from './loginRoutes'
const loginRoutes = require('./loginRoutes');

// Import the blogRoutes module from './blogRoutes'
const blogRoutes = require('./blogRoutes');

// Import the commentRoutes module from './commentRoutes'
const commentRoutes = require('./commentRoutes');

// Use loginRoutes for requests made to '/login' path
router.use('/login', loginRoutes);

// Use blogRoutes for requests made to '/blog' path
router.use('/blog', blogRoutes);

// Use commentRoutes for requests made to '/comment' path
router.use('/comment', commentRoutes);

// Export the router to make it available for use in other parts of the application
module.exports = router;
