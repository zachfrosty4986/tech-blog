const isAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
      // Redirect to the login page if not logged in
      res.redirect('/login');
  } else {
      // Call the next middleware or route handler
      next();
  }
};

module.exports = isAuth;
