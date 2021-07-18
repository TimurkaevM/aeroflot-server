const Router = require('express');
const imagesController = require('../controllers/imagesController');

const router = Router();

router.get('/', imagesController.getImage);

router.post('/', imagesController.createImage);

module.exports = router;
