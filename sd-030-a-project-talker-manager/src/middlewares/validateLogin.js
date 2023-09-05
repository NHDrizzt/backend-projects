const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
        return res.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const validateLogin = [
    validateEmail,
    validatePassword,
];

module.exports = validateLogin;
