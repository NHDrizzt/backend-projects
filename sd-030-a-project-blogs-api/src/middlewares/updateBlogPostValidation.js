const joi = require('joi');
const { BlogPost } = require('../models');
const mapStatusHTTP = require('../utils/mapStatusHttp');

const blogPostValidationRules = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
}).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
});

const checkIfBlogPostExists = async (id) => {
    const blogpost = await BlogPost.findOne({
        where: {
            id,
        },
    });
    return blogpost;
};

const checkIfUserIsAuthorized = async (id, userId) => id === userId;

const newBlogPostsValidations = async (req, res, next) => {
    const { error } = blogPostValidationRules.validate(req.body);
    const blogpost = await checkIfBlogPostExists(req.user);
    const isAuthorized = await checkIfUserIsAuthorized(Number(req.params.id), req.user);
    if (!isAuthorized) {
        return res.status(mapStatusHTTP('UNAUTHORIZED'))
            .json({ message: 'Unauthorized user' });
    }
    if (!blogpost) {
        return res.status(mapStatusHTTP('NOT_FOUND'))
            .json({ message: 'Blog post not Found' });
    }
    if (error) {
        return res.status(mapStatusHTTP('BAD_REQUEST'))
        .json({ message: error.details[0].message });
    }
    next();
};

const blogPostsValidationUpdate = [
    newBlogPostsValidations,
];

module.exports = blogPostsValidationUpdate;
