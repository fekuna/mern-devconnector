const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controller
const postsController = require('../../controllers/posts');

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Post works' }));

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', postsController.getPosts);

// @route GET api/posts/:postId
// @desc Get posts by id
// @access Private
router.get('/:postId', postsController.getPostById);

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), postsController.createPost);

// @route DELETE api/posts/postId
// @desc Delete post
// @access Private
router.delete('/:postId', passport.authenticate('jwt', { session: false }), postsController.deletePost);

// @route POST api/posts/like/postId
// @desc Like post
// @access Private
router.post('/like/:postId', passport.authenticate('jwt', { session: false }), postsController.likePost);

// @route POST api/posts/unlike/:postId
// @desc Unlike post
// @access Private
router.post('/unlike/:postId', passport.authenticate('jwt', { session: false }), postsController.unlikePost);

// @route POST api/posts/comment/:postId
// @desc Add comment to post
// @access Private
router.post('/comment/:postId', passport.authenticate('jwt', { session: false }), postsController.postComment);

// @route DELETE api/posts/comment/:postId/:commentId
// @desc Remove comment from post
// @access Private
router.delete(
	'/comment/:postId/:commentId',
	passport.authenticate('jwt', { session: false }),
	postsController.removeComment
);

module.exports = router;
