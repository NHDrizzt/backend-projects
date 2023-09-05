const express = require('express');

const router = express.Router();

const validateJWT = require('../middlewares/validateJWT');
const post = require('../controllers/postController');
const blogPostsValidation = require('../middlewares/newBlogPostValidation');
const blogPostsValidationUpdate = require('../middlewares/updateBlogPostValidation');

router.post('/', validateJWT, blogPostsValidation, post.createPost);
router.get('/', validateJWT, post.findAllPosts);
router.get('/:id', validateJWT, post.findPostById);
router.put('/:id', validateJWT, blogPostsValidationUpdate, post.updatePost);

module.exports = router;
