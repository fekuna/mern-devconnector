const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../../controllers/auth');

// @route GET api/auth/test
// @desc Tests auth route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Auth works' }));

// @route GET api/auth/register
// @desc register auth route
// @access Public
router.post('/register', authController.register);

// @route GET api/auth/login
// @desc login auth route
// @access Public
router.post('/login', authController.login);

// @route GET api/auth/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
