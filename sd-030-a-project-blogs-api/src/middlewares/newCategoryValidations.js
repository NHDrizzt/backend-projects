const joi = require('joi');

const categoryValidationRules = joi.object({
    name: joi.string().required(),
}).messages({
    'string.empty': '{#label} cannot be an empty field',
    'any.required': '{#label} is required',
});

const newCategoryValidations = (req, res, next) => {
    const { error } = categoryValidationRules.validate(req.body);
    
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const categoryValidation = [
    newCategoryValidations,
];

module.exports = categoryValidation;
