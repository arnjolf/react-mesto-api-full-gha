const router = require('express').Router();
const {
  getByIdValidate,
  updateUserValidate,
  updateUserAvatarValidate,
} = require('../middlewares/validator');

const {
  getAllUsers,
  updateUser,
  updateUserAvatar,
  getUserById,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getByIdValidate, getUserById);
router.patch('/me', updateUserValidate, updateUser);
router.patch('/me/avatar', updateUserAvatarValidate, updateUserAvatar);

module.exports = router;
