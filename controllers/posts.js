// Load validation
const { validatePostInput } = require('../validation/post');

// Load post model
const Post = require('../models/Post');
const Profile = require('../models/Profile');

// @route GET api/posts
// @desc Get posts
// @access Private
exports.getPosts = (req, res, next) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.status(200).json(posts))
		.catch((err) => res.status(404).json({ noPostsFound: 'No posts found' }));
};

// @route GET api/posts/:postId
// @desc Get posts by id
// @access Private
exports.getPostById = (req, res, next) => {
	Post.findById(req.params.postId)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({ noPostFound: 'No post found' }));
};

// @route POST api/posts
// @desc Create post
// @access Private
exports.createPost = (req, res, next) => {
	const { errors, isValid } = validatePostInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return error with 400
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.user.avatar,
		user: req.user.id
	});

	newPost.save().then((post) => res.json(post));
};

// @route DELETE api/posts/:postId
// @desc Delete post
// @access Private
exports.deletePost = (req, res, next) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			Post.findById(req.params.postId).then((post) => {
				// Check for post owner
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ notAuthorized: 'User not authorized' });
				}

				// DELETE
				post.remove().then(() => res.json({ success: true }));
			});
		})
		.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
};

// @route POST api/posts/like/postId
// @desc Like post
// @access Private
exports.likePost = (req, res, next) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			return Post.findById(req.params.postId);
		})
		.then((post) => {
			if (post.likes.filter((like) => req.user.id === like.user.toString()).length > 0) {
				return res.status(400).json({ alreadyLike: 'User already liked this post' });
			}

			// Add user id to like array
			post.likes.unshift({ user: req.user.id });

			return post.save();
		})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
};

// @route POST api/posts/unlike/:postId
// @desc Unlike post
// @access Private
exports.unlikePost = (req, res, next) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			return Post.findById(req.params.postId);
		})
		.then((post) => {
			if (post.likes.filter((like) => req.user.id === like.user.toString()).length === 0) {
				return res.status(400).json({ notLiked: 'You have not yet liked this post' });
			}

			// Remove like
			post.likes = post.likes.filter((post) => post.user.toString() !== req.user.id);

			// Save post
			return post.save();
		})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
};

// @route POST api/posts/comment/:postId
// @desc Add comment to post
// @access Private
exports.postComment = (req, res, next) => {
	const { errors, isValid } = validatePostInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return error with 400
		return res.status(400).json(errors);
	}

	Post.findById(req.params.postId)
		.then((post) => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			// Add to comments array
			post.comments.unshift(newComment);

			// Save
			return post.save();
		})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
};

// @route DELETE api/posts/comment/:postId/:commentId
// @desc Remove comment from post
// @access Private
exports.removeComment = (req, res, next) => {
	Post.findById(req.params.postId)
		.then((post) => {
			console.log(post);
			// Check to see if comment exist
			if (post.comments.filter((comment) => comment._id.toString() === req.params.commentId).length === 0) {
				return res.status(404).json({ commentNotExist: 'Comment does not exist' });
			}

			// Get remove post
			post.comments = post.comments.filter((comment) => comment._id.toString() !== req.params.commentId);

			return post.save();
		})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(404).json({ postNotFound: 'No post found' }));
};
