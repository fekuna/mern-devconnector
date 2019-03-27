const express = require("express");
const passport = require("passport");

const router = express.Router();

const profileController = require("../../controllers/profile");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route GET api/profile
// @desc Get current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);

// @route POST api/profile
// @desc create / edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.postProfile
);

// @route GET api/profile/handle/:handle
// @desc Get Profile by handle
// @access Public
router.get("/handle/:handle", profileController.getPorfileByHandle);

// @route GET api/profile/user/:userId
// @desc Get Profile by userId
// @access Public
router.get("/user/:userId", profileController.getPorfileByUserId);

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get("/all", profileController.getProfiles);

// @route POST api/profile/experince
// @desc Add experince to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.postExperience
);

// @route POST api/profile/education
// @desc Add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileController.postEducation
);

// @route Delete api/profile/experience/:expId
// @desc Delete experience
// @access Private
router.delete(
  "/experience/:expId",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteExperience
);

// @route Delete api/profile/education/:eduId
// @desc Delete education
// @access Private
router.delete(
  "/education/:eduId",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteEducation
);

module.exports = router;
