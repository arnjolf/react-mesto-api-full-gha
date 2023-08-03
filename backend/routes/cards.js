const router = require('express').Router();
const {
  createCardValidate,
  deleteCardValidate,
  likeCardValidate,
  dislikeCardValidate,
} = require('../middlewares/validator');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCardValidate, createCard);
router.delete('/:cardId', deleteCardValidate, deleteCard);
router.put('/:cardId/likes', likeCardValidate, likeCard);
router.delete('/:cardId/likes', dislikeCardValidate, dislikeCard);

module.exports = router;
