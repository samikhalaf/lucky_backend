const mongoose = require('mongoose');

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlegth: 3,
      maxlength: 40,
    },
    name: { type: String, required: true, minlegth: 3, maxlength: 40 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: { type: String, required: true, minlength: 8 },
    eula: { type: Boolean, required: true },
    city: { type: String, required: true, maxlength: 40 },
    zipCode: { type: String, required: true, minlength: 5, maxlength: 5 },
    avatar: { type: String },
    // FALTA POR METER LA IMAGEN POR DEFECTO

    // Sección usuarios
    formHistory: { type: Array },
    favorites: { type: Array },

    // Sección protectoras
    address: { type: String, minlength: 5 },
    contactPhone: { type: String, minlength: 9 },

    role: { type: String, enum: ['basic', 'association'], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  },
);

module.exports = mongoose.model('User', userSchema);


// hacer una ruta de POST /users/register y otra de POST /users/login 