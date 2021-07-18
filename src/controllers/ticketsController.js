const Ticket = require('../models/Ticket');

async function getTickets(req, res) {
  try {
    const images = await Ticket.find();

    res.status(200).json(images);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: 'Tickets not found' });
  }
}

async function createTicket(req, res) {
  try {
    const { fromCity, toCity, fromAirport, toAirport, date, price } = req.body;

    const image = new Ticket({
      fromCity,
      toCity,
      fromAirport,
      toAirport,
      date,
      price,
    });

    await image.save();

    res.status(200).json({ message: 'Билет успешно добавлен' });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { getTickets, createTicket };
