const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
  res.render('dashboard');
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body, {user_id: req.session.user_id});

    res.status(200).json(newPost);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;