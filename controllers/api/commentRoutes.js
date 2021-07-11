const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// TO DO: Add withAuth
router.post('/', async (req, res) => {
  try {

    const newComment = await Comment.create({...req.body,
      // content: req.body.content,
      // post_id: req.body.post_id,
      // user_id: req.body.user_id
      user_id: req.session.user_id
    });

    res.status(200).json(newComment);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;