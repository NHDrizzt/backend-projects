const express = require('express');

const router = express.Router();
const loginValidations = require('../middlewares/loginValidation');
const login = require('../controllers/loginController');

router.post('/', loginValidations, login.loginController);

module.exports = router;
