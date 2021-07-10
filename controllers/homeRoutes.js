const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
    where: {user_id: req.session.user_id}
  });

  const posts = postData.map((post) => post.get({ plain: true }));

  res.render('dashboard', { 
    page_title: 'Tech Blog - Dashboard',
    posts, 
    logged_in: req.session.logged_in 
  });
});

router.get('/add-post', withAuth, async (req, res) => {
  res.render(`add-post`, {
    page_title: 'Tech Blog',
    logged_in: req.session.logged_in
  });
});

router.get('/update-post', async (req, res) => {
  res.render(`update-post`, {
    page_title: 'Tech Blog',
    logged_in: req.session.logged_in
  });
});

router.get('/', async (req, res) => {
  try {
    // Get all posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'id']
        },
      ],
    });

    // Serialize data
    const posts = postData.map((post) => post.get({ plain: true}));
    
    // pass serialized data and session flag into template
    res.render('homepage', {
      page_title: 'Tech Blog - Home Page',
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    post.isOwner = (post.user.id == req.session.user_id);

    console.log(post)
    
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;