const router = require('express').Router();
const { Login } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const loginData = await Login.create(req.body);

    req.session.save(() => {
      req.session.login_id = loginData.id;
      req.session.logged_in = true;

      res.status(200).json(loginData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginData = await Login.findOne({ where: { email: req.body.email } });

    if (!loginData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await loginData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.login_id = loginData.id;
      req.session.logged_in = true;
      
      res.json({ login: loginData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;