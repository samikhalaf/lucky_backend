const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('\x1b[33m%s\x1b[0m', '*** Conectados a Mongo Atlas ⚡');
  })
  .catch((error) => console.log(`Error connecting to DB: ${error.message}`));
