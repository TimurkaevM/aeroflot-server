const Router = require('express');
const ticketsController = require('../controllers/ticketsController');

const router = Router();

router.get('/', ticketsController.getTickets);

router.post('/', ticketsController.createTicket);

module.exports = router;
