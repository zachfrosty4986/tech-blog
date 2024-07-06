// Import the Express router module
const router = require('express').Router();

// Import the Comment model from the models directory (assuming it's in '../../models')
const { Comment } = require('../../models');

// Import the moment library for date handling
const moment = require('moment');

// POST route to create a new comment
router.post('/', async (req, res) => {
    try {
        // Create a new comment using data from req.body and current timestamp formatted by moment.js
        const newComment = await Comment.create({
            user_id: req.session.login_id,                  // User ID of the logged-in user
            content: req.body.content,                      // Content of the comment from req.body
            blog_id: req.body.blog_id,                      // Blog ID associated with the comment from req.body
            date_posted: moment().format('MMMM Do YYYY, h:mm:ss a'), // Current timestamp in specified format
            likes: 0,                                       // Initial likes count set to 0
        });

        console.log(newComment);                            // Log the newly created comment object
        res.status(200).json(newComment);                   // Respond with status 200 and JSON data of the new comment
    } catch (err) {
        res.status(500).json(err);                          // If an error occurs, respond with status 500 and JSON error message
    }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
