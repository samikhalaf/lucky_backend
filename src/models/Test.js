const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String},
    ultimaCaca: {type: String},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Test', testSchema);
