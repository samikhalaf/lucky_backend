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
        'insecto',
        'hurón',
        'anfibio',
      ],
      required: true,
    },
    race: { type: String, required: true },
    image: { type: String, required: true },
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
    personality: [
      {
        type: String,
        enum: [
          'juguetón',
          'tímido',
          'cariñoso',
          'miedoso',
          'inquieto',
          'tranquilo',
          'familiar',
          'sociable con otros animales',
          'callado',
          'ruidoso',
          'activo',
          'delicado',
          'ruidoso',
          'baboso',
          'gruñón'
        ],
      },
    ],
    vaccined: { type: Boolean, required: [true, false] },
    dewormed: { type: Boolean, required: [true, false] },
    healthy: { type: Boolean, required: [true, false] },
    sterilized: { type: Boolean, required: [true, false] },
    identified: { type: Boolean, required: [true, false] },
    microchip: { type: Boolean, required: [true, false] },
    comments: { type: String, maxlength: 140 },
    requeriments: { type: String },
    fee: { type: Number, default: 0 },
    delivery: { type: String, required: [true, false] },
    association: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Pet', petSchema);
