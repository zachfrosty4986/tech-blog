const router = require('express').Router();
const { Blog } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      login_id: req.session.login_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        login_id: req.session.login_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found! Please try again' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;