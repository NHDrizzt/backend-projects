const joi = require('joi');

const loginValidationField = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
});

const loginValidation = (req, res, next) => {
    const { error } = loginValidationField.validate(req.body);
    if (error) return res.status(400).json({ message: 'Some required fields are missing' });
    next();
};

const loginValidations = [
    loginValidation,
];

module.exports = loginValidations;
