const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Функция авторизации
async function login(req, res) {
  try {
    // Получение данных
    const { username, password } = req.body;

    // Поиск пользователя в БД
    const user = await User.findOne({ username });

    // Проверка, если пользователь не найден выводим ошибку
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Делаем проверку зашифрованного  и  полученного пароля с запроса
    const validPassword = bcrypt.compareSync(password, user.password);

    // Проверка, если пароли не совпадают, выводим ошибку
    if (!validPassword) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Генерируем токен, передаем параметрами айди пользователя
    const token = jwt.sign({ id: user._id }, config.get('MY_SECRET_KEY'), {
      expiresIn: '1h',
    });

    // Отправляем запрос с токен и информацией о пользователе
    res.status(200).json({
      type: 'Bearer',
      token,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        username: user.username,
      },
    });
  } catch (e) {
    //Ловим ошибки
    console.log(e);
    res.status(401).json({ message: 'Login error' });
  }
}

async function auth(req, res) {
  try {
    // Поиск пользователя в БД
    const user = await User.findOne({ _id: req.user.id });

    // Генерируем токен, передаем параметрами айди пользователя
    const token = jwt.sign({ id: user._id }, config.get('MY_SECRET_KEY'), {
      expiresIn: '1h',
    });

    // Отправляем запрос с токен и информацией о пользователе
    res.status(200).json({
      type: 'Bearer',
      token,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        username: user.username,
      },
    });
  } catch (e) {
    //Ловим ошибки
    console.log(e);
    res.status(401).json({ message: 'Login error' });
  }
}

module.exports = { login, auth };
