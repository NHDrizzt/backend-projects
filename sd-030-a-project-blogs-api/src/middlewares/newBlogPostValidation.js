const joi = require('joi');
const { Category } = require('../models');
const mapStatusHTTP = require('../utils/mapStatusHttp');

const blogPostValidationRules = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().required(),
}).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
});

const checkIfCategoryExists = async (ids) => {
    const category = await Category.findAll({
        where: {
            id: ids,
        },
    });
    return category;
};

const newBlogPostsValidations = async (req, res, next) => {
    const { error } = blogPostValidationRules.validate(req.body);
    const allCategories = await checkIfCategoryExists(req.body.categoryIds);
    if (allCategories.length !== req.body.categoryIds.length) {
        return res.status(mapStatusHTTP('BAD_REQUEST'))
            .json({ message: 'one or more "categoryIds" not found' });
    }
    if (error) {
        return res.status(mapStatusHTTP('BAD_REQUEST'))
        .json({ message: error.details[0].message });
    }
    next();
};

const blogPostsValidation = [
    newBlogPostsValidations,
];

module.exports = blogPostsValidation;
