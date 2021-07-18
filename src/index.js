const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');
const corsMiddleware = require('./middlewares/corsMiddleware');

const app = express();
const port = process.env.PORT || config.get('PORT');

// Парсинг
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(corsMiddleware);

app.use(morgan('combined'));

app.use('/aeroflot', require('./routes'));

(async function () {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`Server started on PORT: ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();