const fs = require('fs').promises;

const TALKERS = 'src/talker.json';

const readTalkersFile = async () => {
    try {
        const result = await fs.readFile(TALKERS, 'utf-8');
        return JSON.parse(result);
    } catch (error) {
        console.error(`deu ruim: ${error}`);
    }
};

const writeTalkersFile = async (newTalker) => {
    try {
        const existingData = await readTalkersFile();
        const lastId = existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
        const newId = lastId + 1;
        const updatedTalker = {
            id: newId,
            ...newTalker,
        };
        existingData.push(updatedTalker);
        await fs.writeFile(TALKERS, JSON.stringify(existingData, null, 2));
        return updatedTalker;
    } catch (error) {
        console.error(`deu ruim: ${error}`);
    }
};

const updateTalkersFile = async (talkerToUpdate, talkerId) => {
    try {
        const existingData = await readTalkersFile();
        const updatedData = existingData.map((person) => {
            if (person.id === talkerId) {
                return {
                    id: talkerId,
                    ...talkerToUpdate,
                };
            }
            return person;
        });
        await fs.writeFile(TALKERS, JSON.stringify(updatedData, null, 2));
        return talkerToUpdate;
    } catch (error) {
        console.error(`deu ruim: ${error}`);
    }
};

const deleteTalkerFile = async (talkerId) => {
    try {
        const existingData = await readTalkersFile();
        const updatedData = existingData.filter((person) => person.id !== talkerId);
        if (updatedData.length !== existingData.length) {
            await fs.writeFile(TALKERS, JSON.stringify(updatedData, null, 2));
            return true;
        }
        return false;
    } catch (error) {
        console.error(`deu ruim: ${error}`);
    }
};

module.exports = {
    readTalkersFile,
    writeTalkersFile,
    updateTalkersFile,
    deleteTalkerFile,
};
