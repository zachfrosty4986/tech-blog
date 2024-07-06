// Import the Express router module
const router = require('express').Router();

// Import the Login model from '../../models'
const { Login } = require('../../models');

// POST route to create a new login session
router.post('/', async (req, res) => {
  try {
    // Create a new login entry in the database using data from req.body
    const loginData = await Login.create(req.body);

    // Save session data and respond with status 200 and JSON loginData
    req.session.save(() => {
      req.session.login_id = loginData.id;  // Set login_id in session to the newly created login's ID
      req.session.logged_in = true;         // Set logged_in flag in session to true

      res.status(200).json(loginData);      // Respond with status 200 and JSON loginData
    });
  } catch (err) {
    console.log(err);                       // Log any errors to the console
    res.status(400).json(err);              // Respond with status 400 and JSON error message
  }
});

// POST route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find a login entry in the database with matching email from req.body
    const loginData = await Login.findOne({ where: { email: req.body.email } });

    // If no matching login entry found, respond with status 400 and error message
    if (!loginData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the password provided in req.body matches the stored password using checkPassword method
    const validPassword = await loginData.checkPassword(req.body.password);

    // If password is not valid, respond with status 400 and error message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save session data and respond with status 200, JSON loginData, and success message
    req.session.save(() => {
      req.session.login_id = loginData.id;  // Set login_id in session to the logged-in user's ID
      req.session.logged_in = true;         // Set logged_in flag in session to true
      
      res.json({ login: loginData, message: 'You are now logged in!' });  // Respond with JSON loginData and success message
    });

  } catch (err) {
    res.status(400).json(err);  // Respond with status 400 and JSON error message
  }
});

// POST route to handle user logout
router.post('/logout', (req, res) => {
  // Check if user is logged in
  if (req.session.logged_in) {
    req.session.destroy(() => {   // Destroy the session
      res.status(204).end();      // Respond with status 204 (No Content)
    });
  } else {
    res.status(404).end();        // If user is not logged in, respond with status 404 (Not Found)
  }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
