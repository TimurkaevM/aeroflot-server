const Router = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

// Авторизация(все)
router.post('/login', authController.login);

router.get('/auth', authMiddleware, authController.auth);

module.exports = router;
