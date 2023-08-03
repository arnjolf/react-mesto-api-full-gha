require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
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
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${3000}`);
});
