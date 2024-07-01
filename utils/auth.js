const isAuth = (req, res, next) => {
    // redirect the user to log in before doing any api request where this is added
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // next moves the request to the next step
      next();
    }
  };
  
  module.exports = isAuth;