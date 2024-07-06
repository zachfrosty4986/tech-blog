// Import the Express router module
const router = require('express').Router();

// Import models: Blog, Login, Comment from '../models'
const { Blog, Login, Comment } = require('../models');

// Import withAuth middleware from '../utils/auth'
const withAuth = require('../utils/auth');

// Route to render all blogs on the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all blogs and include associated user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: Login,
          attributes: ['name'], // Include only 'name' attribute from Login model
        },
      ],
    });

    // Serialize data to plain JavaScript objects for template rendering
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and logged_in session flag to the 'index' template
    res.render('index', { 
      blogs, 
      logged_in: req.session.logged_in  // Pass logged_in session flag to template
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render a single blog post page
router.get('/blog/:id', async (req, res) => {
  try {
    // Fetch blog data by primary key 'id' and include associated user (Login) and comments
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Login,
          attributes: ['name'], // Include only 'name' attribute from Login model
        },
        {
          model: Comment, // Include comments associated with the blog
        },
      ],
    });

    // Serialize blog data to plain JavaScript object for template rendering
    const blog = blogData.get({ plain: true });

    // Render the 'singleBlog' template with blog data and logged_in session flag
    res.render('singleBlog', {
      ...blog, // Spread all properties of 'blog' into template context
      logged_in: req.session.logged_in // Pass logged_in session flag to template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Protected route using withAuth middleware to render user profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Fetch logged-in user data by session login_id, excluding password attribute
    const loginData = await Login.findByPk(req.session.login_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }], // Include blogs associated with the user
    });

    // Serialize login data to plain JavaScript object for template rendering
    const login = loginData.get({ plain: true });

    // Render the 'profile' template with login data and set logged_in flag to true
    res.render('profile', {
      ...login, // Spread all properties of 'login' into template context
      logged_in: true // Set logged_in flag to true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // Redirect to profile page if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the 'login' template
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // Redirect to profile page if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the 'signup' template
  res.render('signup');
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
