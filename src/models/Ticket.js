const { Schema, model } = require('mongoose');

const Ticket = new Schema({
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  fromAirport: { type: String, required: true },
  toAirport: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = model('Ticket', Ticket);
