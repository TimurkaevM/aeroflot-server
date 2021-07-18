const Image = require('../models/Image');

async function getImage(req, res) {
  try {
    const images = await Image.find();

    res.status(200).json(images);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: 'Images not found' });
  }
}

async function createImage(req, res) {
  try {
    const { url } = req.body;

    const image = new Image({ url });

    await image.save();

    res.status(200).json({ message: 'Картинка успешно добавлена' });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getImage, createImage };
