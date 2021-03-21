const router = require('express').Router();
const { Blog, User } = require('../models');

router.get( '/', async (req, res) => {
  try {
    const blogData = await User.findAll({
      include: [{
        model: Blog,
      }]
    })
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
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
