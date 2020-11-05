const mongoose = require('mongoose');

// const DB_URL = process.env.DB_URL;

const uri =
  'mongodb+srv://lucky_app:RosendoChas1234@lucky-cluster.zjrqk.mongodb.net/luckydb?retryWrites=true&w=majority';
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Conectados a Mongo Atlas ⚡');
  })
  .catch((error) => console.log(`Error connecting to DB: ${error.message}`));