const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://marcos2644:${process.env.DB_PASSWORD}@cluster0.9uzdv.mongodb.net/pruebaTecnica?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((db) => console.log(`Database connected`))
  .catch((e) => console.log(e));

module.exports = mongoose;
