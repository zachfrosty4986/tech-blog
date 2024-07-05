const router = require('express').Router();
const { Blog, Login, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: Login,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('index', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Login,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog)
    res.render('singleBlog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const loginData = await Login.findByPk(req.session.login_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const login = loginData.get({ plain: true });

    res.render('profile', {
      ...login,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req,res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return;
  }
  res.render('signup');
});

module.exports = router;