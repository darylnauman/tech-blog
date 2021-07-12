const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// POST - create new blog post
router.post('/', withAuth, async (req, res) => {
  try {

    const newPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.user_id});

    res.status(200).json(newPost);

  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT - update a blog post by it's 'id'
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    })

    if(!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE - delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;