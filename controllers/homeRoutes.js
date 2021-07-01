const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

router.get('/', async (req, res) => {
  try {
    // Get all posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
      ],
    });

    // Serialize data
    const posts = postData.map((post) => post.get({ plain: true}));
    
    // pass serialized data and session flag into template
    res.render('homepage', {
      page_title: 'Home Page',
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;