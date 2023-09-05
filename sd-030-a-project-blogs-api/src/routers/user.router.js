const express = require('express');

const router = express.Router();

const user = require('../controllers/userController');
const userValidation = require('../middlewares/newUserValidations');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', userValidation, user.createUser);
router.get('/', validateJWT, user.findAllUsers);
router.get('/:id', validateJWT, user.findUserById);

module.exports = router;
