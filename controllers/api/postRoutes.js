const router = require('express').Router();
const { Post, User } = require('../../models');

router.post('/', async (req, res) => {
  try {

    console.log(req.body);

    const newPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.user_id});

    res.status(200).json(newPost);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;