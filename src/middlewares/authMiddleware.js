const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const [bearer, token] = req.headers.authorization.split(' ');

    //Проверка типа токена
    if (bearer !== 'Bearer') {
      return res.status(401).json({
        message: 'Пользователь не авторизован(неправильный тип токена)',
      });
    }

    //Проверка токена
    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    //Получение данных из токена
    req.user = jwt.verify(token, config.get('MY_SECRET_KEY'));

    next();
  } catch (e) {
    console.log(e);
  }
};
