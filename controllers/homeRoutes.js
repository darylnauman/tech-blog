const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET - render dashboard with only posts from logged in user
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
    posts, 
    logged_in: req.session.logged_in 
  });
});

// GET - Render add-post page
router.get('/add-post', withAuth, async (req, res) => {
  res.render(`add-post`, {
    logged_in: req.session.logged_in
  });
});

// GET - Render homepage with all blog posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'id']
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true}));
    
    res.render('homepage', {
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
        { 
          model: Comment,
          attributes: ['id','content', 'date', 'user_id'],
          include:
            {
              model: User,
              attributes: ['name']
            }
        },
      ],
    });

    const post = postData.get({ plain: true });
    post.isOwner = (post.user.id == req.session.user_id);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      currentUserId: req.session.user_id,
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