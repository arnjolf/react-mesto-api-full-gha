require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/centralizedError');
const {
  createUserValidate,
  loginValidate,
} = require('./middlewares/validator');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://front-mesto-arnjolff.nomoreparties.sbs/',
    ],
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidate, login);
app.post('/signup', createUserValidate, createUser);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Неправильный адрес');
});
app.use(errors());
app.use(errHandler);
mongoose.connect(`${process.env.DB_ADRESS}`);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
