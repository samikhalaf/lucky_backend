const mongoose = require('mongoose');

const adoptSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlegth: 2,
            maxlength: 20,
          },
          email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/, 'Please fill a valid email address'],
          },
          phone: {
              type: Number,
              required: true,
              minlength: 9
          },
          dni: { type: String, minlength: 9, maxlength: 9},
          address: { type: String, minlength: 5, required: true },
          zipCode: { type: String, required: true, minlength: 5, maxlength: 5 },
          city: { type: String, required: true, maxlength: 20 },
          eula: {type: Boolean, required: true},
          morePetsInHome: { type: Boolean, required: true}, // tienes mas animales en casa?
          whichPetsInHome: { type: String, minlength: 3, maxlength: 280}, // que mascotas hay en casa?
          areTheyFriendly: { type: Boolean}, // se llevan bien con otros animales?
          whyAdopting: { type: String, minlength: 6, required: true, maxlength: 280 }, // Por que has elegido adoptar?
          petNeeds: { type: String, minlength: 6, required: true, maxlength: 280 }, // Conoces las necesidades del animal?
          petExpenses: { type: String, minlength: 6, required: true, maxlength: 280 }, // conoces sus gastos?
          petFeeding: { type: String, minlength: 6, required: true, maxlength: 280 }, // conoces su alimentacion?
          homeType: { type: String, enum: ['piso', 'chalet', 'duplex', 'finca'] },
          rentHome: { type: Boolean}, // estas alquilado?
          landlordOK: {type: Boolean}, // tu casero esta de acuerdo?
          garden: {type: Boolean, required: true }, // tienes jardin?
          movingSoon: { type: Boolean, required: true }, // pretendes mudarte pronto?
          flatmates: { type: Boolean, required: true }, // vives con otras personas?
          flatmatesOK: { type: Boolean, required: true }, // estan todos de acuerdo con la adopcion?
          visit: { type: Boolean }, // Estas de acuerdo con que visitemos tu casa?
          adoptionStatus: {type: String, enum: ['adjudicada', 'pendiente', 'denegada']},
          date: { type: Date, default: Date.now }
    });

module.exports = mongoose.model('Adopt', adoptSchema);