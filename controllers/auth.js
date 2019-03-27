const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { secretOrKey } = require('../config/keys');

// Load input validation
const { validateRegisterInput } = require('../validation/register');
const { validateLoginInput } = require('../validation/login');

// Load user model
const User = require('../models/User');

// @route GET api/auth/register
// @desc register auth route
// @access Public
exports.register = (req, res, next) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = 'Email already exist';
			return res.status(400).json(errors);
		}
		const avatar = gravatar.url(req.body.email, {
			s: '200', //Size
			r: 'pg', //Rating
			d: 'mm' //Default
		});

		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			avatar,
			password: req.body.password
		});

		// Encrypt password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then((user) => {
						res.status(200).json(user);
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	});
};

// @route GET api/auth/login
// @desc login user / Returning JWT Token
// @access Public

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check for user
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		// Check password
		return bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				// User is not matched
				errors.password = 'Password incorrect';
				res.status(400).json(errors);
			}

			// Create jwt payload
			const payload = {
				id: user._id.toString(),
				name: user.name,
				avatar: user.avatar
			};

			// Sign Token
			jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
				res.status(200).json({
					success: true,
					token: 'Bearer ' + token
				});
			});
		});
	});
};
