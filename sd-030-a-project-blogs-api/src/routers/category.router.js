const express = require('express');

const router = express.Router();

const categories = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');
const validateCategory = require('../middlewares/newCategoryValidations');

router.post('/', validateJWT, validateCategory, categories.createCategory);
router.get('/', validateJWT, categories.getAllCategories);

module.exports = router;
