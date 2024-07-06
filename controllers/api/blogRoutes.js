// Import the Express router module
const router = require('express').Router();

// Import the Blog model from the models directory (assuming it's in '../../models')
const { Blog } = require('../../models');

// Import the isAuth middleware function from the utils directory
const isAuth = require('../../utils/auth');

// POST route to create a new blog post
router.post('/', isAuth, async (req, res) => {
  try {
    // Create a new blog post using data from req.body and the logged-in user's login_id from req.session
    const newBlog = await Blog.create({
      ...req.body,          // Spread operator to include all fields from req.body
      login_id: req.session.login_id,  // Assign the logged-in user's login_id to the blog post
    });

    // Respond with status 200 and JSON data of the newly created blog post
    res.status(200).json(newBlog);
  } catch (err) {
    // If an error occurs during creation, log the error and respond with status 400 and JSON error message
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE route to delete a blog post by its ID
router.delete('/:id', isAuth, async (req, res) => {
  try {
    // Attempt to delete the blog post where id matches req.params.id and login_id matches req.session.login_id
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,              // Blog post ID to be deleted
        login_id: req.session.login_id, // Ensure deletion only by the logged-in user
      },
    });

    // If no blog post was found matching the criteria, respond with status 404 and JSON message
    if (!blogData) {
      res.status(404).json({ message: 'No Blog found! Please try again' });
      return;
    }

    // Respond with status 200 and JSON data of the deleted blog post
    res.status(200).json(blogData);
  } catch (err) {
    // If an error occurs during deletion, respond with status 500 and JSON error message
    res.status(500).json(err);
  }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
