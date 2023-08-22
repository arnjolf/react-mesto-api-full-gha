const router = require('express').Router();
const { errors } = require('celebrate');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { login, createUser } = require('../controllers/users');
const {
  createUserValidate,
  loginValidate,
} = require('../middlewares/validator');
const NotFoundError = require('../errors/NotFoundError');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const errHandler = require('../middlewares/centralizedError');

router.use(requestLogger);

router.post('/signin', loginValidate, login);
router.post('/signup', createUserValidate, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

router.use(errorLogger);

router.use(errors());
router.use(errHandler);

module.exports = router;
