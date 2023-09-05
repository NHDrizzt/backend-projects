const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const loginRouter = require('./login.router');
const postRouter = require('./post.router');

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/categories', categoryRouter);
router.use('/post', postRouter);

module.exports = router;
