const { Schema, model } = require('mongoose');

const User = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model('User', User);
