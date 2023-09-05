const joi = require('joi');

const userValidationRules = joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    image: joi.string(),
}).messages({
    'string.min': '{#label} length must be at least {#limit} characters long',
    'string.email': '{#label} must be a valid email',
    'string.empty': '{#label} length must be at least {#limit} characters long',
});

const newUserValidations = (req, res, next) => {
    const { error } = userValidationRules.validate(req.body);
    
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const userValidation = [
    newUserValidations,
];

module.exports = userValidation;
