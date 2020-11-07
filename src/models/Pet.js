const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlegth: 2,
      maxlength: 20,
    },
    specie: {
      type: String,
      enum: [
        'perro',
        'gato',
        'cobaya',
        'conejo',
        'pez',
        'ave',
        'reptil',
        'mamífero pequeño',
        'insectos',
        'hurón',
        'anfibio',
      ],
    },
    race: { type: String, required: true },
    image: { type: Array, required: true },
    age: { type: String, enum: ['cría', 'joven', 'adulto', 'anciano'] },
    birthdate: { type: Date },
    sex: { type: String, enum: ['macho', 'hembra'], required: true },
    size: {
      type: String,
      enum: ['pequeño', 'mediano', 'grande'],
      required: true,
    },
    weight: { type: Number },
    history: { type: String, minlength: 30, maxlength: 280 },
    personality: {
      type: String,
      enum: [
        'juguetón',
        'timido',
        'cariñoso',
        'miedoso',
        'inquieto',
        'tranquilo',
        'familiar',
        'sociable con otros animales',
        'callado',
        'ruidoso'
      ],
    },
    vaccined: { type: Boolean, required: [true, false] },
    dewormed: { type: Boolean, required: [true, false] },
    healthy: { type: Boolean, required: [true, false] },
    sterilized: { type: Boolean, required: [true, false] },
    identified: { type: Boolean, required: [true, false] },
    microchip: { type: Boolean, required: [true, false] },
    comments: { type: String, maxlength: 140 },
    requeriments: { type: String },
    fee: { type: Number },
    delivery: { type: String, required: [true, false] },
    association: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Pet', petSchema);

// POPULATE PARA METERLO EN EL GET DE LA PETICION
// Pet.findById(_id).populate("association")
//    .then loqueseaya;
