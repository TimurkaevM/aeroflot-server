const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const corsMiddleware = require('./src/middlewares/corsMiddleware');

const app = express();
const port = process.env.PORT || config.get('PORT');

app.use(corsMiddleware);

// Парсинг
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/aeroflot', require('./src/routes'));

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
