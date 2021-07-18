const Router = require('express');

const router = Router();

router.use('/', require('./authRouter'));
router.use('/users', require('./usersRouter'));
router.use('/images', require('./imagesRouter'));
router.use('/tickets', require('./ticketsRouter'));

module.exports = router;
