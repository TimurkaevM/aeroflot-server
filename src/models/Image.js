const { Schema, model } = require('mongoose');

const Image = new Schema({
  url: { type: String, required: true },
});

module.exports = model('Image', Image);
