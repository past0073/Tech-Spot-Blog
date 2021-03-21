const router = require('express').Router();
const { Blog } = require('../models');
// const withAuth = require('../utils/auth');

//Using the '/dashboard' route

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Get all user blog posts
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            // where: {
            //     user_id: req.session.user_id,
            // }
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//Writing a new blog post
router.post('/new', async (req, res) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Updating a blog post by ID
router.put('/edit/:id', async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!blogData) {
            res.status(404).json({ message: "No post found with that ID!" });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!blogData) {
            res.status(404).json({ message: "No post found with that ID!" })
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;