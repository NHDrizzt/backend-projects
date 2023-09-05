const { readTalkersFile } = require('../utils/fileHandler');

const validateExistingTalker = async (req, res, next) => {
    const id = parseInt(req.params.id, 0);
    const talkers = await readTalkersFile();
    const talkerToUpdate = talkers.find((person) => person.id === id);
    if (!talkerToUpdate) {
        return res.status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    req.talkerId = talkerToUpdate.id;
    next();
};

module.exports = validateExistingTalker;
