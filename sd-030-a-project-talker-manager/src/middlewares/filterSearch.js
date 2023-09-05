const { readTalkersFile } = require('../utils/fileHandler');

const filterTalkerByName = async (req, res, next) => {
    try {
        const { q } = req.query;
        const existingData = await readTalkersFile();
        if (q) {
            const lowerCaseQuery = q.toLowerCase();
            req.talkers = existingData.filter(({ name }) =>
                name.toLowerCase()
                    .includes(lowerCaseQuery));
        } else {
            req.talkers = existingData;
        }
        next();
    } catch (error) {
        console.error(`deu ruim: ${error}`);
        res.status(500).json({ error: 'Ocorreu um erro no processamento' });
    }
};

const filterTalkerByRate = async (req, res, next) => {
    try {
        const { rate } = req.query;
        if (rate) {
            req.talkers = req.talkers.filter(({ talk }) => talk.rate === Number(rate));
        }
        next();
    } catch (error) {
        console.error(`deu ruim: ${error}`);
    }
};
const validateNumber = (number) => !Number.isInteger(number)
    || number < 1
    || number > 5;

const validateRate = (req, res, next) => {
    const { rate } = req.query;
    const rateToInteger = Number(rate);
    const validateIntegerNumber = validateNumber(rateToInteger);
    if (rate && validateIntegerNumber) {
        return res.status(400)
            .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

const validateFilters = [
    filterTalkerByName,
    validateRate,
    filterTalkerByRate,
];

module.exports = validateFilters;
