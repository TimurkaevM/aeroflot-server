const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

async function getUsers(req, res) {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: 'Users not found' });
  }
}

async function createUser(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(417)
        .json({ message: 'Ошибка при регистрации', errors });
    }

    const { name, surname, username, password } = req.body;

    const candidate = await User.findOne({ username });

    if (candidate) {
      return res
        .status(417)
        .json({ message: 'Пользователь с таким именем существует' });
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const user = new User({
      name,
      surname,
      username,
      password: hashPassword,
    });

    await user.save();

    res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getUsers, createUser };
