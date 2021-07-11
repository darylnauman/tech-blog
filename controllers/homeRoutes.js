const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET - Dashboard
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
    page_title: 'Techmania (Dashboard)',
    posts, 
    logged_in: req.session.logged_in 
  });
});

// GET - Render add-post page
router.get('/add-post', withAuth, async (req, res) => {
  res.render(`add-post`, {
    page_title: 'Techmania (add-post)',
    logged_in: req.session.logged_in
  });
});

// GET - Render update-post page
router.get('/update-post', async (req, res) => {
  res.render(`update-post`, {
    page_title: 'Techmania (update-post)',
    logged_in: req.session.logged_in
  });
});

// GET - Render homepage with all blog posts
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
      page_title: 'Techmania (homepage)',
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

// GET - Render post handlebars showing a specific blog post
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

// GET - render log-in page if not already logged in, if logged in request dashboard
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;