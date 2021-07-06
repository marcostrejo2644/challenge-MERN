const mongoose = require('mongoose');
require('dotenv').config();

const { DB_MONGO_URI, DB_MONGO_URI_TEST, NODE_ENV } = process.env;
const dbUri = NODE_ENV === 'test' ? DB_MONGO_URI_TEST : DB_MONGO_URI;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`Database connected`))
  .catch((e) => console.log(e));

module.exports = mongoose;
