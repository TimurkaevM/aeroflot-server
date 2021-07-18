const Router = require('express');
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');

const router = Router();

router.get('/', usersController.getUsers);

router.post(
  '/',
  [
    check('username', 'Логин пользователя не может быть пустым').notEmpty(),
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('surname', 'фамилия пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'пароль не может быть меньше 4 и больше 15 символов',
    ).isLength({ min: 4, max: 15 }),
  ],
  usersController.createUser,
);

module.exports = router;
