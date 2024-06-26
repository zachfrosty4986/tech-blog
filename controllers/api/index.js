const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const loginRoutes = require('./loginRoutes');
const blogRoutes = require('./blogRoutes');

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/login', loginRoutes);
router.use('/blog', blogRoutes);

module.exports = router;