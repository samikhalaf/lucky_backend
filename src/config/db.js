const mongoose = require('mongoose');

// const DB_URL = process.env.DB_URL;

const uri =
  'mongodb+srv://samikhalaf94@gmail.com:RosendoChas#@lucky-cluster.zjrqk.mongodb.net/lucky-cluster?retryWrites=true&w=majority';
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('MongoDB Connected…');
  })
  .catch((error) => console.log(`Error connecting to DB ${error.message}`));
