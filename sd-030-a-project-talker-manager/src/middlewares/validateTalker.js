const DATE_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(400)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400)
            .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    if (!talk.watchedAt) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!talk.rate && talk.rate !== 0) {
        return res.status(400)
            .json({ message: 'O campo "rate" é obrigatório' });
    }
    next();
};

const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (!DATE_REGEX.test(watchedAt)) {
        return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return res.status(400)
            .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

const validateTalker = [
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
];

module.exports = validateTalker;
