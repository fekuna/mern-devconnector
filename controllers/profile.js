// Load profile validation
const { validateEducationInput } = require('../validation/education');
const { validateExperienceInput } = require('../validation/experience');
const { validateProfileInput } = require('../validation/profile');

// Load profile Model
const Profile = require('../models/Profile');

// Load User Model
const User = require('../models/User');

// @route GET api/profile
// @desc Get current user profile
// @access Private
exports.getProfile = (req, res, next) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.status(200).json(profile);
		})
		.catch((err) => res.status(404).json(err));
};

// @route POST api/profile
// @desc create / edit user profile
// @access Private
exports.postProfile = (req, res, next) => {
	const { errors, isValid } = validateProfileInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// Get fields
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;
	if (req.body.bio) profileFields.bio = req.body.bio;
	// Skills - Split into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	// Social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			// Update
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then((profile) =>
				res.status(200).json(profile)
			);
		} else {
			// Create

			// Check if handle exists
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That handle already exist';
					res.status(400).json(errors);
				}
			});

			new Profile(profileFields).save().then((profile) => res.status(200).json(profile));
		}
	});
};

// @route GET api/profile/handle/:handle
// @desc Get Profile by handle
// @access Public
exports.getPorfileByHandle = (req, res, next) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.status(200).json(profile);
		})
		.catch((err) => {
			return res.status(404).json(err);
		});
};

// @route GET api/profile/user/:userId
// @desc Get Profile by user
// @access Public
exports.getPorfileByUserId = (req, res, next) => {
	const errors = {};

	Profile.findOne({ user: req.params.userId })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.status(200).json(profile);
		})
		.catch((err) => {
			return res.status(404).json({ profile: 'There is no profile for this user' });
		});
};

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
exports.getProfiles = (req, res, next) => {
	const errors = {};

	Profile.find()
		.populate('user', [ 'name', 'avatar' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noProfiles = 'There are no profiles';
				return res.status(404).json(errors);
			}

			res.status(200).json(profiles);
		})
		.catch((err) => {
			return res.status(404).json({ profiles: 'There are no profiles' });
		});
};

// @route POST api/profile/experince
// @desc Add experince to profile
// @access Private
exports.postExperience = (req, res, next) => {
	const { errors, isValid } = validateExperienceInput(req.body);

	// Check validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then((profile) => {
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		// Add to exp array
		profile.experience.unshift(newExp);

		profile.save().then((profile) => res.status(200).json(profile));
	});
};

// @route POST api/profile/education
// @desc Add education to profile
// @access Private
exports.postEducation = (req, res, next) => {
	const { errors, isValid } = validateEducationInput(req.body);

	// Check validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then((profile) => {
		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			fieldOfStudy: req.body.fieldOfStudy,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		// Add to exp array
		profile.education.unshift(newEdu);

		profile.save().then((profile) => res.status(200).json(profile));
	});
};

// @route Delete api/profile/experience/:expId
// @desc Delete experience
// @access Private
exports.deleteExperience = (req, res, next) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			console.log(profile);
			// Filter experience
			profile.experience = profile.experience.filter((exp) => exp.id !== req.params.expId);

			// Resave profile
			profile.save().then((profile) => {
				res.status(200).json(profile);
			});
		})
		.catch((err) => res.status(404).json(err));
};

// @route Delete api/profile/education/:eduId
// @desc Delete education
// @access Private
exports.deleteEducation = (req, res, next) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			// Filter education
			profile.education = profile.education.filter((edu) => edu.id !== req.params.eduId);

			// Resave profile
			profile.save().then((profile) => res.status(200).json(profile));
		})
		.catch((err) => res.status(404).json(err));
};

// @route Delete api/profile
// @desc Delete user and profile
// @access Private
exports.deleteProfileAndUser = (req, res, next) => {
	Profile.findOneAndRemove({ user: req.user.id })
		.then(() => {
			return User.findOneAndRemove({ _id: req.user.id });
		})
		.then(() => res.status(200).json({ success: true }));
};
