const express = require('express');

const app = express();
app.use(express.json());
const { readTalkersFile,
  writeTalkersFile,
  updateTalkersFile,
  deleteTalkerFile,
} = require('./utils/fileHandler');
const createToken = require('./utils/tokenGenerator');
const validateLogin = require('./middlewares/validateLogin');
const validateAuthorization = require('./middlewares/validateAuthorization');
const validateTalker = require('./middlewares/validateTalker');
const validateExistingTalker = require('./middlewares/validateExistingTalker');
const validateFilters = require('./middlewares/filterSearch');

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const STANDARD_ERROR = 'Ocorreu um erro no processamento';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('yei');
});

app.get('/talker', async (req, res) => {
  try {
    const talker = await readTalkersFile();
    res.status(HTTP_OK_STATUS)
        .json(talker);
  } catch (error) {
    console.error('f:', error);
    res.status(500)
        .json({ error: STANDARD_ERROR });
  }
});

app.post('/login', validateLogin, (req, res) => {
  try {
    const token = createToken();
    res.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    res.status(500).json({ error: STANDARD_ERROR });
  }
});

app.post('/talker', validateAuthorization, validateTalker, async (req, res) => {
  try {
    const newTalker = await writeTalkersFile(req.body);
    return res.status(201).json(newTalker);
  } catch (error) {
    res.status(500)
        .json({ error: STANDARD_ERROR });
  }
});

app.put('/talker/:id',
    validateAuthorization, validateTalker, validateExistingTalker, async (req, res) => {
      try {
        const updateTalker = req.body;
        const { talkerId } = req;
        await updateTalkersFile(updateTalker, talkerId);
        return res.status(200)
            .json({ id: talkerId, ...updateTalker });
      } catch (error) {
        res.status(500)
            .json({ error: STANDARD_ERROR });
      }
    });

app.delete('/talker/:id', validateAuthorization, async (req, res) => {
  const id = parseInt(req.params.id, 0);
  await deleteTalkerFile(id);
  return res.status(204).json();
});

app.get('/talker/search', validateAuthorization,
    validateFilters, async (req, res) => {
  try {
    return res.status(200)
        .json(req.talkers);
  } catch (error) {
    res.status(500)
        .json({ error: STANDARD_ERROR });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await readTalkersFile();
    const id = parseInt(req.params.id, 0);
    const talker = talkers.find((talk) => talk.id === id);
    if (talker) {
      res.status(HTTP_OK_STATUS).json(talker);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    res.status(500)
        .json({ error: 'Deu ruim' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
