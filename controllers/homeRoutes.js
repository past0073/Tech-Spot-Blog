const router = require('express').Router();
const { Blog, User } = require('../models');

router.get( '/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      // attributes: ['title', 'content', 'user_id'],
  });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      ...blogs,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  console.log("login route hit")
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
  console.log("login route complete")
});

router.get('/logout', (req, res) => {
  res.render('logout', {
    loggedIn: req.session.logged_in,
  })
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  }
  res.render('signup');
});

module.exports = router;
