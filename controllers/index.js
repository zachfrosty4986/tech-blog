const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./loginRoutes');

router.use('/', loginRoutes);
router.use('/api', apiRoutes);

module.exports = router;
